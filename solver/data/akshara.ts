import type * as Ethgate from "@/akshara/index.js";
import {
  formatBlockId,
  formatChainId,
  formatLogId,
  formatReceiptId,
  formatTransactionId,
  maxTime,
  minTime,
  parseObjectId,
} from "@/akshara/index.js";
import {
  blockSchema,
  chainSchema,
  logSchema,
  receiptSchema,
  transactionSchema,
} from "@ethgate/spec-node";
import { parseGlobalId } from "@ethgate/spec-solver";

import type { EdgeType, NodeType, ProperPageArgs } from "../graph/index.js";

import type { EdgeGenerator, ObjectId } from "./database/abstract.js";
import { EdgeAbstract, NodeAbstract } from "./database/abstract.js";

export type AksharaTypeContext = {
  aks: Ethgate.Akshara;
};
export class AksharaNodeType<T extends AksharaNode> implements NodeType<T> {
  name: T["type"];
  schema: Extract<Ethgate.AksharaObjectSchema, { aksharaType: T["type"] }>;
  get: (id: T["id"], ctx: AksharaTypeContext) => Promise<T | void>;
  constructor(
    create: (data: T["data"]) => T,
    schema: Extract<Ethgate.AksharaObjectSchema, { aksharaType: T["type"] }>
  ) {
    this.name = schema.aksharaType;
    this.schema = schema;
    this.get = async (
      id: T["id"],
      ctx: AksharaTypeContext
    ): Promise<T | void> => {
      const [, localId] = parseGlobalId(id);
      const obj = await ctx.aks.getObject(localId);
      if (!obj) {
        throw new Error(`Not found ${id}`);
      }
      return create(obj);
    };
  }
}

export class AksharaEdgeType<T extends AksharaEdge> {
  //  implements EdgeType<T> {
  // name: T["type"];
  // tail: NodeType<any>;
  // head: NodeType<any>;
  // connectionName: string;
  // get(
  //   tailId: T["tailId"],
  //   args: ProperPageArgs<T>,
  //   ctx: AksharaTypeContext
  // ): EdgeGenerator<T>;
}

export abstract class AksharaNode<
  Name extends string = any,
  Data extends object = any,
  Id extends ObjectId<Name> = ObjectId<Name>
> extends NodeAbstract<Name, Data, Id> {}

export abstract class AksharaEdge<
  Name extends string = any,
  TailId extends string = any,
  HeadId extends string = any,
  Data extends object = any
> extends EdgeAbstract<Name, TailId, HeadId, Data> {}

export class Chain extends AksharaNode<
  "Chain",
  Ethgate.AksharaChainData,
  `Chain:${Ethgate.AksharaChainId}`
> {
  static type = new AksharaNodeType((data) => new Chain(data), chainSchema);
  static get = Chain.type.get;
  type = "Chain" as const;

  constructor(data: Chain["data"]) {
    super(`Chain:${formatChainId(data)}`, data);
  }
  readonly meta = {
    name: this.data.name,
  };
  parentId: Chain["id"] | undefined = this.data.parentId
    ? (`Chain:${this.data.parentId}` as const)
    : undefined;
}

export class Block extends AksharaNode<
  "Block",
  Ethgate.AksharaBlockData,
  `Block:${Ethgate.AksharaBlockId}`
> {
  static type = new AksharaNodeType((data) => new Block(data), blockSchema);
  static get = Block.type.get;
  type = "Block" as const;

  constructor(data: Block["data"]) {
    super(`Block:${formatBlockId(data)}`, data);
  }
  readonly meta = {
    name: this.data.number.toString(),
  };
  chainId: Chain["id"] = `Chain:${this.data.chainId}`;
  parentId: Block["id"] = `Block:${this.data.chainId}-${this.data.number - 1}`;
  transactionIds: Transaction["id"][] = this.data.transactions
    .map(
      (transactionHash, transactionIndex) =>
        `Transaction:${this.data.chainId}-${this.data.number}-${transactionIndex}` satisfies Transaction["id"]
    )
    .reverse();
  receiptIds: Receipt["id"][] = this.data.transactions
    .map(
      (transactionHash, transactionIndex) =>
        `Receipt:${this.data.chainId}-${this.data.number}-${transactionIndex}r` satisfies Receipt["id"]
    )
    .reverse();
}

