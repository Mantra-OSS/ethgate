import type { AksharaAbstract } from "@/akshara/index.js";
import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  printSchema,
} from "graphql";

import type {
  Block,
  ChainHasBlock,
  ChainHasTransaction,
  NodeAbstract,
  Transaction,
} from "../data/index.js";
import type { Chain } from "../data/index.js";
import type { EthgateSolverDatabase } from "../database/database.js";

import { GraphQLRelayCursor } from "./helpers/relay.js";
import { SchemaNodeInterface } from "./index.js";
import { asdasd } from "./node.js";

export class SchemaContext {
  readonly node: AksharaAbstract;
  readonly db: EthgateSolverDatabase;

  constructor(db: EthgateSolverDatabase) {
    this.node = db.provider;
    this.db = db;
  }
}

export class EthgateSolverSchema extends GraphQLSchema {
  constructor() {
    const { schemaEdgeTypes, schemaNodeTypes } = asdasd();
    const query = new GraphQLObjectType<void, SchemaContext>({
      name: "Query",
      fields: () => ({
        node: {
          type: SchemaNodeInterface,
          args: {
            id: {
              type: new GraphQLNonNull(GraphQLID),
              description: "The ID of the node",
            },
          },
          description: "The node",
          resolve(parent, args: { id: NodeAbstract["id"] }, ctx) {
            return ctx.db.getNode(args.id);
          },
        },
        root: {
          type: new GraphQLNonNull(schemaNodeTypes.get("Chain")!),
          resolve(parent, args, ctx) {
            return ctx.db.readNode<Chain>("Chain:1");
          },
        },
      }),
    });

    const subscription = new GraphQLObjectType<void, SchemaContext>({
      name: "Subscription",
      fields: () => ({
        chain_blocks: {
          type: new GraphQLObjectType({
            name: "ChainHasBlocksSubscription",
            fields: {
              edges: {
                type: new GraphQLNonNull(
                  new GraphQLList(
                    new GraphQLNonNull(schemaEdgeTypes.get("ChainHasBlock")!)
                  )
                ),
                description: "The edges of the subscription",
              },
            },
            description: "The network blocks subscription",
          }),
          args: {
            id: {
              type: new GraphQLNonNull(GraphQLID),
              description: "The ID of an network object",
            },
            first: {
              type: GraphQLInt,
              description: "The number of blocks to return",
            },
            before: {
              type: GraphQLRelayCursor,
              description: "The cursor to start from",
            },
          },
          description: "The network blocks subscription",
          async *subscribe(
            parent,
            args: {
              id: Chain["id"];
              first?: number;
              before?: Block["id"];
            },
            ctx
          ): AsyncGenerator<{
            chain_blocks: { edges: ChainHasBlock[] };
          } | void> {
            const chain = await ctx.db.readNode<Chain>(args.id);
            const updates = ctx.db.networkUpdates(chain.id);
            let before = args.before;

            let updatePromise = updates.next();
            while (true) {
              if (!before) {
                const item = await ctx.db
                  .getConnection<ChainHasBlock>("ChainHasBlock", chain.id, {
                    first: 1,
                  })
                  .next();
                if (item.done) {
                  await updatePromise;
                  updatePromise = updates.next();
                  yield;
                  continue;
                }
                const edge = item.value;
                before = edge.headId;
              }

              const connection = ctx.db.getConnection<ChainHasBlock>(
                "ChainHasBlock",
                chain.id,
                {
                  first: args.first,
                  before,
                }
              );
              // TODO: Do not collect, but yield in batches
              const { edges } = await connection.collect();
              yield { chain_blocks: { edges: edges.reverse() } };

              await updatePromise;
              updatePromise = updates.next();
              yield;
            }
          },
        },
        chain_transactions: {
          type: new GraphQLObjectType({
            name: "ChainHasTransactionsSubscription",
            fields: {
              edges: {
                type: new GraphQLNonNull(
                  new GraphQLList(
                    new GraphQLNonNull(
                      schemaEdgeTypes.get("ChainHasTransaction")!
                    )
                  )
                ),
                description: "The edges of the subscription",
              },
            },
            description: "The network transactions subscription",
          }),
          args: {
            id: {
              type: new GraphQLNonNull(GraphQLID),
              description: "The ID of an network object",
            },
            first: {
              type: GraphQLInt,
              description: "The number of transactions to return",
            },
            before: {
              type: GraphQLRelayCursor,
              description: "The cursor to start from",
            },
          },
          description: "The network transactions subscription",
          async *subscribe(
            parent,
            args: {
              id: Chain["id"];
              first?: number;
              before?: Transaction["id"];
            },
            ctx
          ): AsyncGenerator<{
            chain_transactions: { edges: ChainHasTransaction[] };
          } | void> {
            const chain = await ctx.db.readNode<Chain>(args.id);
            const updates = ctx.db.networkUpdates(chain.id);
            let before = args.before;

            let updatePromise = updates.next();
            while (true) {
              if (!before) {
                const item = await ctx.db
                  .getConnection<ChainHasTransaction>(
                    "ChainHasTransaction",
                    chain.id,
                    {
                      first: 1,
                    }
                  )
                  .next();
                if (item.done) {
                  await updatePromise;
                  updatePromise = updates.next();
                  yield;
                  continue;
                }
                const edge = item.value;
                before = edge.headId;
              }

              const connection = ctx.db.getConnection<ChainHasTransaction>(
                "ChainHasTransaction",
                chain.id,
                {
                  first: args.first,
                  before,
                }
              );
              // TODO: Do not collect, but yield in batches
              const { edges } = await connection.collect();
              yield { chain_transactions: { edges: edges.reverse() } };

              await updatePromise;
              updatePromise = updates.next();
              yield;
            }
          },
        },
        greetings: {
          type: GraphQLString,
          subscribe: async function* () {
            for (const hi of ["Hi", "Bonjour", "Hola", "Ciao", "Zdravo"]) {
              yield { greetings: hi };
            }
          },
        },
      }),
    });

    super({
      query,
      subscription,
    });
  }

  print(): string {
    return printSchema(this);
  }
}
