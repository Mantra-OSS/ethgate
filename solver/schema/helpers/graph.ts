import type {
  GraphQLFieldConfig,
  GraphQLObjectTypeConfig,
  GraphQLOutputType,
  ThunkObjMap,
} from "graphql";
import {
  GraphQLID,
  GraphQLInt,
  GraphQLInterfaceType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  resolveObjMapThunk,
  resolveReadonlyArrayThunk,
} from "graphql";
import { GraphQLJSON } from "graphql-type-json";

import {
  BlockHasLog,
  BlockHasReceipt,
  BlockHasTransaction,
  ChainHasBlock,
  ChainHasChain,
  ChainHasDescendantBlock,
  ChainHasTransaction,
  type EdgeAbstract,
  type NodeAbstract,
  ReceiptHasLog,
} from "../../data/index.js";
import type { EdgeType, NodeType } from "../../graph/index.js";
import type { SchemaContext } from "../schema.js";
import { schemaToGql } from "../zod.js";

import { GraphQLRelayCursor, GraphQLRelayPageInfo } from "./relay.js";

const pageArgs = {
  first: {
    type: GraphQLInt,
    description: "The number of nodes to return after the cursor",
  },
  after: {
    type: GraphQLRelayCursor,
    description: "The cursor after which to return nodes",
  },
  last: {
    type: GraphQLInt,
    description: "The number of nodes to return before the cursor",
  },
  before: {
    type: GraphQLRelayCursor,
    description: "The cursor before which to return nodes",
  },
};

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

export class SchemaType<TSource> extends GraphQLObjectType<
  TSource,
  SchemaContext
> {
  constructor(config: GraphQLObjectTypeConfig<any, any>) {
    super(config);
  }
}

export const SchemaNodeMeta = new SchemaType({
  name: "NodeMeta",
  fields: () => ({
    type: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The type of the node",
    },
    localId: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The local ID of the node",
    },
    data: {
      type: new GraphQLNonNull(GraphQLJSON),
      description: "The data of the node",
    },
    time: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The time of the node",
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The name of the node",
    },
  }),
  description: "The meta data of a node",
});

export const SchemaNodeInterface = new GraphQLInterfaceType({
  name: "Node",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: "The ID of the node",
    },
    meta: {
      type: new GraphQLNonNull(SchemaNodeMeta),
      description: "The meta data of the node",
    },
  }),
  description: "The node interface",
  resolveType: (node) => node.type,
});

export class SchemaNodeType<
  TNode extends NodeAbstract,
  TNodeCtor extends NodeType<TNode> = NodeType<TNode>
> extends SchemaType<TNode> {
  constructor(
    schemaNodeTypes: Map<string, SchemaNodeType<any>>,
    schemaEdgeTypes: Map<string, SchemaEdgeType<any>>,
    nodeCtor: TNodeCtor,
    config: Readonly<GraphQLObjectTypeConfig<TNode, SchemaContext>>
  ) {
    super({
      ...config,
      interfaces: () => [
        ...(config.interfaces
          ? resolveReadonlyArrayThunk(config.interfaces)
          : []),
        SchemaNodeInterface,
      ],
      fields: () => ({
        // NodeInterface fields
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
        meta: {
          type: new GraphQLNonNull(SchemaNodeMeta),
          resolve: (node) => ({
            ...node.meta,
            type: node.type,
            localId: node.localId,
            data: node.data,
          }),
        },
        // Ethgate data fields
        // TODO: for any
        ...Object.fromEntries(
          Object.entries(nodeCtor.schema.properties).flatMap(
            ([key, schema]) => {
              let gqlType: GraphQLOutputType | void = schemaToGql(schema);
              if (!gqlType) {
                return [];
              }
              const required = nodeCtor.schema.required.includes(key as any);
              if (required) {
                gqlType = new GraphQLNonNull(gqlType);
              }
              const field = {
                type: gqlType,
                resolve(node: TNode) {
                  return node.data[key];
                },
              };
              return [[key, field]];
            }
          )
        ),
        // Connection fields
        ...edgeTypes
          .filter(
            (edgeType) => edgeType.tail.name === nodeCtor.schema.aksharaType
          )
          .reduce((acc, edgeType) => {
            acc[edgeType.connectionName] = {
              type: new GraphQLNonNull(
                schemaEdgeTypes.get(edgeType.typeName)!.connectionType
              ),
              args: pageArgs,
              resolve: (node, args, ctx) => {
                return ctx.db
                  .getConnection(edgeType.typeName, node.id, args)
                  .collect();
              },
            };
            return acc;
          }, {} as Record<string, GraphQLFieldConfig<any, SchemaContext, any>>),
        // Own fields
        ...(config.fields ? resolveObjMapThunk(config.fields) : {}),
      }),
    });
  }
}

