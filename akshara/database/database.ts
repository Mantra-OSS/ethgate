import type {
  AksharaObjectData,
  AksharaObjectKey,
  AksharaObjectPartialKey,
} from '@ethgate/spec-node';
import { AksharaDatabaseAbstract } from '@ethgate/spec-node';
import { Dexie, type DexieOptions } from 'dexie';

export type { Hash } from '@ethgate/spec-node';

export type AksharaDatabaseConfig = {
  name: string;
} & Required<Pick<DexieOptions, 'indexedDB' | 'IDBKeyRange'>>;

export class AksharaDatabase extends AksharaDatabaseAbstract {
  readonly name: string;
  inner: Dexie;

  constructor(config: AksharaDatabaseConfig) {
    super();
    this.name = config.name;
    this.inner = new Dexie(`${this.name}-asdasd`, {
      indexedDB: config.indexedDB,
      IDBKeyRange: config.IDBKeyRange,
    });
    this.inner.version(1).stores({
      Chain: ['chainId'].join(','),
      Block: [
        '[chainId+hash]',
        '&[chainId+number]',
        'chainId',
        'timestamp',
        '&[timestamp+chainId+number]',
        '&[chainId+timestamp+number]',
      ].join(','),
      Transaction: [
        '[chainId+hash]',
        '&[chainId+blockNumber+transactionIndex]',
        '&[chainId+blockHash+transactionIndex]',
        'chainId',
      ].join(','),
      Receipt: [
        '[chainId+transactionHash]',
        '&[chainId+blockNumber+transactionIndex]',
        '&[chainId+blockHash+transactionIndex]',
        'chainId',
      ].join(','),
      Log: [
        '[chainId+transactionHash+logIndex]',
        '&[chainId+blockNumber+transactionIndex+logIndex]',
        '&[chainId+blockHash+transactionIndex+logIndex]',
        'chainId',
      ].join(','),
    });
  }

  async _get({ type, ...key }: AksharaObjectKey): Promise<AksharaObjectData | void> {
    return this.inner.table(type).get(key);
  }
  async _getObjects(
    { type, ...key }: AksharaObjectPartialKey,
    timestamp: number | null,
    limit: number,
  ): Promise<AksharaObjectData[]> {
    switch (type) {
      case 'Block': {
        if ('hash' in key) {
          throw new Error(`Unsupported key11 ${JSON.stringify(key)}`);
        }
        if ('timestamp' in key) {
          throw new Error(`Unsupported key11 ${JSON.stringify(key)}`);
        }
        if ('chainId' in key) {
          const table = this.inner.table(type);
          const rows = await table
            .where('[chainId+timestamp+number]')
            .between(
              [key.chainId, Dexie.minKey, Dexie.minKey],
              [
                key.chainId,
                typeof timestamp === 'number' ? timestamp : Dexie.maxKey,
                'number' in key ? key.number : Dexie.maxKey,
              ],
            )
            .reverse()
            .limit(limit)
            .toArray();
          return rows;
        } else {
          const table = this.inner.table(type);
          const rows = await table
            .where('[timestamp+chainId+number]')
            .between(
              [Dexie.minKey, Dexie.minKey, Dexie.minKey],
              [
                typeof timestamp === 'number' ? timestamp : Dexie.maxKey,
                'chainId' in key ? key.chainId : Dexie.maxKey,
                'number' in key ? key.number : Dexie.maxKey,
              ],
            )
            .reverse()
            .limit(limit)
            .toArray();
          return rows;
        }
      }
      default: {
        throw new Error(`Unsupported type ${type}`);
      }
    }
  }
  async _put({ type, ...value }: { type: string } & AksharaObjectData): Promise<void> {
    // await this.#database.table(type).add(item)
    await this.inner
      .table(type)
      .put(value)
      .catch((err) => {
        console.log('puterr', type, value, err);
      });
  }
  async _delete({ type, ...key }: AksharaObjectKey): Promise<void> {
    await this.inner.table(type).delete(key as any);
  }
  async clear(): Promise<void> {
    throw new Error('Not implemented');
  }
}
