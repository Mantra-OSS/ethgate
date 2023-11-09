import type { Chain as EthgateChainDataExtra } from '@mantra-oss/chains';
import type { FromSchema } from 'json-schema-to-ts';

import type {
  AksharaObjectSchemas,
  blockSchema,
  chainSchema,
  logSchema,
  receiptSchema,
  transactionSchema,
} from './object-schema';
import type { AksharaChainId } from './types';
export * from './object-schema';

export type AksharaObjects = {
  Chain: {
    Data: FromSchema<AksharaObjectSchemas['Chain']> & {
      extra: EthgateChainDataExtra;
    };
  };
  Block: { Data: FromSchema<AksharaObjectSchemas['Block']> };
  Transaction: { Data: FromSchema<AksharaObjectSchemas['Transaction']> };
  Receipt: { Data: FromSchema<AksharaObjectSchemas['Receipt']> };
  Log: { Data: FromSchema<AksharaObjectSchemas['Log']> };
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

export type AksharaObjectData = AksharaObjects[keyof AksharaObjects]['Data'];

export type AksharaChainData = AksharaObjects['Chain']['Data'];
export type AksharaBlockData = AksharaObjects['Block']['Data'];
export type AksharaTransactionData = AksharaObjects['Transaction']['Data'];
export type AksharaReceiptData = AksharaObjects['Receipt']['Data'];
export type AksharaLogData = AksharaObjects['Log']['Data'];

export type AksharaChainKey = Pick<AksharaChainData, 'chainId'>;

export type AksharaBlockKey =
  | Pick<AksharaBlockData, 'chainId' | 'hash'>
  | Pick<AksharaBlockData, 'chainId' | 'number'>
  | Pick<AksharaBlockData, 'chainId' | 'timestamp'>;
export type AksharaBlockId = `${AksharaBlockData['chainId']}-${AksharaBlockData['number']}`;

export type AksharaTransactionKey =
  | Pick<AksharaTransactionData, 'chainId' | 'hash'>
  | Pick<AksharaTransactionData, 'chainId' | 'blockHash' | 'transactionIndex'>
  | Pick<AksharaTransactionData, 'chainId' | 'blockNumber' | 'transactionIndex'>;
export type AksharaTransactionId =
  `${AksharaTransactionData['chainId']}-${AksharaTransactionData['blockNumber']}-${AksharaTransactionData['transactionIndex']}`;

export type AksharaLogKey =
  | Pick<AksharaLogData, 'chainId' | 'transactionHash' | 'logIndex'>
  | Pick<AksharaLogData, 'chainId' | 'blockHash' | 'transactionIndex' | 'logIndex'>
  | Pick<AksharaLogData, 'chainId' | 'blockNumber' | 'transactionIndex' | 'logIndex'>;
export type AksharaLogId =
  `${AksharaLogData['chainId']}-${AksharaLogData['blockNumber']}-${AksharaLogData['transactionIndex']}-${AksharaLogData['logIndex']}`;

export type AksharaReceiptKey =
  | Pick<AksharaReceiptData, 'chainId' | 'transactionHash'>
  | Pick<AksharaReceiptData, 'chainId' | 'blockHash' | 'transactionIndex'>
  | Pick<AksharaReceiptData, 'chainId' | 'blockNumber' | 'transactionIndex'>;
export type AksharaReceiptId =
  `${AksharaReceiptData['chainId']}-${AksharaReceiptData['blockNumber']}-${AksharaReceiptData['transactionIndex']}r`;
