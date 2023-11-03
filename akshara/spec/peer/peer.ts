import { RpcClient } from "@ethgate/lib-utils";

// import type { EthgatePeerCallError } from './error';
import type { EthereumMethod } from "./methods";

export type EthereumCall<
  Name extends EthereumMethod["Name"] = EthereumMethod["Name"]
> = Extract<EthereumMethod, { Name: Name }>["Call"];

export type EthereumResult<
  Name extends EthereumMethod["Name"] = EthereumMethod["Name"]
> = Extract<EthereumMethod, { Name: Name }>["Result"];

export abstract class EthereumPeerAbstract extends RpcClient<EthereumMethod> {
  abstract executeBatch(calls: EthereumCall[]): Promise<EthereumResult[]>;
}
