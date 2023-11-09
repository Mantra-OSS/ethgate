import type { Chain as EthgateChainDataExtra } from '@mantra-oss/chains';
import type { FromSchema } from 'json-schema-to-ts';

import type { AksharaChainId } from './types';
import { addressSchema, chainIdSchema, hashSchema, hexSchema, u64Schema } from './types';

export type AksharaObjects = {
  Chain: { Data: AksharaChainData };
  Block: { Data: AksharaBlockData };
  Transaction: { Data: AksharaTransactionData };
  Receipt: { Data: AksharaReceiptData };
  Log: { Data: AksharaLogData };
};

export type AksharaObjectKey =
  | ({ type: 'Chain' } & AksharaChainKey)
  | ({ type: 'Block' } & AksharaBlockKey)
  | ({ type: 'Transaction' } & AksharaTransactionKey)
  | ({ type: 'Receipt' } & AksharaReceiptKey)
  | ({ type: 'Log' } & AksharaLogKey);

export type AksharaObjectPartialKey =
  | ({ type: 'Chain' } & Partial<AksharaChainKey>)
  | ({ type: 'Block' } & Partial<AksharaBlockKey>)
  | ({ type: 'Transaction' } & Partial<AksharaTransactionKey>)
  | ({ type: 'Receipt' } & Partial<AksharaReceiptKey>)
  | ({ type: 'Log' } & Partial<AksharaLogKey>);

export type AksharaObjectId =
  | AksharaChainId
  | AksharaBlockId
  | AksharaTransactionId
  | AksharaReceiptId
  | AksharaLogId;

export type AksharaObjectData =
  | AksharaChainData
  | AksharaBlockData
  | AksharaTransactionData
  | AksharaReceiptData
  | AksharaLogData;

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

export type AksharaChainKey = Pick<AksharaChainData, 'chainId'>;
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
export type AksharaChainData = FromSchema<typeof chainSchema> & {
  extra: EthgateChainDataExtra;
};

export type AksharaBlockKey =
  | Pick<AksharaBlockData, 'chainId' | 'hash'>
  | Pick<AksharaBlockData, 'chainId' | 'number'>
  | Pick<AksharaBlockData, 'chainId' | 'timestamp'>;
export type AksharaBlockId = `${AksharaBlockData['chainId']}-${AksharaBlockData['number']}`;
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
export type AksharaBlockData = FromSchema<typeof blockSchema>;

export type AksharaTransactionKey =
  | Pick<AksharaTransactionData, 'chainId' | 'hash'>
  | Pick<AksharaTransactionData, 'chainId' | 'blockHash' | 'transactionIndex'>
  | Pick<AksharaTransactionData, 'chainId' | 'blockNumber' | 'transactionIndex'>;
export type AksharaTransactionId =
  `${AksharaTransactionData['chainId']}-${AksharaTransactionData['blockNumber']}-${AksharaTransactionData['transactionIndex']}`;
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
export type AksharaTransactionData = FromSchema<typeof transactionSchema>;

export type AksharaLogKey =
  | Pick<AksharaLogData, 'chainId' | 'transactionHash' | 'logIndex'>
  | Pick<AksharaLogData, 'chainId' | 'blockHash' | 'transactionIndex' | 'logIndex'>
  | Pick<AksharaLogData, 'chainId' | 'blockNumber' | 'transactionIndex' | 'logIndex'>;
export type AksharaLogId =
  `${AksharaLogData['chainId']}-${AksharaLogData['blockNumber']}-${AksharaLogData['transactionIndex']}-${AksharaLogData['logIndex']}`;
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
export type AksharaLogData = FromSchema<typeof logSchema>;

export type AksharaReceiptKey =
  | Pick<AksharaReceiptData, 'chainId' | 'transactionHash'>
  | Pick<AksharaReceiptData, 'chainId' | 'blockHash' | 'transactionIndex'>
  | Pick<AksharaReceiptData, 'chainId' | 'blockNumber' | 'transactionIndex'>;
export type AksharaReceiptId =
  `${AksharaReceiptData['chainId']}-${AksharaReceiptData['blockNumber']}-${AksharaReceiptData['transactionIndex']}r`;
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
export type AksharaReceiptData = FromSchema<typeof receiptSchema>;
