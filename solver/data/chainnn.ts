import type { EthgateSolverDatabase } from "../database/database";
import type { ProperPageArgs } from "../graph";

import {
  Block,
  BlockHasReceipt,
  BlockHasTransaction,
  Chain,
  ChainHasBlock,
  Log,
  ReceiptHasLog,
  Transaction,
} from "./akshara";
import type { EdgeGenerator } from "./database/abstract";
import { EdgeAbstract } from "./database/abstract";

export class BlockHasLog extends EdgeAbstract<
  "BlockHasLog",
  Block["id"],
  Log["id"],
  object
> {
  static typeName = "BlockHasLog" as const;
  type = "BlockHasLog" as const;
  static tail = Block;
  static head = Log;
  static connectionName = "logs";
  static async *get(
    tailId: BlockHasLog["tailId"],
    args: ProperPageArgs<BlockHasLog>,
    ctx: EthgateSolverDatabase
  ): EdgeGenerator<BlockHasLog> {
    for await (const blockHasReceipt of BlockHasReceipt.get(
      tailId,
      {
        isForward: args.isForward,
        after:
          args.after &&
          (await ctx.readNode<Log>(args.after).then((node) => node.receiptId)),
        limit: args.limit,
      },
      ctx
    )) {
      for await (const receiptHasLog of ReceiptHasLog.get(
        blockHasReceipt.headId,
        {
          isForward: args.isForward,
          after: args.after,
          limit: args.limit,
        },
        ctx
      )) {
        const edge = new BlockHasLog(
          tailId,
          receiptHasLog.headId,
          receiptHasLog.data,
          receiptHasLog.time
        );

        yield edge;
      }
    }
  }
}

export class ChainHasTransaction extends EdgeAbstract<
  "ChainHasTransaction",
  Chain["id"],
  Transaction["id"],
  Record<string, never>
> {
  static typeName = "ChainHasTransaction" as const;
  type = "ChainHasTransaction" as const;
  static tail = Chain.type;
  static head = Transaction;
  static connectionName = "transactions";
  static async *get(
    tailId: ChainHasTransaction["tailId"],
    args: ProperPageArgs<ChainHasTransaction>,
    ctx: EthgateSolverDatabase
  ): EdgeGenerator<ChainHasTransaction> {
    for await (const chainHasBlock of ChainHasBlock.get(
      tailId,
      {
        isForward: args.isForward,
        after:
          args.after &&
          (await ctx
            .readNode<Transaction>(args.after)
            .then((node) => node.blockId)),
        limit: args.limit,
      },
      ctx
    )) {
      for await (const blockHasTransaction of BlockHasTransaction.get(
        chainHasBlock.headId,
        {
          isForward: args.isForward,
          after: args.after,
          limit: args.limit,
        },
        ctx
      )) {
        const edge = new ChainHasTransaction(
          tailId,
          blockHasTransaction.headId,
          blockHasTransaction.data as any,
          blockHasTransaction.time
        );

        yield edge;
      }
    }
  }
}
