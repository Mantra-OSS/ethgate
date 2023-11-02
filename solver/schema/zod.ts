import type { GraphQLOutputType } from 'graphql';
import { GraphQLBoolean, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';

import {
  GraphQLAddress,
  GraphQLChainId,
  GraphQLHash,
  GraphQLHex,
  GraphQLU64,
} from './scalars/primitive.js';

export function schemaToGql(schema: any): GraphQLOutputType | void {
  switch (schema.type) {
    case 'object': {
      if (schema.aksharaType) {
        return new GraphQLObjectType({
          name: schema.aksharaType,
          fields: {},
        });
      }
      return;
    }
    case 'string': {
      switch (schema.aksharaType) {
        case 'Hex': {
          return GraphQLHex;
        }
        case 'Hash': {
          return GraphQLHash;
        }
        case 'Address': {
          return GraphQLAddress;
        }
        case 'ChainId': {
          return GraphQLChainId;
        }
      }
      return GraphQLString;
    }
    case 'number': {
      return GraphQLU64;
    }
    case 'boolean': {
      return GraphQLBoolean;
    }
    case 'array': {
      const elem = schemaToGql(schema.items);
      if (!elem) {
        return;
      }
      return new GraphQLList(elem);
    }
    default: {
      throw new Error(`Unknown type ${schema.type}`);
    }
  }
}
