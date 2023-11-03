import { Result } from '@ethgate/lib-utils';
import type {
  AksharaBlockData,
  AksharaBlockId,
  AksharaBlockKey,
  AksharaCall,
  AksharaChainData,
  AksharaChainKey,
  AksharaLogId,
  AksharaLogKey,
  AksharaObjectId,
  AksharaObjectKey,
  AksharaReceiptId,
  AksharaReceiptKey,
  AksharaResult,
  AksharaTransactionId,
  AksharaTransactionKey,
} from '@ethgate/spec-node';
import { AksharaAbstract, type AksharaChainId } from '@ethgate/spec-node';
import type { Chain } from '@mantra-oss/chains';

import type { AksharaDatabase } from '..';
import { AksharaDaClient } from '../consensus/client';

export type FetchFn = (...args: any[]) => Promise<any>;
// export type FetchFn = typeof fetch;

export type AksharaConfig = {
  chains: Record<AksharaChainId, Chain>;
  fetchFn: FetchFn;
  database: AksharaDatabase;
};

export class Akshara extends AksharaAbstract {
  chains: Record<AksharaChainId, Chain>;
  fetchFn: FetchFn;
  database: AksharaDatabase;
  consensusClients: Map<AksharaChainId, AksharaDaClient> = new Map();

  constructor(config: AksharaConfig) {
    super();
    // super(
    //   Object.values(config.chains).map((chain) => ({
    //     chainId: chain.chainId,
    //     name: chain.name,
    //     parentId: chain.parent?.chainId ?? null,
    //     parent: chain.parent ?? null,
    //     rpcs: chain.rpcs,
    //     extra: chain,
    //   })),
    // );
    this.chains = config.chains;
    this.fetchFn = config.fetchFn;
    this.database = config.database;
  }

  // getLatestBlock(chainId: AksharaChainId): AksharaBlockData | undefined {
  //   const client = this.getDaClient(chainId);
  //   return client.latestBlocks.get(chainId);
  // }

  _getChain(chainId: AksharaChainId): AksharaChainData {
    const chain = this.chains[chainId];
    if (!chain) throw new Error(`No chain for chain ${chainId}`);
    return {
      chainId: chain.chainId,
      name: chain.name,
      parentId: chain.parent?.chainId,
      parent: chain.parent && {
        chainId: chain.parent.chainId,
        type: chain.parent.type,
        bridges: chain.parent.bridges ?? [],
      },
      rpcs: chain.rpcs,
      extra: chain,
    };
  }

  getDaClient(chainId: AksharaChainId): AksharaDaClient {
    let client = this.consensusClients.get(chainId);
    if (!client) {
      const chain = this._getChain(chainId);
      client = new AksharaDaClient(chain, this.fetchFn);
      this.consensusClients.set(chainId, client);
    }
    return client;
  }