export const SchemaConnectionInterface = new GraphQLInterfaceType({
  name: "Connection",
  description: "A connection to a list of items",
  fields: () => ({
    edges: {
      type: new GraphQLList(SchemaEdgeInterface),
      description: "A list of edges",
    },
    pageInfo: {
      type: new GraphQLNonNull(GraphQLRelayPageInfo),
      description: "Information to aid in pagination",
    },
  }),
  resolveType: (node) => node.type,
});

type SchemaConnectionTypeConfig<TSource = any> = {
  edgeType: () => GraphQLObjectType;
  fields?: ThunkObjMap<GraphQLFieldConfig<TSource, SchemaContext>>;
} & Omit<GraphQLObjectTypeConfig<TSource, SchemaContext>, "fields">;

export class SchemaConnectionType<TSource = any> extends SchemaType<TSource> {
  constructor(config: Readonly<SchemaConnectionTypeConfig<TSource>>) {
    super({
      ...config,
      interfaces: () => [
        ...(config.interfaces
          ? resolveReadonlyArrayThunk(config.interfaces)
          : []),
        SchemaConnectionInterface,
      ],
      fields: () => ({
        // Own fields
        ...(config.fields ? resolveObjMapThunk(config.fields) : {}),
        // ConnectionInterface fields
        edges: {
          type: new GraphQLNonNull(
            new GraphQLList(new GraphQLNonNull(config.edgeType()))
          ),
        },
        pageInfo: {
          type: new GraphQLNonNull(GraphQLRelayPageInfo),
        },
        // totalCount: {
        //   type: new GraphQLNonNull(GraphQLInt),
        // },
      }),
    });
  }
}

export const SchemaEdgeInterface = new GraphQLInterfaceType({
  name: "Edge",
  description: "An edge in a connection",
  fields: () => ({
    node: {
      type: SchemaNodeInterface,
      description: "The item at the end of the edge",
    },
    cursor: {
      type: new GraphQLNonNull(GraphQLString),
      description: "A cursor for use in pagination",
    },
  }),
});

type SchemaEdgeTypeConfig<TSource = any> = {
  fields?: ThunkObjMap<GraphQLFieldConfig<TSource, SchemaContext>>;
} & Omit<GraphQLObjectTypeConfig<TSource, SchemaContext>, "fields">;

export class SchemaEdgeType<
  TEdge extends EdgeAbstract,
  TEdgeCtor extends EdgeType<TEdge> = EdgeType<TEdge>
> extends SchemaType<TEdge> {
  connectionType: SchemaConnectionType;

  constructor(
    schemaNodeTypes: Map<string, SchemaNodeType<any>>,
    edgeCtor: TEdgeCtor,
    config: Readonly<SchemaEdgeTypeConfig<TEdge>>
  ) {
    super({
      ...config,
      name: `${config.name}Edge`,
      interfaces: [
        ...(config.interfaces
          ? resolveReadonlyArrayThunk(config.interfaces)
          : []),
        SchemaEdgeInterface,
      ],
      fields: () => ({
        // Own fields
        ...(config.fields ? resolveObjMapThunk(config.fields) : {}),
        // EdgeInterface fields
        node: {
          type: new GraphQLNonNull(
            schemaNodeTypes.get(edgeCtor.head.schema.aksharaType)!
          ),
          resolve: (edge, args: unknown, ctx: SchemaContext) => {
            return ctx.db.getNode(edge.headId);
          },
        },
        cursor: {
          type: new GraphQLNonNull(GraphQLString),
        },
      }),
    });

    this.connectionType = new SchemaConnectionType({
      name: `${config.name}Connection`,
      edgeType: () => this,
    });
  }
}
