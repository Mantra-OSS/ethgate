import type * as Ethgate from '@/lib-node';
import {
  formatBlockId,
  formatChainId,
  formatLogId,
  formatReceiptId,
  formatTransactionId,
  maxTime,
  minTime,
  parseObjectId,
} from '@/lib-node';
import { blockSchema, chainSchema, logSchema, receiptSchema, transactionSchema } from '@/spec-node';
import { parseGlobalId } from '@/spec-solver';

import { SolverEdge, SolverNode } from './abstract';
import type { EdgeGenerator, ObjectId } from './abstract';
import type { ProperPageArgs } from './graph/abstract';
import { NodeType } from './graph/abstract';

export type AksharaTypeContext = {
  aks: Ethgate.Akshara;
};
export class AksharaNodeType<T extends AksharaNode> extends NodeType<T> {
  schema: Extract<Ethgate.AksharaObjectSchema, { aksharaType: T['type'] }>;
  create: (data: T['data']) => T;
  constructor(
    create: (data: T['data']) => T,
    schema: Extract<Ethgate.AksharaObjectSchema, { aksharaType: T['type'] }>,
  ) {
    const name = schema.aksharaType;
    const get = async (id: T['id'], ctx: AksharaTypeContext): Promise<T | void> => {
      const [, localId] = parseGlobalId(id);
      const obj = await ctx.aks.getObject(localId);
      if (!obj) {
        throw new Error(`Not found ${id}`);
      }
      return create(obj);
    };
    super(name, get);
    this.create = create;
    this.schema = schema;
  }
  async read(id: T['id'], ctx: AksharaTypeContext): Promise<T> {
    const node = await this.get(id, ctx);
    if (!node) {
      throw new Error(`Not found ${id}`);
    }
    return node;
  }
}

export class AksharaEdgeType {}

export abstract class AksharaNode<
  Name extends string = any,
  Data extends object = any,
  Id extends ObjectId<Name> = ObjectId<Name>,
> extends SolverNode<Name, Data, Id> {}

export abstract class AksharaEdge<
  Name extends string = any,
  TailId extends string = any,
  HeadId extends string = any,
  Data extends object = any,
> extends SolverEdge<Name, TailId, HeadId, Data> {}

export const chainType = new AksharaNodeType<Chain>(
  (data) => new Chain(`Chain:${formatChainId(data)}`, data),
  chainSchema,
);
export class Chain extends AksharaNode<
  'Chain',
  Ethgate.AksharaChainData,
  `Chain:${Ethgate.AksharaChainId}`
> {
  type = 'Chain' as const;
  meta = {
    name: this.data.meta.name,
    slug: this.data.extra.meta.slug,
    path: [this.id],
    themeColor: 'red',
  };
  parentId: Chain['id'] | undefined = this.data.parentId
    ? (`Chain:${this.data.parentId}` as const)
    : undefined;
  chainId = `Chain:${this.data.chainId}`;
}

export const blockType = new AksharaNodeType<Block>(
  (data) => new Block(`Block:${formatBlockId(data)}`, data),
  blockSchema,
);
export class Block extends AksharaNode<
  'Block',
  Ethgate.AksharaBlockData,
  `Block:${Ethgate.AksharaBlockId}`
> {
  type = 'Block' as const;
  chainId: Chain['id'] = `Chain:${this.data.chainId}`;
  meta = {
    name: this.data.number.toString(),
    slug: this.data.number.toString(),
    path: [this.chainId, this.id],
  };
  parentId: Block['id'] = `Block:${this.data.chainId}-${this.data.number - 1}`;
  transactionIds: Transaction['id'][] = this.data.transactions
    .map(
      (transactionHash, transactionIndex) =>
        `Transaction:${this.data.chainId}-${this.data.number}-${transactionIndex}` satisfies Transaction['id'],
    )
    .reverse();
  receiptIds: Receipt['id'][] = this.data.transactions
    .map(
      (transactionHash, transactionIndex) =>
        `Receipt:${this.data.chainId}-${this.data.number}-${transactionIndex}r` satisfies Receipt['id'],
    )
    .reverse();
  number = this.data.number;
  // chainId = this.data.chainId;
  gasUsed = this.data.gasUsed;
  logsBloom = this.data.logsBloom;
  timestamp = this.data.timestamp;
  hash = this.data.hash;
  parentHash = this.data.parentHash;
  gasLimit = this.data.gasLimit;
  baseFeePerGas = this.data.baseFeePerGas;
  miner = this.data.miner;
  size = this.data.size;
  transactions = this.data.transactions;
}

