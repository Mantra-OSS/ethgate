import type { RpcClientMethod as Method } from '@/lib-utils';

import type {
  Address,
  Block,
  BlockTag,
  Eip2930AccessList,
  Hash,
  Hex,
  Log,
  Receipt,
  Transaction,
  TransactionRequest,
} from './types';

export type EthereumMethod =
  | Method<'eth_blockNumber', [], number>
  | Method<
      'eth_getBlockByHash',
      [blockHash: Hash, hydratedTransactions: boolean],
      Block | undefined
    >
  | Method<
      'eth_getBlockByNumber',
      [blockNumberOrTag: Hex | BlockTag, hydratedTransactions: boolean],
      Block | undefined
    >
  | Method<'eth_getTransactionByHash', [transactionHash: Hash], Transaction | undefined>
  | Method<'eth_getTransactionReceipt', [transactionHash: Hash], Receipt | undefined>
  | Method<
      'eth_getTransactionByBlockNumberAndIndex',
      [blockNumberOrTag: Hex | BlockTag, transactionIndex: Hex],
      Receipt | undefined
    >
  | Method<
      'eth_getTransactionByBlockHashAndIndex',
      [blockHash: Hash, transactionIndex: Hex],
      Receipt | undefined
    >
  | Method<
      'eth_call',
      [transaction: TransactionRequest, blockNumberOrTagOrHash: Hex | BlockTag | Hash],
      Hex
    >
  | Method<
      'eth_createAccessList',
      [transaction: TransactionRequest, blockNumberOrTagOrHash: Hex | BlockTag | Hash],
      Readonly<{
        accessList: Eip2930AccessList;
        error?: string;
        gasUsed: Hex;
      }>
    >
  | Method<
      'eth_getLogs',
      [
        filter: {
          fromBlock?: Hex;
          toBlock?: Hex;
          address?: Address | ReadonlyArray<Address>;
          topics?: Hash | ReadonlyArray<Hash>;
          blockHash?: Hash;
        },
      ],
      ReadonlyArray<Log>
    >
  | Method<'eth_getBalance', [address: Address, blockNumberOrTagOrHash: Hex | BlockTag | Hash], Hex>
  | Method<
      'eth_getTransactionCount',
      [address: Address, blockNumberOrTagOrHash: Hex | BlockTag | Hash],
      Hex
    >
  | Method<
      'eth_getStorageAt',
      [address: Address, storageSlot: Hash, blockNumberOrTagOrHash: Hex | BlockTag | Hash],
      Hex
    >
  | Method<'eth_getCode', [address: Address, blockNumberOrTagOrHash: Hex | BlockTag | Hash], Hex>;
