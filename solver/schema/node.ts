import type { AksharaChainId, Hash } from "@/akshara/index.js";
import { GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";

import {
  BlockHasLog,
  BlockHasReceipt,
  BlockHasTransaction,
  Chain,
  ChainHasBlock,
  ChainHasChain,
  ChainHasDescendantBlock,
  ChainHasTransaction,
  Log,
  Receipt,
  ReceiptHasLog,
  Transaction,
} from "../data/index.js";
import { Block } from "../data/index.js";

import { SchemaEdgeType, SchemaNodeType } from "./helpers/graph.js";
import { GraphQLU64 } from "./scalars/primitive.js";

export const asdasd = () => {
  const edgeTypes = [
    ChainHasChain,
    ChainHasBlock,
    ChainHasDescendantBlock,
    ChainHasTransaction,
    BlockHasTransaction,
    BlockHasLog,
    BlockHasReceipt,
    ReceiptHasLog,
  ];

  const schemaNodeTypes = new Map<string, SchemaNodeType<any>>();

  const schemaEdgeTypes = new Map<string, SchemaEdgeType<any, any>>();

  const SchemaChain: SchemaNodeType<Chain> = new SchemaNodeType(
    schemaNodeTypes,
    schemaEdgeTypes,
    Chain.type as any,
    {
      name: "Chain",
      description: "A blockchain",
      fields: () => ({
        chain: {
          type: schemaNodeTypes.get("Chain")!,
          args: {
            chainId: {
              type: new GraphQLNonNull(GraphQLString),
              description: "The EIP155 ID of the chain",
            },
          },
          resolve(parent, args: { chainId: AksharaChainId }, ctx) {
            return ctx.node
              .getObject({ type: "Chain", chainId: args.chainId })
              .then((data) => data && new Chain(data));
          },
        },
        block: {
          type: SchemaBlock,
          args: {
            hash: {
              type: GraphQLString,
            },
            number: {
              type: GraphQLU64,
            },
          },
          resolve: (
            node,
            args: {
              hash?: Hash;
              number?: number;
            },
            ctx
          ) => {
            if (args.hash) {
              return ctx.node
                .getObject({
                  type: "Block",
                  chainId: node.data.chainId,
                  hash: args.hash,
                })
                .then((data) => data && new Block(data));
            } else if (typeof args.number === "number") {
              return ctx.node
                .getObject({
                  type: "Block",
                  chainId: node.data.chainId,
                  number: args.number,
                })
                .then((data) => data && new Block(data));
            }
          },
        },
        transaction: {
          type: SchemaTransaction,
          args: {
            hash: {
              type: GraphQLString,
            },
            blockNumber: {
              type: GraphQLInt,
            },
            transactionIndex: {
              type: GraphQLInt,
            },
          },
          resolve: (
            node,
            args: {
              hash?: Hash;
              blockNumber?: number;
              transactionIndex?: number;
            },
            ctx
          ) => {
            if (args.hash) {
              return ctx.node
                .getObject({
                  type: "Transaction",
                  chainId: node.data.chainId,
                  hash: args.hash,
                })
                .then((data) => data && new Transaction(data));
            } else if (args.blockNumber && args.transactionIndex) {
              return ctx.node
                .getObject({
                  type: "Transaction",
                  chainId: node.data.chainId,
                  blockNumber: args.blockNumber,
                  transactionIndex: args.transactionIndex,
                })
                .then((data) => data && new Transaction(data));
            }
          },
        },
        // Node fields
        parent: {
          type: SchemaChain,
          description: "The parent chain",
          resolve: (node, args, ctx) =>
            node.parentId && ctx.db.readNode<Chain>(node.parentId),
        },
      }),
    }
  );

  const SchemaBlock: SchemaNodeType<Block> = new SchemaNodeType(
    schemaNodeTypes,
    schemaEdgeTypes,
    Block,
    {
      name: "Block",
      description: "The block object",
      fields: () => ({
        transaction: {
          type: SchemaTransaction,
          args: {
            hash: {
              type: GraphQLString,
            },
            transactionIndex: {
              type: GraphQLInt,
            },
          },
          resolve: (
            node,
            args: {
              hash?: Hash;
              transactionIndex?: number;
            },
            ctx
          ) => {
            const chainId = node.data.chainId;
            if (args.hash) {
              return ctx.node
                .getTransaction({ chainId, hash: args.hash })
                .then((data) => data && new Transaction(data));
            } else if (typeof args.transactionIndex === "number") {
              const hash = node.data.transactions[args.transactionIndex];
              return ctx.node
                .getTransaction({ chainId, hash })
                .then((data) => data && new Transaction(data));
            }
          },
        },
        chain: {
          type: new GraphQLNonNull(SchemaChain),
          description: "The chain",
          resolve: (node, args, ctx) => ctx.db.readNode<Chain>(node.chainId),
        },
        // Node fields
        parent: {
          type: new GraphQLNonNull(SchemaBlock),
          resolve: (node, args, ctx) => ctx.db.readNode<Block>(node.parentId),
        },
      }),
    }
  );

  const SchemaTransaction: SchemaNodeType<Transaction> = new SchemaNodeType(
    schemaNodeTypes,
    schemaEdgeTypes,
    Transaction,
    {
      name: "Transaction",
      fields: () => ({
        // Node fields
        receipt: {
          type: new GraphQLNonNull(SchemaReceipt),
          resolve: (node, args, ctx) =>
            ctx.db.readNode<Receipt>(node.receiptId),
        },
        chain: {
          type: new GraphQLNonNull(SchemaChain),
          description: "The chain",
          resolve: (node, args, ctx) => ctx.db.readNode<Chain>(node.chainId),
        },
        block: {
          type: new GraphQLNonNull(SchemaBlock),
          resolve: (node, args, ctx) => ctx.db.readNode<Block>(node.blockId),
        },
      }),
    }
  );

  const SchemaReceipt: SchemaNodeType<Receipt> = new SchemaNodeType(
    schemaNodeTypes,
    schemaEdgeTypes,
    Receipt,
    {
      name: "Receipt",
      fields: () => ({
        log: {
          type: SchemaLog,
          args: {
            logIndex: {
              type: GraphQLInt,
            },
          },
          resolve: (node, args, ctx) => {
            return ctx.node
              .getLog({
                chainId: node.data.chainId,
                transactionHash: node.data.transactionHash,
                logIndex: args.logIndex,
              })
              .then((data) => data && new Log(data));
          },
        },
        // Node fields
        transaction: {
          type: new GraphQLNonNull(SchemaTransaction),
          resolve: (node, args, ctx) =>
            ctx.db.readNode<Transaction>(node.transactionId),
        },
        chain: {
          type: new GraphQLNonNull(SchemaChain),
          description: "The chain",
          resolve: (node, args, ctx) => ctx.db.readNode<Chain>(node.chainId),
        },
        block: {
          type: new GraphQLNonNull(SchemaBlock),
          resolve: (node, args, ctx) => ctx.db.readNode<Block>(node.blockId),
        },
      }),
    }
  );

  const SchemaLog: SchemaNodeType<Log> = new SchemaNodeType(
    schemaNodeTypes,
    schemaEdgeTypes,
    Log,
    {
      name: "Log",
      fields: () => ({
        // Node fields
        receipt: {
          type: new GraphQLNonNull(SchemaReceipt),
          resolve: (node, args, ctx) =>
            ctx.db.readNode<Receipt>(node.receiptId),
        },
        transaction: {
          type: new GraphQLNonNull(SchemaTransaction),
          resolve: (node, args, ctx) =>
            ctx.db.readNode<Transaction>(node.transactionId),
        },
        chain: {
          type: new GraphQLNonNull(SchemaChain),
          description: "The chain",
          resolve: (node, args, ctx) => ctx.db.readNode<Chain>(node.chainId),
        },
        block: {
          type: new GraphQLNonNull(SchemaBlock),
          resolve: (node, args, ctx) => ctx.db.readNode<Block>(node.blockId),
        },
      }),
    }
  );

  schemaNodeTypes.set("Chain", SchemaChain);
  schemaNodeTypes.set("Block", SchemaBlock);
  schemaNodeTypes.set("Transaction", SchemaTransaction);
  schemaNodeTypes.set("Receipt", SchemaReceipt);
  schemaNodeTypes.set("Log", SchemaLog);

  edgeTypes.forEach((edgeType) => {
    const asd = new SchemaEdgeType(schemaNodeTypes, edgeType, {
      name: edgeType.name,
    });
    schemaEdgeTypes.set(edgeType.name, asd);
  });

  return {
    schemaNodeTypes,
    schemaEdgeTypes,
  };
};
