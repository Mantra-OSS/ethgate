import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInterfaceType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
} from 'graphql';

import { identity, parseLiteral } from './scalar.js';

export const GraphQLRelayCursor = new GraphQLScalarType({
  name: 'Cursor',
  description: 'A cursor for use in pagination',
  serialize: identity,
  parseValue: identity,
  parseLiteral,
});

export const GraphQLRelayNodeInterface = new GraphQLInterfaceType({
  name: 'Node',
  description: 'An object with an ID',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The global identifier of the object',
    },
  }),
});

export const GraphQLRelayEdgeInterface = new GraphQLInterfaceType({
  name: 'Edge',
  description: 'An edge in a connection',
  fields: () => ({
    node: {
      type: GraphQLRelayNodeInterface,
      description: 'The item at the head of the edge',
    },
    cursor: {
      type: new GraphQLNonNull(GraphQLRelayCursor),
      description: 'A cursor for use in pagination',
    },
  }),
});

export const GraphQLRelayConnectionInterface = new GraphQLInterfaceType({
  name: 'Connection',
  description: 'A connection to a list of nodes',
  fields: () => ({
    edges: {
      type: new GraphQLList(GraphQLRelayEdgeInterface),
      description: 'Edges in the connection',
    },
    pageInfo: {
      type: new GraphQLNonNull(GraphQLRelayPageInfo),
      description: 'Information to aid in pagination',
    },
  }),
});

export const GraphQLRelayPageInfo = new GraphQLObjectType({
  name: 'PageInfo',
  description: 'Information about pagination in a connection.',
  fields: () => ({
    hasNextPage: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'When paginating forwards, are there more items?',
    },
    hasPreviousPage: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'When paginating backwards, are there more items?',
    },
    startCursor: {
      type: GraphQLRelayCursor,
      description: 'When paginating backwards, the cursor to continue.',
    },
    endCursor: {
      type: GraphQLRelayCursor,
      description: 'When paginating forwards, the cursor to continue.',
    },
  }),
});
