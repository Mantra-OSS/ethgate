/* eslint-disable @typescript-eslint/no-unused-vars */
import { Pool, Result } from '@/lib-utils';
import type {
  AksharaBlockData,
  AksharaChainData,
  AksharaChainId,
  AksharaDaCall,
  AksharaDaMethod,
  AksharaDaResult,
  EthereumCall,
  PeerTypes,
} from '@/spec-node';
import { AksharaDaClientAbstract } from '@/spec-node';

import { EthereumPeer, blockFromEth, logFromEth, receiptFromEth, transactionFromEth } from '..';

import { type Fetch } from './peer';
import { BatchLoader } from './utils';

const ENABLE_CACHING = false;

// export type AksharaDaClientConfig = {
//   chain: AksharaChainData;
//   fetch: Fetch;
//   batchScheduleFn?: (callback: () => void) => void;
//   cacheMap: DataLoader.CacheMap<string, Promise<AksharaDaClientResult>>;
//   persistCache: boolean;
// };

export class AksharaDaClient extends AksharaDaClientAbstract {
  readonly pool: AksharaPeerPool;
  readonly loader: BatchLoader<AksharaDaCall, AksharaDaResult, string>;
  latestBlocks: Map<AksharaChainId, AksharaBlockData> = new Map();

  constructor(root: AksharaChainData, fetchFn: Fetch) {
    super(root);
    const peers = root.rpcs.map(({ url }) => {
      const peer = new EthereumPeer({
        url,
        fetch: fetchFn,
      });
      return peer;
    });

    const configg = {
      // batchScheduleFn: (callback: any) => setTimeout(callback, 1000 / 30 / 30),
      batchScheduleFn: (callback: any) => setTimeout(callback, 2000),
      cacheMap: new Map(),
      persistCache: ENABLE_CACHING,
    };
    this.pool = new AksharaPeerPool(
      peers
        .map((peer) => ({
          peer,
          priority: Math.floor(Math.random() * 100),
        }))
        .sort((a, b) => a.priority - b.priority),
    );
    this.loader = new BatchLoader({
      batchLoadFn: this._batchLoad,
      cacheKeyFn: (call) => JSON.stringify(call),
      batchScheduleFn: configg.batchScheduleFn,
      cacheMap: configg.cacheMap,
      persistCache: configg.persistCache,
    });
  }