  async executeBatch(calls: AksharaCall[]): Promise<AksharaResult[]> {
    const results = await Promise.all(
      calls.map(async (call) => {
        switch (call[0]) {
          case 'GetObject': {
            type CallResult = AksharaResult<(typeof call)[0]>;

            const [id] = call[1];
            const key = typeof id === 'string' ? parseObjectId(id) : id;

            if (key.type === 'Chain') {
              const chain = this._getChain(key.chainId);
              return Result.ok(chain) satisfies CallResult;
            }

            const cached = await this.database._get(key);
            if (cached) {
              return Result.ok(cached) satisfies CallResult;
            }

            const client = this.getDaClient(key.chainId);
            let object;
            if (key.type === 'Receipt' && 'blockNumber' in key && 'transactionIndex' in key) {
              // TODO: Check cache
              const transaction = await client.execute('GetObject', [
                {
                  ...key,
                  type: 'Transaction',
                },
              ]);
              if (transaction) {
                await this.database._put({
                  type: 'Transaction',
                  ...transaction,
                });
                object = await client.execute(call[0], [
                  {
                    type: 'Receipt',
                    chainId: key.chainId,
                    transactionHash: (transaction as any).hash,
                  },
                ]);
              }
            } else {
              object = await client.execute(call[0], [key]);
            }

            if (object) {
              await this.database._put({ type: key.type, ...object });
            }

            return Result.ok(object) satisfies CallResult;
          }
          case 'GetLatestBlock': {
            type CallResult = AksharaResult<(typeof call)[0]>;

            const [key] = call[1];

            const client = this.getDaClient(key.chainId);
            const block = await client.execute('GetLatestBlock', [key]);

            await this.database.putBlock(block);

            return Result.ok(block) satisfies CallResult;
          }
          case 'GetChains': {
            type CallResult = AksharaResult<(typeof call)[0]>;

            const [{ chainId }] = call[1];
            const chains = Object.values(this.chains)
              .filter((chain) => chain.parent?.chainId === chainId)
              .map((chain) => chain.chainId);
            return Result.ok(chains) satisfies CallResult;
          }
          case 'GetBlockRange': {
            type CallResult = AksharaResult<'GetBlockRange'>;

            const [key, pos, limit] = call[1];
            if (pos) {
              throw new Error('pos is not supported');
            }

            const chainIds = key.chainId ? [key.chainId] : Object.keys(this.chains);

            const earliestBlocks: Map<AksharaChainId, AksharaBlockData> = new Map();
            await Promise.all(
              chainIds.map(async (chainId) => {
                const client = this.getDaClient(chainId);
                const latestBlock = client.latestBlocks.get(chainId);
                if (latestBlock) {
                  earliestBlocks.set(chainId, latestBlock);
                }
              }),
            );

            const cachedBlocks = await this.database.getBlocks(key, null, limit);

            const blocks = [];
            for (const cachedBlock of cachedBlocks) {
              if (!chainIds.includes(cachedBlock.chainId)) {
                continue;
              }
              const earliestBlock = earliestBlocks.get(cachedBlock.chainId);
              if (earliestBlock) {
                if (earliestBlock.number - cachedBlock.number > 0) {
                  continue;
                }
              }
              earliestBlocks.set(cachedBlock.chainId, cachedBlock);
              blocks.push(cachedBlock);
            }

            if (blocks.length < limit) {
              const restLimit = limit - blocks.length;
              // console.log('restLimit', restLimit);
              await Promise.all(
                chainIds.map(async (chainId) => {
                  const earliestBlock = earliestBlocks.get(chainId);
                  if (!earliestBlock) {
                    return;
                  }
                  // const client = this.getChainNode(chainId);
                  // const results = await client.executeMany<'GetBlock'[]>(
                  // const results = await this.executeMany<'GetBlock'[]>(
                  //   Array(restLimit)
                  //     .fill(0)
                  //     .map((_, i) => ({
                  //       method: 'GetBlock',
                  //       params: [{ chainId, number: earliestBlock.number - i - 1 }],
                  //     })),
                  // );
                  // const blocks = results.map((result) => {
                  //   if (result.error) {
                  //     throw new Error(`Error fetching block: ${JSON.stringify(result.error)}`);
                  //   }
                  //   return result.value;
                  // });
                  const blocks_ = await this.executeMany(
                    Array(restLimit)
                      .fill(0)
                      .map((_, i) => [
                        'GetObject',
                        [
                          {
                            type: 'Block',
                            chainId,
                            number: earliestBlock.number - i - 1,
                          },
                        ],
                      ]),
                  );

                  const blocks = blocks_.map((block) => {
                    if (block.isErr || !block.value) {
                      throw new Error('Block not found');
                    }
                    return block.value as AksharaBlockData;
                  });

                  // earliestBlocks[chainId] = blocks[blocks.length - 1];

                  await this.database.putBlocks(blocks);
                }),
              );
              // console.log(
              //   'earliestBlocks',
              //   Object.values(earliestBlocks).map(({ chainId, number, timestamp }) => ({
              //     chainId,
              //     number,
              //     timestamp,
              //   })),
              // );

              {
                const cachedBlocks = await this.database.getBlocks(key, null, limit);
                for (const cachedBlock of cachedBlocks) {
                  if (!chainIds.includes(cachedBlock.chainId)) {
                    continue;
                  }
                  const earliestBlock = earliestBlocks.get(cachedBlock.chainId);
                  if (earliestBlock) {
                    if (earliestBlock.number - cachedBlock.number !== 1) {
                      continue;
                    }
                  }
                  earliestBlocks.set(cachedBlock.chainId, cachedBlock);
                  blocks.push(cachedBlock);
                }
              }
            }

            // // TODO: This shouldn't be necessary
            // blocks.sort(
            //   (a, b) =>
            //     b.timestamp - a.timestamp ||
            //     // parseInt(b.chainId, 10) - parseInt(a.chainId, 10) ||
            //     b.chainId.localeCompare(a.chainId) ||
            //     b.number - a.number,
            // );

            return Result.ok(blocks) satisfies CallResult;
          }
          default: {
            type CallResult = AksharaResult<(typeof call)[0]>;

            const [{ chainId }] = call[1] as [{ chainId: AksharaChainId }, ...unknown[]];
            const client = this.getDaClient(chainId);
            const result = await client.execute(call[0], call[1]);
            return Result.ok(result) as any satisfies CallResult;
          }
        }
      }),
    );

    return results;
  }
}

