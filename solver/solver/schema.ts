import type { ConnectionData } from '@/app/client/backend';
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

import type { NodeType, SolverEdge, SolverNode } from '../graph';

import { GraphQLJSONObject } from './schema/scalars';
import type { Solver, SolverGraph } from './solver';

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
          },
          headId: {
            type: new GraphQLNonNull(GraphQLID),
          },
          head: {
            type: new GraphQLNonNull(head),
          },
          node: {
            type: new GraphQLNonNull(head),
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
    fields: {
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
    },
  });

  const schema = new GraphQLSchema({
    query,
  });
  return schema;
};