export const transactionType = new AksharaNodeType<Transaction>(
  (data) => new Transaction(`Transaction:${formatTransactionId(data)}`, data),
  transactionSchema,
);
export class Transaction extends AksharaNode<
  'Transaction',
  Ethgate.AksharaTransactionData,
  `Transaction:${Ethgate.AksharaTransactionId}`
> {
  type = 'Transaction' as const;
  chainId: Chain['id'] = `Chain:${this.data.chainId}`;
  blockId: Block['id'] = `Block:${this.data.chainId}-${this.data.blockNumber}`;
  meta = {
    name: this.data.transactionIndex.toString(),
    slug: this.data.transactionIndex.toString(),
    path: [this.chainId, this.blockId, this.id],
  };
  receiptId: Receipt['id'] = `Receipt:${this.data.chainId}-${this.data.blockNumber}-${this.data.transactionIndex}r`;
  // chainId = this.data.chainId;
  value = this.data.value;
  hash = this.data.hash;
  blockHash = this.data.blockHash;
  blockNumber = this.data.blockNumber;
  from = this.data.from;
  gas = this.data.gas;
  gasPrice = this.data.gasPrice;
  input = this.data.input;
  nonce = this.data.nonce;
  to = this.data.to;
  transactionIndex = this.data.transactionIndex;
  v = this.data.v;
  r = this.data.r;
  s = this.data.s;
}

export const receiptType = new AksharaNodeType<Receipt>(
  (data) => new Receipt(`Receipt:${formatReceiptId(data)}`, data),
  receiptSchema,
);
export class Receipt extends AksharaNode<
  'Receipt',
  Ethgate.AksharaReceiptData,
  `Receipt:${Ethgate.AksharaReceiptId}`
> {
  type = 'Receipt' as const;
  chainId: Chain['id'] = `Chain:${this.data.chainId}`;
  blockId: Block['id'] = `Block:${this.data.chainId}-${this.data.blockNumber}`;
  transactionId: Transaction['id'] = `Transaction:${formatTransactionId(this.data)}`;
  meta = {
    name: this.data.transactionIndex.toString(),
    slug: this.data.transactionIndex.toString(),
    path: [this.chainId, this.blockId, this.transactionId, this.id],
  };
  logIds: Log['id'][] = this.data.logs
    .map(
      (log) =>
        `Log:${this.data.chainId}-${this.data.blockNumber}-${this.data.transactionIndex}-${log.logIndex}` satisfies Log['id'],
    )
    .reverse();
  logs: Log[] = this.data.logs.map((log) => logType.create(log)).reverse();
  contractAddress = this.data.contractAddress;
  // chainId = this.data.chainId;
  gasUsed = this.data.gasUsed;
  logsBloom = this.data.logsBloom;
  blockHash = this.data.blockHash;
  blockNumber = this.data.blockNumber;
  from = this.data.from;
  to = this.data.to;
  transactionIndex = this.data.transactionIndex;
  transactionHash = this.data.transactionHash;
  cumulativeGasUsed = this.data.cumulativeGasUsed;
  // logs = this.data.logs;
  status = this.data.status;
}

export const logType = new AksharaNodeType<Log>(
  (data) => new Log(`Log:${formatLogId(data)}`, data),
  logSchema,
);
export class Log extends AksharaNode<'Log', Ethgate.AksharaLogData, `Log:${Ethgate.AksharaLogId}`> {
  type = 'Log' as const;
  chainId: Chain['id'] = `Chain:${this.data.chainId}`;
  blockId: Block['id'] = `Block:${this.data.chainId}-${this.data.blockNumber}`;
  transactionId: Transaction['id'] = `Transaction:${formatTransactionId(this.data)}`;
  receiptId: Receipt['id'] = `Receipt:${formatReceiptId(this.data)}`;
  meta = {
    name: this.data.logIndex.toString(),
    slug: this.data.logIndex.toString(),
    path: [this.chainId, this.blockId, this.transactionId, this.receiptId, this.id],
  };
  // chainId = this.data.chainId;
  blockHash = this.data.blockHash;
  blockNumber = this.data.blockNumber;
  transactionIndex = this.data.transactionIndex;
  address = this.data.address;
  topics = this.data.topics;
  // data = this.data.data;
  transactionHash = this.data.transactionHash;
  logIndex = this.data.logIndex;
  removed = this.data.removed;
}

