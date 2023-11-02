import { GraphQLScalarType } from 'graphql';

// Address Scalar
export const GraphQLAddress = new GraphQLScalarType({
  name: 'Address',
  serialize(value) {
    const isValidAddress = /^0x[0-9a-fA-F]{40}$/.test(value as string);
    if (!isValidAddress) {
      throw new Error(`Invalid address: ${value}`);
    }
    return value;
  },
  extensions: {
    codegenScalarType: 'string',
  },
});

// Hash Scalar
export const GraphQLHash = new GraphQLScalarType({
  name: 'Hash',
  serialize(value) {
    const isValidHash = /^0x[0-9a-fA-F]{64}$/.test(value as string);
    if (!isValidHash) {
      throw new Error(`Invalid hash: ${value}`);
    }
    return value;
  },
  extensions: {
    codegenScalarType: 'string',
  },
});

// Hex Scalar
export const GraphQLHex = new GraphQLScalarType({
  name: 'Hex',
  serialize(value) {
    const isValidHex = /^0x[0-9a-fA-F]*$/.test(value as string);
    if (!isValidHex) {
      throw new Error(`Invalid hex: ${value}`);
    }
    return value;
  },
  extensions: {
    codegenScalarType: 'string',
  },
});

export const GraphQLU64 = new GraphQLScalarType<number, number>({
  name: 'U64',
  serialize(value) {
    // const isValidU64 = /^0x[0-9a-fA-F]*$/.test(value as string);
    // if (!isValidU64) {
    //   throw new Error(`Invalid hex: ${value}`);
    // }
    return value as number;
  },
  extensions: {
    codegenScalarType: 'number',
  },
});

export const GraphQLChainId = new GraphQLScalarType({
  name: 'ChainId',
  serialize(value) {
    const isValidChainId = /^[0-9]+$/.test(value as string);
    if (!isValidChainId) {
      throw new Error(`Invalid ChainId: ${value}`);
    }
    return value;
  },
  extensions: {
    codegenScalarType: 'string',
  },
});