export class Transaction extends AksharaNode<
  "Transaction",
  Ethgate.AksharaTransactionData,
  `Transaction:${Ethgate.AksharaTransactionId}`
> {
  static type = new AksharaNodeType(
    (data) => new Transaction(data),
    transactionSchema
  );
  static get = Transaction.type.get;
  type = "Transaction" as const;

  constructor(data: Transaction["data"]) {
    super(`Transaction:${formatTransactionId(data)}`, data);
  }
  readonly meta = {
    name: this.data.transactionIndex.toString(),
  };
  chainId: Chain["id"] = `Chain:${this.data.chainId}`;
  blockId: Block["id"] = `Block:${this.data.chainId}-${this.data.blockNumber}`;
  receiptId: Receipt["id"] = `Receipt:${this.data.chainId}-${this.data.blockNumber}-${this.data.transactionIndex}r`;
}

export class Receipt extends AksharaNode<
  "Receipt",
  Ethgate.AksharaReceiptData,
  `Receipt:${Ethgate.AksharaReceiptId}`
> {
  static type = new AksharaNodeType((data) => new Receipt(data), receiptSchema);
  static get = Receipt.type.get;
  type = "Receipt" as const;

  constructor(data: Receipt["data"]) {
    super(`Receipt:${formatReceiptId(data)}`, data);
  }
  readonly meta = {
    name: this.data.transactionIndex.toString(),
  };
  chainId: Chain["id"] = `Chain:${this.data.chainId}`;
  blockId: Block["id"] = `Block:${this.data.chainId}-${this.data.blockNumber}`;
  transactionId: Transaction["id"] = `Transaction:${formatTransactionId(
    this.data
  )}`;
  logIds: Log["id"][] = this.data.logs
    .map(
      (log) =>
        `Log:${this.data.chainId}-${this.data.blockNumber}-${this.data.transactionIndex}-${log.logIndex}` satisfies Log["id"]
    )
    .reverse();
  logs: Log[] = this.data.logs.map((log) => new Log(log)).reverse();
}

export class Log extends AksharaNode<
  "Log",
  Ethgate.AksharaLogData,
  `Log:${Ethgate.AksharaLogId}`
> {
  static type = new AksharaNodeType((data) => new Log(data), logSchema);
  static get = Log.type.get;
  type = "Log" as const;

  constructor(data: Log["data"]) {
    //   `${data.chainId}-${data.blockNumber}-${data.transactionIndex}-${data.logIndex}` as const;
    super(`Log:${formatLogId(data)}`, data);
  }
  readonly meta = {
    name: this.data.logIndex.toString(),
  };
  chainId: Chain["id"] = `Chain:${this.data.chainId}`;
  blockId: Block["id"] = `Block:${this.data.chainId}-${this.data.blockNumber}`;
  transactionId: Transaction["id"] = `Transaction:${formatTransactionId(
    this.data
  )}`;
  receiptId: Receipt["id"] = `Receipt:${formatReceiptId(this.data)}`;
}

export class ChainHasChain extends AksharaEdge<
  "ChainHasChain",
  Chain["id"],
  Chain["id"],
  object
> {
  static typeName = "ChainHasChain" as const;
  type = "ChainHasChain" as const;
  static tail = Chain.type;
  static head = Chain.type;
  static connectionName = "chains";
  static async *get(
    tailId: ChainHasChain["tailId"],
    args: ProperPageArgs<ChainHasChain>,
    ctx: AksharaTypeContext
  ): EdgeGenerator<ChainHasChain> {
    const [, localId] = parseGlobalId(tailId);
    const chainIds: Chain["id"][] = await ctx.aks
      .getChains(localId)
      .then((chainIds) =>
        chainIds.map((chainId) => `Chain:${chainId}` satisfies Chain["id"])
      );
    for (const chainId of chainIds) {
      const edge = new ChainHasChain(tailId, chainId, {}, 0);
      yield edge;
    }
  }
}