  _batchLoad = async (
    calls: ReadonlyArray<AksharaDaCall>,
  ): Promise<Array<AksharaDaResult | Error>> => {
    const DEBUG = false;
    if (DEBUG) {
      const logName = 'DataLoaderTransport.#batchLoad';
      const logArgs = [
        `[${logName}]`,
        `Loading ${calls.length} request${calls.length === 1 ? '' : 's'}:`,
      ];
      if (calls.length === 1) {
        console.groupCollapsed(...logArgs, calls[0][0], calls[0][1]);
      } else {
        console.group(...logArgs);
      }
      calls.forEach((call) => {
        console.log(call[0], call[1]);
      });
      console.groupEnd();
    }

    // const responses = new Array(calls.length);

    const peerCalls = calls.map((call): EthereumCall => {
      switch (call[0]) {
        case 'GetObject': {
          const [{ type, ...key }] = call[1];
          switch (type) {
            case 'Block': {
              if ('hash' in key) {
                return ['eth_getBlockByHash', [key.hash, false]];
              } else if ('number' in key) {
                return ['eth_getBlockByNumber', [`0x${key.number.toString(16)}`, false]];
              } else {
                throw new Error('Not implemented 2351');
              }
            }
            case 'Transaction': {
              if ('hash' in key) {
                return ['eth_getTransactionByHash', [key.hash]];
              } else if ('blockNumber' in key && 'transactionIndex' in key) {
                return [
                  'eth_getTransactionByBlockNumberAndIndex',
                  [`0x${key.blockNumber.toString(16)}`, `0x${key.transactionIndex.toString(16)}`],
                ];
              } else if ('blockHash' in key && 'transactionIndex' in key) {
                return [
                  'eth_getTransactionByBlockHashAndIndex',
                  [key.blockHash, `0x${key.transactionIndex.toString(16)}`],
                ];
              } else {
                throw new Error('Not implemented 6284');
              }
            }
            case 'Receipt': {
              if ('transactionHash' in key) {
                return ['eth_getTransactionReceipt', [key.transactionHash]];
              } else {
                throw new Error('Not implemented 6284');
              }
            }
            case 'Log': {
              if ('transactionHash' in key && 'logIndex' in key) {
                return ['eth_getTransactionReceipt', [key.transactionHash]];
              } else if ('blockNumber' in key && 'transactionIndex' in key && 'logIndex' in key) {
                return [
                  'eth_getLogs',
                  [
                    {
                      fromBlock: `0x${key.blockNumber.toString(16)}`,
                      toBlock: `0x${key.blockNumber.toString(16)}`,
                    },
                  ],
                ];
              } else if ('blockHash' in key && 'transactionIndex' in key && 'logIndex' in key) {
                return [
                  'eth_getLogs',
                  [
                    {
                      blockHash: key.blockHash,
                    },
                  ],
                ];
              }
            }
          }
          throw new Error('Not implemented 2321');
        }
        case 'GetLatestBlock': {
          const [key] = call[1];
          return ['eth_getBlockByNumber', ['latest', false]];
        }
        default: {
          console.log('call', call);
          throw new Error('Not implemented asd');
        }
      }
    });

    const fn = (peer: EthereumPeer) =>
      peer.executeMany(peerCalls).then((peerResults) => {
        return peerResults.map((result, i) => {
          if (result.isErr) {
            return result;
          }
          const call = calls[i];
          switch (call[0]) {
            case 'GetObject': {
              type CallResult = AksharaDaResult<(typeof call)[0]>;
              if (!result.value) {
                return Result.err(new Error(`Object not found: ${JSON.stringify(call)}`));
              }
              const [{ type, ...key }] = call[1];
              switch (type) {
                case 'Block': {
                  const block = blockFromEth(this.root.chainId, result.value as any);
                  return Result.ok(block) satisfies CallResult;
                }
                case 'Transaction': {
                  const transaction = transactionFromEth(this.root.chainId, result.value as any);
                  return Result.ok(transaction) satisfies CallResult;
                }
                case 'Receipt': {
                  const receipt = receiptFromEth(this.root.chainId, result.value as any);
                  return Result.ok(receipt) satisfies CallResult;
                }
                case 'Log': {
                  if ('transactionHash' in key && 'logIndex' in key) {
                    const receipt = receiptFromEth(this.root.chainId, result.value as any);
                    const log = receipt.logs[key.logIndex];
                    return Result.ok(log) satisfies CallResult;
                  } else if (
                    'blockNumber' in key &&
                    'transactionIndex' in key &&
                    'logIndex' in key
                  ) {
                    const logs = (result.value as any[]).map((log: PeerTypes.Log) =>
                      logFromEth(this.root.chainId, log),
                    );
                    const log = logs.find(
                      (log) =>
                        log.blockNumber === key.blockNumber &&
                        log.transactionIndex === key.transactionIndex &&
                        log.logIndex === key.logIndex,
                    );
                    return Result.ok(log) satisfies CallResult;
                  } else {
                    const log = logFromEth(this.root.chainId, result.value as any);
                    return Result.ok(log) satisfies CallResult;
                  }
                }
                default: {
                  throw new Error('Not implemented 0342');
                }
              }
            }
            case 'GetLatestBlock': {
              type CallResult = AksharaDaResult<'GetLatestBlock'>;
              if (!result.value) {
                return Result.err(new Error(`Latest block not found: ${JSON.stringify(call)}`));
              }
              const block = blockFromEth(this.root.chainId, result.value as any);
              this.latestBlocks.set(this.root.chainId, block);
              return Result.ok(block) satisfies CallResult;
            }
            default: {
              console.log('call', call);
              throw new Error('Not implemented asd');
            }
          }
        });
      });

    const innerResponses = await Promise.any([this.pool.withPeer(fn), this.pool.withPeer(fn)]);

    const responses = innerResponses.map((innerResponse) => {
      if (innerResponse.isErr) {
        return innerResponse.error;
      }
      return innerResponse;
    });

    // calls.forEach((call) => {
    //   // Do not keep results that can change in the cache.
    //   if (call[0] === 'GetBlockByNumber' && call[1][0] === 'latest') {
    //     this.#loader.clear(call);
    //   }
    // });

    return responses;
  };

  async executeBatch(calls: AksharaDaMethod['Call'][]): Promise<AksharaDaMethod['Result'][]> {
    const responses = await this.loader.loadMany(calls);
    return responses as any;
  }
}

type PoolItem = {
  peer: EthereumPeer;
  priority: number;
};

export class AksharaPeerPool {
  _pool: Pool<PoolItem>;

  constructor(items: PoolItem[]) {
    this._pool = new Pool(items);
  }

  async withPeer<T>(fn: (peer: EthereumPeer) => Promise<T>): Promise<T> {
    const item = await this._pool.acquire();
    try {
      // console.log('acquired', item.peer);
      return await fn(item.peer);
    } finally {
      (async () => {
        // console.log('releasing...', item.peer);
        // await new Promise((resolve) => setTimeout(resolve, 10000));
        this._pool.release(item);
        // console.log('released', item.peer);
      })();
    }
  }
}