export const parseChainId = (id: string): AksharaChainKey => {
  return { chainId: id };
};
export const parseBlockId = (id: string): AksharaBlockKey => {
  const [chainId, number] = id.split('-');
  return { chainId, number: parseInt(number, 10) };
};
export const parseTransactionId = (id: string): AksharaTransactionKey => {
  const [chainId, blockNumber, transactionIndex] = id.split('-');
  return {
    chainId,
    blockNumber: parseInt(blockNumber, 10),
    transactionIndex: parseInt(transactionIndex, 10),
  };
};
export const parseReceiptId = (id: string): AksharaReceiptKey => {
  const [chainId, blockNumber, transactionIndex] = id.split('-');
  return {
    chainId,
    blockNumber: parseInt(blockNumber, 10),
    transactionIndex: parseInt(transactionIndex.slice(0, -1), 10),
  };
};
export const parseLogId = (id: string): AksharaLogKey => {
  const [chainId, blockNumber, transactionIndex, logIndex] = id.split('-');
  return {
    chainId,
    blockNumber: parseInt(blockNumber, 10),
    transactionIndex: parseInt(transactionIndex, 10),
    logIndex: parseInt(logIndex, 10),
  };
};

export const parseObjectId = (id: string): AksharaObjectKey => {
  const path = id.split('-');
  switch (path.length) {
    case 1: {
      return { type: 'Chain', ...parseChainId(id) };
    }
    case 2: {
      return { type: 'Block', ...parseBlockId(id) };
    }
    case 3: {
      const [, , transactionIndex] = id.split('-');
      if (transactionIndex.endsWith('r')) {
        return {
          type: 'Receipt',
          ...parseReceiptId(id),
        };
      } else {
        return { type: 'Transaction', ...parseTransactionId(id) };
      }
    }
    case 4: {
      return { type: 'Log', ...parseLogId(id) };
    }
    default: {
      throw new Error('Not implemented 9452');
    }
  }
};

export const formatChainId = (key: AksharaChainKey): AksharaChainId => {
  return `${key.chainId}`;
};
export const formatBlockId = (key: AksharaBlockKey): AksharaBlockId => {
  if ('number' in key) {
    return `${key.chainId}-${key.number}`;
  }
  throw new Error('Not implemented 9452');
};
export const formatTransactionId = (key: AksharaTransactionKey): AksharaTransactionId => {
  if ('blockNumber' in key) {
    return `${key.chainId}-${key.blockNumber}-${key.transactionIndex}`;
  }
  throw new Error('Not implemented 9452');
};
export const formatReceiptId = (key: AksharaReceiptKey): AksharaReceiptId => {
  if ('blockNumber' in key) {
    return `${key.chainId}-${key.blockNumber}-${key.transactionIndex}r`;
  }
  throw new Error('Not implemented 9452');
};
export const formatLogId = (key: AksharaLogKey): AksharaLogId => {
  if ('blockNumber' in key) {
    return `${key.chainId}-${key.blockNumber}-${key.transactionIndex}-${key.logIndex}`;
  }
  throw new Error('Not implemented 9452');
};

export const formatObjectId = (key: AksharaObjectKey): AksharaObjectId => {
  switch (key.type) {
    case 'Chain': {
      return formatChainId(key);
    }
    case 'Block': {
      return formatBlockId(key);
    }
    case 'Transaction': {
      return formatTransactionId(key);
    }
    case 'Receipt': {
      return formatReceiptId(key);
    }
    case 'Log': {
      return formatLogId(key);
    }
  }
};
