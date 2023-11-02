import type { RpcClientMethod as Method } from '@ethgate/lib-utils';

import type {
  Address,
  AksharaBlockData,
  AksharaChainId,
  AksharaChainKey,
  AksharaLogData,
  AksharaObjectData,
  AksharaObjectKey,
  Hash,
  Hex,
} from '../db/index.js';

export type AksharaDaMethod =
  | Method<'GetObject', [AksharaObjectKey], AksharaObjectData | undefined>
  | Method<'GetLatestBlock', [AksharaChainKey], AksharaBlockData>
  | Method<'GetChains', [AksharaChainKey], Array<AksharaChainId>>
  | Method<
      'GetLogs',
      [
        AksharaChainKey,
        filter: {
          fromBlock: Hex;
          toBlock: Hex;
          address?: Address | Array<Address>;
          topics?: Hash | Array<Hash>;
        },
      ],
      Array<AksharaLogData>
    >;
