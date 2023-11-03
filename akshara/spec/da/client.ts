import { RpcClient } from "@ethgate/lib-utils";

import type { AksharaChainData } from "../db";

import type { AksharaDaMethod } from "./methods";

export type AksharaDaCall<
  Name extends AksharaDaMethod["Name"] = AksharaDaMethod["Name"]
> = Extract<AksharaDaMethod, { Name: Name }>["Call"];

export type AksharaDaResult<
  Name extends AksharaDaMethod["Name"] = AksharaDaMethod["Name"]
> = Extract<AksharaDaMethod, { Name: Name }>["Result"];

export abstract class AksharaDaClientAbstract extends RpcClient<AksharaDaMethod> {
  abstract executeBatch(calls: AksharaDaCall[]): Promise<AksharaDaResult[]>;

  readonly root: AksharaChainData;
  constructor(root: AksharaChainData) {
    super();
    this.root = root;
  }
}
