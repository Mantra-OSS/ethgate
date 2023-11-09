import { addressSchema, chainIdSchema, hashSchema, hexSchema, u64Schema } from './types';

export type AksharaObjectSchema =
  | typeof chainSchema
  | typeof blockSchema
  | typeof transactionSchema
  | typeof receiptSchema
  | typeof logSchema;

export type AksharaObjectSchemas = {
  Chain: typeof chainSchema;
  Block: typeof blockSchema;
  Transaction: typeof transactionSchema;
  Receipt: typeof receiptSchema;
  Log: typeof logSchema;
};

export const chainSchema = {
  aksharaType: 'Chain',
  type: 'object',
  properties: {
    chainId: chainIdSchema,
    meta: {
      type: 'object',
      properties: {
        name: { type: 'string' },
      },
      required: ['name'],
    },
    rpcs: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          url: { type: 'string' },
          source: { type: 'string' },
        },
        required: ['url', 'source'],
      },
    },
    parentId: chainIdSchema,
    parent: {
      type: 'object',
      properties: {
        chainId: chainIdSchema,
        bridges: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              url: { type: 'string' },
            },
            required: ['url'],
          },
        },
      },
      required: ['chainId', 'bridges'],
    },
    extra: { type: 'object' },
  },
  required: ['chainId', 'meta', 'rpcs', 'extra'],
} as const;

export const blockSchema = {
  aksharaType: 'Block',
  type: 'object',
  properties: {
    chainId: chainIdSchema,
    timestamp: u64Schema,
    hash: hashSchema,
    number: u64Schema,
    parentHash: hashSchema,
    gasLimit: u64Schema,
    gasUsed: u64Schema,
    baseFeePerGas: u64Schema,
    logsBloom: hexSchema,
    miner: addressSchema,
    size: u64Schema,
    transactions: {
      type: 'array',
      items: hashSchema,
    },
  },
  required: [
    'chainId',
    'timestamp',
    'hash',
    'number',
    'parentHash',
    'gasLimit',
    'gasUsed',
    'baseFeePerGas',
    'logsBloom',
    'miner',
    'size',
    'transactions',
  ],
} as const;

export const transactionSchema = {
  aksharaType: 'Transaction',
  type: 'object',
  properties: {
    chainId: chainIdSchema,
    blockHash: hashSchema,
    blockNumber: u64Schema,
    from: addressSchema,
    gas: u64Schema,
    gasPrice: u64Schema,
    hash: hashSchema,
    input: hexSchema,
    nonce: hexSchema,
    to: addressSchema,
    transactionIndex: u64Schema,
    value: hexSchema,
    v: hexSchema,
    r: hexSchema,
    s: hexSchema,
  },
  required: [
    'chainId',
    'blockHash',
    'blockNumber',
    'from',
    'gas',
    'gasPrice',
    'hash',
    'input',
    'nonce',
    'transactionIndex',
    'value',
    'v',
    'r',
    's',
  ],
} as const;

export const logSchema = {
  aksharaType: 'Log',
  type: 'object',
  properties: {
    chainId: chainIdSchema,
    address: addressSchema,
    topics: {
      type: 'array',
      items: hashSchema,
    },
    data: hexSchema,
    blockNumber: u64Schema,
    transactionHash: hashSchema,
    transactionIndex: u64Schema,
    blockHash: hashSchema,
    logIndex: u64Schema,
    removed: { type: 'boolean' },
  },
  required: [
    'chainId',
    'address',
    'topics',
    'data',
    'blockNumber',
    'transactionHash',
    'transactionIndex',
    'blockHash',
    'logIndex',
    'removed',
  ],
} as const;

export const receiptSchema = {
  aksharaType: 'Receipt',
  type: 'object',
  properties: {
    chainId: chainIdSchema,
    blockHash: hashSchema,
    blockNumber: u64Schema,
    contractAddress: { type: 'string' },
    cumulativeGasUsed: u64Schema,
    from: addressSchema,
    gasUsed: u64Schema,
    logs: {
      type: 'array',
      items: logSchema,
    },
    logsBloom: hexSchema,
    status: hexSchema,
    to: addressSchema,
    transactionHash: hashSchema,
    transactionIndex: u64Schema,
  },
  required: [
    'chainId',
    'blockHash',
    'blockNumber',
    'cumulativeGasUsed',
    'from',
    'gasUsed',
    'logs',
    'logsBloom',
    'status',
    'to',
    'transactionHash',
    'transactionIndex',
  ],
} as const;
