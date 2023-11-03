import { RpcClient } from '@/lib-utils';
import { maxTime, minTime } from '@/spec-node';

import type {
  AksharaBlockData,
  AksharaBlockId,
  AksharaBlockKey,
  AksharaChainData,
  AksharaChainId,
  AksharaChainKey,
  AksharaLogData,
  AksharaLogId,
  AksharaLogKey,
  AksharaObjectData,
  AksharaObjectId,
  AksharaObjectKey,
  AksharaReceiptData,
  AksharaReceiptId,
  AksharaReceiptKey,
  AksharaTransactionData,
  AksharaTransactionId,
  AksharaTransactionKey,
  Time,
} from '../db';

import type { AksharaMethod } from './methods';

// import type { EthgateAksharaDaAbstract } from '../da';

export type AksharaCall<Name extends AksharaMethod['Name'] = AksharaMethod['Name']> = Extract<
  AksharaMethod,
  { Name: Name }
>['Call'];

export type AksharaResult<Name extends AksharaMethod['Name'] = AksharaMethod['Name']> = Extract<
  AksharaMethod,
  { Name: Name }
>['Result'];

export type AksharaPageArgs<Cursor extends string> = {
  isForward: boolean;
  limit: number;
  before?: Cursor;
  after?: Cursor;
};

export abstract class AksharaAbstract extends RpcClient<AksharaMethod> {
  abstract executeBatch(calls: AksharaCall[]): Promise<AksharaResult[]>;

  // readonly roots: Record<EthgateChainId, EthgateChainData>;
  // constructor(roots: EthgateChainData[]) {
  //   super();
  //   this.roots = Object.fromEntries(roots.map((root) => [root.chainId, root]));
  // }

  async getObject<T extends AksharaObjectData = any>(
    idOrKey: AksharaObjectId | AksharaObjectKey,
  ): Promise<T | undefined> {
    return this.execute('GetObject', [idOrKey]);
  }
  async getChain(idOrKey: AksharaChainId | AksharaChainKey): Promise<AksharaChainData | undefined> {
    return this.execute('GetObject', [
      typeof idOrKey === 'string' ? idOrKey : { type: 'Chain', ...idOrKey },
    ]);
  }
  async getBlock(idOrKey: AksharaBlockId | AksharaBlockKey): Promise<AksharaBlockData | undefined> {
    return this.execute('GetObject', [
      typeof idOrKey === 'string' ? idOrKey : { type: 'Block', ...idOrKey },
    ]);
  }
  async getTransaction(
    idOrKey: AksharaTransactionId | AksharaTransactionKey,
  ): Promise<AksharaTransactionData | undefined> {
    return this.execute('GetObject', [
      typeof idOrKey === 'string' ? idOrKey : { type: 'Transaction', ...idOrKey },
    ]);
  }
  async getReceipt(
    idOrKey: AksharaReceiptId | AksharaReceiptKey,
  ): Promise<AksharaReceiptData | undefined> {
    return this.execute('GetObject', [
      typeof idOrKey === 'string' ? idOrKey : { type: 'Receipt', ...idOrKey },
    ]);
  }
  async getLog(idOrKey: AksharaLogId | AksharaLogKey): Promise<AksharaLogData | undefined> {
    return this.execute('GetObject', [
      typeof idOrKey === 'string' ? idOrKey : { type: 'Log', ...idOrKey },
    ]);
  }

  async getChains(chainId: AksharaChainId): Promise<AksharaChainId[]> {
    return this.execute('GetChains', [{ chainId }]);
  }
  async *blockNumbers(
    key: Partial<AksharaChainKey>,
    high: Time,
    low: Time,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    buffer: number,
  ): AsyncGenerator<number, undefined, undefined> {
    if (low !== minTime) {
      throw new Error('low must be minTime');
    }
    let time = high;
    if (time >= maxTime) {
      const [latestBlock] = await this.execute('GetBlockRange', [key, 0, 1]);
      if (!latestBlock) {
        return;
      }
      time = latestBlock.number;
    }
    while (time >= low) {
      yield time;
      time -= 1;
    }
  }
}