export class ChainHasChain extends AksharaEdge<'ChainHasChain', Chain['id'], Chain['id'], object> {
  static typeName = 'ChainHasChain' as const;
  type = 'ChainHasChain' as const;
  static tail = chainType;
  static head = chainType;
  static connectionName = 'chains';
  static async *get(
    tailId: ChainHasChain['tailId'],
    args: ProperPageArgs<ChainHasChain>,
    ctx: AksharaTypeContext,
  ): EdgeGenerator<ChainHasChain> {
    const [, localId] = parseGlobalId(tailId);
    const chainIds: Chain['id'][] = await ctx.aks
      .getChains(localId)
      .then((chainIds) => chainIds.map((chainId) => `Chain:${chainId}` satisfies Chain['id']));
    for (const chainId of chainIds) {
      const edge = new ChainHasChain(tailId, chainId, {}, 0);
      yield edge;
    }
  }
}

export class ChainHasBlock extends AksharaEdge<
  'ChainHasBlock',
  Chain['id'],
  Block['id'],
  Record<string, never>
> {
  static typeName = 'ChainHasBlock' as const;
  type = 'ChainHasBlock' as const;
  static tail = chainType;
  static head = blockType;
  static connectionName = 'blocks';
  static async *get(
    tailId: ChainHasBlock['tailId'],
    args: ProperPageArgs<ChainHasBlock>,
    ctx: AksharaTypeContext,
  ): EdgeGenerator<ChainHasBlock> {
    const [, localId] = parseGlobalId(tailId);
    if (args.isForward) {
      let high = maxTime;
      if (args.after) {
        const [, localId] = parseGlobalId(args.after);
        const key = parseObjectId(localId);
        if (key.type !== 'Block' || !('number' in key)) {
          throw new Error(`Invalid cursor: ${args.after}`);
        }
        high = key.number;
      }

      for await (const blockNumber of ctx.aks.blockNumbers(
        { chainId: localId },
        high,
        minTime,
        args.limit,
      )) {
        const edge = new ChainHasBlock(tailId, `Block:${localId}-${blockNumber}`, {}, blockNumber);
        yield edge;
      }
    } else {
      throw new Error('Not implemented');
    }
  }
}

export class BlockHasTransaction extends AksharaEdge<
  'BlockHasTransaction',
  Block['id'],
  Transaction['id'],
  Record<string, never>
> {
  static typeName = 'BlockHasTransaction' as const;
  type = 'BlockHasTransaction' as const;
  static tail = blockType;
  static head = transactionType;
  static connectionName = 'transactions';
  static async *get(
    tailId: BlockHasTransaction['tailId'],
    args: ProperPageArgs<BlockHasTransaction>,
    ctx: AksharaTypeContext,
  ): EdgeGenerator<BlockHasTransaction> {
    const tail = await blockType.read(tailId, ctx);
    for (const transactionId of tail.transactionIds) {
      const edge = new BlockHasTransaction(tailId, transactionId, {}, tail.data.timestamp);
      yield edge;
    }
  }
}

export class BlockHasReceipt extends AksharaEdge<
  'BlockHasReceipt',
  Block['id'],
  Receipt['id'],
  object
> {
  static typeName = 'BlockHasReceipt' as const;
  type = 'BlockHasReceipt' as const;
  static tail = blockType;
  static head = receiptType;
  static connectionName = 'receipts';
  static async *get(
    tailId: BlockHasReceipt['tailId'],
    args: ProperPageArgs<BlockHasReceipt>,
    ctx: AksharaTypeContext,
  ): EdgeGenerator<BlockHasReceipt> {
    const tail = await blockType.read(tailId, ctx);
    for (const receiptId of tail.receiptIds) {
      const edge = new BlockHasReceipt(
        tailId,
        receiptId,
        {
          blockNumber: tail.data.number,
        },
        tail.data.timestamp,
      );
      yield edge;
    }
  }
}

export class ReceiptHasLog extends AksharaEdge<'ReceiptHasLog', Receipt['id'], Log['id'], object> {
  static typeName = 'ReceiptHasLog' as const;
  type = 'ReceiptHasLog' as const;
  static tail = receiptType;
  static head = logType;
  static connectionName = 'logs';
  static async *get(
    tailId: ReceiptHasLog['tailId'],
    args: ProperPageArgs<ReceiptHasLog>,
    ctx: AksharaTypeContext,
  ): EdgeGenerator<ReceiptHasLog> {
    const tail = await receiptType.read(tailId, ctx);
    const block = await blockType.read(tail.blockId, ctx);
    for (const logId of tail.logIds) {
      const edge = new ReceiptHasLog(tailId, logId, {}, block.data.timestamp);
      yield edge;
    }
  }
}
