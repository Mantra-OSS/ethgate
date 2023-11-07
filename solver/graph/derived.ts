import type { EthgateSolverDatabase } from '../database/database';

import type { EdgeGenerator } from './abstract';
import { SolverEdge } from './abstract';
import type { Block, Chain, Log, Receipt, Transaction } from './akshara';
import {
  BlockHasReceipt,
  BlockHasTransaction,
  ChainHasBlock,
  ReceiptHasLog,
  blockType,
  chainType,
  logType,
  receiptType,
  transactionType,
} from './akshara';
import type { ProperPageArgs } from './graph/abstract';

export class TransactionHasLog extends SolverEdge<
  'TransactionHasLog',
  Transaction['id'],
  Log['id'],
  object
> {
  static typeName = 'TransactionHasLog' as const;
  type = 'TransactionHasLog' as const;
  static tail = transactionType;
  static head = logType;
  static connectionName = 'logs';
  static async *get(
    tailId: TransactionHasLog['tailId'],
    args: ProperPageArgs<TransactionHasLog>,
    ctx: EthgateSolverDatabase,
  ): EdgeGenerator<TransactionHasLog> {
    const tail = await transactionType.read(tailId, ctx);
    const receipt = await receiptType.read(tail.receiptId, ctx);
    for await (const receiptHasLog of ReceiptHasLog.get(
      receipt.id,
      {
        isForward: args.isForward,
        after: args.after && (await ctx.readNode<Log>(args.after).then((node) => node.id)),
        limit: args.limit,
      },
      ctx,
    )) {
      const edge = new TransactionHasLog(
        tailId,
        receiptHasLog.headId,
        receiptHasLog.data,
        receiptHasLog.time,
      );
      yield edge;
    }
  }
}

export class BlockHasLog extends SolverEdge<'BlockHasLog', Block['id'], Log['id'], object> {
  static typeName = 'BlockHasLog' as const;
  type = 'BlockHasLog' as const;
  static tail = blockType;
  static head = logType;
  static connectionName = 'logs';
  static async *get(
    tailId: BlockHasLog['tailId'],
    args: ProperPageArgs<BlockHasLog>,
    ctx: EthgateSolverDatabase,
  ): EdgeGenerator<BlockHasLog> {
    for await (const blockHasReceipt of BlockHasReceipt.get(
      tailId,
      {
        isForward: args.isForward,
        after: args.after && (await ctx.readNode<Log>(args.after).then((node) => node.receiptId)),
        limit: args.limit,
      },
      ctx,
    )) {
      for await (const receiptHasLog of ReceiptHasLog.get(
        blockHasReceipt.headId,
        {
          isForward: args.isForward,
          after: args.after,
          limit: args.limit,
        },
        ctx,
      )) {
        const edge = new BlockHasLog(
          tailId,
          receiptHasLog.headId,
          receiptHasLog.data,
          receiptHasLog.time,
        );

        yield edge;
      }
    }
  }
}

export class ChainHasTransaction extends SolverEdge<
  'ChainHasTransaction',
  Chain['id'],
  Transaction['id'],
  Record<string, never>
> {
  static typeName = 'ChainHasTransaction' as const;
  type = 'ChainHasTransaction' as const;
  static tail = chainType;
  static head = transactionType;
  static connectionName = 'transactions';
  static async *get(
    tailId: ChainHasTransaction['tailId'],
    args: ProperPageArgs<ChainHasTransaction>,
    ctx: EthgateSolverDatabase,
  ): EdgeGenerator<ChainHasTransaction> {
    for await (const chainHasBlock of ChainHasBlock.get(
      tailId,
      {
        isForward: args.isForward,
        after:
          args.after && (await ctx.readNode<Transaction>(args.after).then((node) => node.blockId)),
        limit: args.limit,
      },
      ctx,
    )) {
      for await (const blockHasTransaction of BlockHasTransaction.get(
        chainHasBlock.headId,
        {
          isForward: args.isForward,
          after: args.after,
          limit: args.limit,
        },
        ctx,
      )) {
        const edge = new ChainHasTransaction(
          tailId,
          blockHasTransaction.headId,
          blockHasTransaction.data as any,
          blockHasTransaction.time,
        );

        yield edge;
      }
    }
  }
}

export class ChainHasDescendantBlock extends SolverEdge<
  'ChainHasDescendantBlock',
  Chain['id'],
  Block['id'],
  {
    blockNumber: number;
  }
> {
  static typeName = 'ChainHasDescendantBlock' as const;
  type = 'ChainHasDescendantBlock' as const;
  static tail = chainType;
  static head = blockType;
  static connectionName = 'descendantBlocks';
  static async *get(
    tailId: ChainHasDescendantBlock['tailId'],
    args: ProperPageArgs<ChainHasDescendantBlock>,
    ctx: EthgateSolverDatabase,
  ): EdgeGenerator<ChainHasDescendantBlock> {
    // let assocs;
    // // const tail = await ctx.readNode<Chain>(tailId);
    // if (args.isForward) {
    //   if (args.after) {
    //     const block = await ctx.readNode<Block>(args.after);
    //     assocs = await ctx.provider.getBlockTimeRange({}, block.data.timestamp, args.limit + 1);
    //     assocs.shift();
    //   } else {
    //     assocs = await ctx.provider.getBlockRange({}, 0, args.limit);
    //   }
    // } else {
    //   throw new Error('Not implemented');
    // }
    // const blocks = assocs.map((assoc) => new Block(assoc));
    // const edges = blocks.map(
    //   (block) =>
    //     new ChainHasDescendantBlock(
    //       tailId,
    //       block.id,
    //       {
    //         blockNumber: block.data.number as any,
    //       },
    //       block.data.timestamp,
    //     ),
    // );
    // yield* edges;
    // return;
  }
}
