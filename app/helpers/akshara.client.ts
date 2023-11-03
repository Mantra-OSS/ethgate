'use client';
import 'client-only';

import { Akshara, AksharaDatabase } from '@ethgate/lib-node';
import { chains } from '@mantra-oss/chains';

class AksharaClient extends Akshara {
  constructor() {
    const database = new AksharaDatabase({
      name: 'akshara',
      indexedDB: globalThis.indexedDB,
      IDBKeyRange: globalThis.IDBKeyRange,
    });
    const fetchFn = globalThis.fetch.bind(globalThis);
    super({ chains, fetchFn, database });
  }
}

export const createAkshara = async () => new AksharaClient();