export class ChainHasBlock extends AksharaEdge<
  "ChainHasBlock",
  Chain["id"],
  Block["id"],
  Record<string, never>
> {
  static typeName = "ChainHasBlock" as const;
  type = "ChainHasBlock" as const;
  static tail = Chain.type;
  static head = Block;
  static connectionName = "blocks";
  static async *get(
    tailId: ChainHasBlock["tailId"],
    args: ProperPageArgs<ChainHasBlock>,
    ctx: AksharaTypeContext
  ): EdgeGenerator<ChainHasBlock> {
    const [, localId] = parseGlobalId(tailId);
    if (args.isForward) {
      let high = maxTime;
      if (args.after) {
        const [, localId] = parseGlobalId(args.after);
        const key = parseObjectId(localId);
        if (key.type !== "Block" || !("number" in key)) {
          throw new Error(`Invalid cursor: ${args.after}`);
        }
        high = key.number;
      }

      for await (const blockNumber of ctx.aks.blockNumbers(
        { chainId: localId },
        high,
        minTime,
        args.limit
      )) {
        const edge = new ChainHasBlock(
          tailId,
          `Block:${localId}-${blockNumber}`,
          {},
          blockNumber
        );
        yield edge;
      }
    } else {
      throw new Error("Not implemented");
    }
  }
}

export class BlockHasTransaction extends AksharaEdge<
  "BlockHasTransaction",
  Block["id"],
  Transaction["id"],
  Record<string, never>
> {
  static typeName = "BlockHasTransaction" as const;
  type = "BlockHasTransaction" as const;
  static tail = Block;
  static head = Transaction;
  static connectionName = "transactions";
  static async *get(
    tailId: BlockHasTransaction["tailId"],
    args: ProperPageArgs<BlockHasTransaction>,
    ctx: AksharaTypeContext
  ): EdgeGenerator<BlockHasTransaction> {
    const tail = await Block.get(tailId, ctx);
    for (const transactionId of tail.transactionIds) {
      const edge = new BlockHasTransaction(
        tailId,
        transactionId,
        {},
        tail.data.timestamp
      );
      yield edge;
    }
  }
}

export class BlockHasReceipt extends AksharaEdge<
  "BlockHasReceipt",
  Block["id"],
  Receipt["id"],
  object
> {
  static typeName = "BlockHasReceipt" as const;
  type = "BlockHasReceipt" as const;
  static tail = Block;
  static head = Receipt;
  static connectionName = "receipts";
  static async *get(
    tailId: BlockHasReceipt["tailId"],
    args: ProperPageArgs<BlockHasReceipt>,
    ctx: AksharaTypeContext
  ): EdgeGenerator<BlockHasReceipt> {
    const tail = await Block.get(tailId, ctx);
    for (const receiptId of tail.receiptIds) {
      const edge = new BlockHasReceipt(
        tailId,
        receiptId,
        {
          blockNumber: tail.data.number,
        },
        tail.data.timestamp
      );
      yield edge;
    }
  }
}

export class ReceiptHasLog extends AksharaEdge<
  "ReceiptHasLog",
  Receipt["id"],
  Log["id"],
  object
> {
  static typeName = "ReceiptHasLog" as const;
  type = "ReceiptHasLog" as const;
  static tail = Receipt;
  static head = Log;
  static connectionName = "logs";
  static async *get(
    tailId: ReceiptHasLog["tailId"],
    args: ProperPageArgs<ReceiptHasLog>,
    ctx: AksharaTypeContext
  ): EdgeGenerator<ReceiptHasLog> {
    const tail = await Receipt.get(tailId, ctx);
    const block = await Block.get(tail.blockId, ctx);
    for (const logId of tail.logIds) {
      const edge = new ReceiptHasLog(tailId, logId, {}, block.data.timestamp);
      yield edge;
    }
  }
}
