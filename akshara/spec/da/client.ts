import { RpcClient } from '@/lib-utils';

import type { AksharaChainData } from '../db';

import type { AksharaDaMethod } from './methods';

export type AksharaDaCall<TName extends AksharaDaMethod['Name'] = AksharaDaMethod['Name']> =
  Extract<AksharaDaMethod, { Name: TName }>['Call'];

export type AksharaDaResult<TName extends AksharaDaMethod['Name'] = AksharaDaMethod['Name']> =
  Extract<AksharaDaMethod, { Name: TName }>['Result'];

export abstract class AksharaDaClientAbstract extends RpcClient<AksharaDaMethod> {
  abstract executeBatch(calls: AksharaDaCall[]): Promise<AksharaDaResult[]>;

  readonly root: AksharaChainData;
  constructor(root: AksharaChainData) {
    super();
    this.root = root;
  }
}
