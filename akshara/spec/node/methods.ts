import type { RpcClientMethod as Method } from "@ethgate/lib-utils";

import type {
  Address,
  AksharaBlockData,
  AksharaChainId,
  AksharaChainKey,
  AksharaLogData,
  AksharaObjectData,
  AksharaObjectId,
  AksharaObjectKey,
  Hash,
  Hex,
} from "../db";

export type AksharaMethod =
  | Method<
      "GetObject",
      [AksharaObjectId | AksharaObjectKey],
      AksharaObjectData | undefined
    >
  | Method<"GetLatestBlock", [AksharaChainKey], AksharaBlockData | undefined>
  | Method<"GetChains", [AksharaChainKey], Array<AksharaChainId>>
  | Method<
      "GetBlockRange",
      [Partial<AksharaChainKey>, pos: number, limit: number],
      AksharaBlockData[]
    >
  | Method<
      "GetLogs",
      [
        AksharaChainKey,
        filter: {
          fromBlock: Hex;
          toBlock: Hex;
          address?: Address | Array<Address>;
          topics?: Hash | Array<Hash>;
        }
      ],
      Array<AksharaLogData>
    >;
