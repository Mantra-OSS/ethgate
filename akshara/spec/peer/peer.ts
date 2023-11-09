import { RpcClient } from '@/lib-utils';

// import type { EthgatePeerCallError } from './error';
import type { EthereumMethod } from './methods';

export type EthereumCall<TName extends EthereumMethod['Name'] = EthereumMethod['Name']> = Extract<
  EthereumMethod,
  { Name: TName }
>['Call'];

export type EthereumResult<TName extends EthereumMethod['Name'] = EthereumMethod['Name']> = Extract<
  EthereumMethod,
  { Name: TName }
>['Result'];

export abstract class EthereumPeerAbstract extends RpcClient<EthereumMethod> {
  abstract executeBatch(calls: EthereumCall[]): Promise<EthereumResult[]>;
}
