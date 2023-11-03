import { Akshara, AksharaDatabase } from '@ethgate/lib-node';
import { chains } from '@mantra-oss/chains';

export class AksharaDom extends Akshara {
  constructor() {
    const database = new AksharaDatabase({
      name: 'akshara-worker',
      indexedDB: globalThis.indexedDB,
      IDBKeyRange: globalThis.IDBKeyRange,
    });
    super({ chains, fetchFn: globalThis.fetch.bind(globalThis), database });
  }
}
