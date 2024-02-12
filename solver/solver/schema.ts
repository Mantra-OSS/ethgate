import { GraphQLInterfaceType } from 'graphql';
import {
  ASTNode,
  GraphQLBoolean,
  GraphQLError,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
  GraphQLSchema,
  GraphQLString,
  Kind,
  ObjectValueNode,
  Source,
  ValueNode,
  printSchema,
} from 'graphql';

import type { Chain, NodeType, SolverEdge, SolverNode } from '../graph';
import type { ConnectionPage } from '../spec';

import { GraphQLJSONObject } from './schema/scalars';
import type { Solver, SolverGraph } from './solver';

type ConnectionData<TEdge extends SolverEdge = SolverEdge> = ConnectionPage<TEdge> & {
  type: TEdge['type'];
  tailId: TEdge['tailId'];
};

export type SolverSchema = GraphQLSchema;
export const createSolverSchema = (graph: SolverGraph): SolverSchema => {
  const pageInfo = new GraphQLObjectType({
    name: 'PageInfo',
    fields: {
      hasNextPage: {
        type: new GraphQLNonNull(GraphQLBoolean),
      },
      hasPreviousPage: {
        type: new GraphQLNonNull(GraphQLBoolean),
      },
      startCursor: {
        type: GraphQLString,
      },
      endCursor: {
        type: GraphQLString,
      },
    },
  });
  const nodeMeta = new GraphQLObjectType({
    name: 'NodeMeta',
    fields: {
      name: {
        type: new GraphQLNonNull(GraphQLString),
      },
      slug: {
        type: new GraphQLNonNull(GraphQLString),
      },
      chainId: {
        type: GraphQLID,
      },
    },
  });
  const nodeInterface: GraphQLInterfaceType = new GraphQLInterfaceType({
    name: 'Node',
    fields: () => ({
      id: {
        type: new GraphQLNonNull(GraphQLID),
      },
      meta: {
        type: new GraphQLNonNull(nodeMeta),
      },
      data: {
        type: new GraphQLNonNull(GraphQLJSONObject),
      },
      connection: {
        type: new GraphQLNonNull(connectionInterface),
        args: {
          type: {
            type: new GraphQLNonNull(GraphQLString),
          },
          first: {
            type: GraphQLInt,
          },
          after: {
            type: GraphQLString,
          },
        },
      },
    }),
    resolveType: (value: SolverNode) => value.type,
  });
  const edgeInterface = new GraphQLInterfaceType({
    name: 'Edge',
    fields: {
      type: {
        type: new GraphQLNonNull(GraphQLString),
      },
      tailId: {
        type: new GraphQLNonNull(GraphQLID),
      },
      tail: {
        type: new GraphQLNonNull(nodeInterface),
      },
      headId: {
        type: new GraphQLNonNull(GraphQLID),
      },
      head: {
        type: new GraphQLNonNull(nodeInterface),
      },
      node: {
        type: new GraphQLNonNull(nodeInterface),
      },
      cursor: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolveType: (value: SolverEdge) => `${value.type}Edge`,
  });
  const connectionInterface = new GraphQLInterfaceType({
    name: 'Connection',
    fields: {
      edges: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(edgeInterface))),
      },
      pageInfo: {
        type: new GraphQLNonNull(pageInfo),
      },
    },
    resolveType: (value: ConnectionData) => `${value.type}Connection`,
  });
  const nodes: GraphQLObjectType[] = graph.nodeTypes.map((nodeType) => {
    const nodeData = GraphQLJSONObject;
    // const nodeData = new GraphQLObjectType({
    //   name: `${nodeType.name}Data`,
    //   fields: () => {
    //     return {
    //       ...Object.fromEntries(
    //         nodeType.
    //     }
    //   }
    // })
    return new GraphQLObjectType<SolverNode, Solver>({
      name: nodeType.name,
      interfaces: [nodeInterface],
      fields: () => {
        const edgeTypes = graph.getEdgeTypesForNode(nodeType.name);
        return {
          id: {
            type: new GraphQLNonNull(GraphQLID),
          },
          meta: {
            type: new GraphQLNonNull(nodeMeta),
          },
          data: {
            type: new GraphQLNonNull(nodeData),
          },
          connection: {
            type: new GraphQLNonNull(connectionInterface),
            args: {
              type: {
                type: new GraphQLNonNull(GraphQLString),
              },
              first: {
                type: GraphQLInt,
              },
              after: {
                type: GraphQLString,
              },
            },
            async resolve(parent, args, solver): Promise<ConnectionData> {
              return {
                ...(await solver.database.getConnection(args.type, parent.id, args).collect()),
                type: args.type,
                tailId: parent.id,
              };
            },
          },
          ...Object.fromEntries(
            edgeTypes.map((edgeType) => {
              const connection = connections.find(
                (connection) => connection.name === `${edgeType.typeName}Connection`,
              );
              if (!connection) throw new Error(`connection not found: ${edgeType.typeName}`);
              return [
                edgeType.connectionName,
                {
                  type: new GraphQLNonNull(connection),
                  args: {
                    first: {
                      type: GraphQLInt,
                    },
                    after: {
                      type: GraphQLString,
                    },
                  },
                  async resolve(parent, args, solver): Promise<ConnectionData> {
                    return {
                      ...(await solver.database
                        .getConnection(edgeType.typeName, parent.id, args)
                        .collect()),
                      type: args.type,
                      tailId: parent.id,
                    };
                  },
                },
              ];
            }),
          ),
        };
      },
    });
  });

  const edges = graph.edgeTypes.map((edgeType) => {
    return new GraphQLObjectType({
      name: `${edgeType.typeName}Edge`,
      interfaces: [edgeInterface],
      fields: () => {
        const tail = nodes.find((node) => node.name === edgeType.tail.name);
        if (!tail) throw new Error(`tail not found: ${edgeType.tail.name}`);
        const head = nodes.find((node) => node.name === edgeType.head.name);
        if (!head) throw new Error(`head not found: ${edgeType.head.name}`);
        return {
          type: {
            type: new GraphQLNonNull(GraphQLString),
          },
          tailId: {
            type: new GraphQLNonNull(GraphQLID),
          },
          tail: {
            type: new GraphQLNonNull(tail),
            resolve(parent, args, solver) {
              return solver.database.readNode(parent.tailId);
            },
          },
          headId: {
            type: new GraphQLNonNull(GraphQLID),
          },
          head: {
            type: new GraphQLNonNull(head),
            resolve(parent, args, solver) {
              return solver.database.readNode(parent.headId);
            },
          },
          node: {
            type: new GraphQLNonNull(head),
            resolve(parent, args, solver) {
              return solver.database.readNode(parent.headId);
            },
          },
          cursor: {
            type: new GraphQLNonNull(GraphQLString),
          },
        };
      },
    });
  });

  const connections = graph.edgeTypes.map((edgeType) => {
    return new GraphQLObjectType({
      name: `${edgeType.typeName}Connection`,
      interfaces: [connectionInterface],
      fields: () => {
        const edge = edges.find((edge) => edge.name === `${edgeType.typeName}Edge`);
        if (!edge) throw new Error(`edge not found: ${edgeType.typeName}`);
        return {
          edges: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(edge))),
          },
          pageInfo: {
            type: new GraphQLNonNull(pageInfo),
          },
        };
      },
    });
  });

  const root = nodes.find((node) => node.name === 'Explorer');
  if (!root) throw new Error(`root not found`);

  const query = new GraphQLObjectType<undefined, Solver>({
    name: 'Query',
    fields: () => {
      // const nodeFields = Object.fromEntries(
      //   nodes.map((node) => {
      //     return [
      //       node.name,
      //       {
      //         type: new GraphQLNonNull(node),
      //         args: {
      //           id: {
      //             type: new GraphQLNonNull(GraphQLID),
      //           },
      //         },
      //         resolve(_, { id }, solver) {
      //           return solver.database.getNode(id);
      //         },
      //       },
      //     ];
      //   }),
      // );

      return {
        node: {
          type: nodeInterface,
          args: {
            id: {
              type: new GraphQLNonNull(GraphQLID),
            },
          },
          resolve(_, { id }, solver) {
            return solver.database.getNode(id);
          },
        },
        root: {
          type: new GraphQLNonNull(root),
          resolve(parent, args, solver) {
            return solver.getRoot();
          },
        },
      };
    },
  });

  const subscription = new GraphQLObjectType<void, Solver>({
    name: 'Subscription',
    fields: () => ({
      node_connection: {
        type: new GraphQLObjectType({
          name: 'NodeConnectionSubscription',
          fields: {
            edges: {
              type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(edgeInterface))),
            },
          },
        }),
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLID),
          },
          type: {
            type: new GraphQLNonNull(GraphQLString),
          },
          first: {
            type: GraphQLInt,
          },
          before: {
            // type: new GraphQLNonNull(GraphQLString),
            type: GraphQLString,
          },
        },
        async *subscribe(
          parent,
          args: {
            id: SolverNode['id'];
            type: SolverEdge['type'];
            first?: number;
            before?: SolverEdge['headId'];
          },
          solver,
        ): AsyncGenerator<{ node_connection: { edges: SolverEdge[] } } | void> {
          const tail = await solver.database.readNode(args.id);
          const chainId = tail.meta.chainId;
          if (!chainId) throw new Error(`chainId not found: ${args.id}`);
          const chain = await solver.database.readNode<Chain>(chainId);
          const updates = solver.database.networkUpdates(chain.id);
          let before = args.before;

          let updatePromise = updates.next();
          while (true) {
            if (!before) {
              const item = await solver.database
                .getConnection(args.type, chain.id, {
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

            const connection = solver.database.getConnection(args.type, chain.id, {
              first: args.first,
              before,
            });
            // TODO: Do not collect, but yield in batches
            const { edges } = await connection.collect();
            yield { node_connection: { edges: edges.reverse() } };

            await updatePromise;
            updatePromise = updates.next();
            yield;
          }
        },
      },
    }),
  });

  const schema = new GraphQLSchema({
    query,
    subscription,
  });
  return schema;
};
