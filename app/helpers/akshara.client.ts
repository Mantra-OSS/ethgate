'use client';
import 'client-only';

import { Akshara, AksharaDatabase } from '@/lib-node';
import { chains } from '@mantra-oss/chains';
import { IDBFactory, IDBKeyRange } from 'fake-indexeddb';

class AksharaClient extends Akshara {
  constructor() {
    const database = new AksharaDatabase({
      name: 'akshara',
      indexedDB: globalThis.indexedDB ?? new IDBFactory(),
      IDBKeyRange: globalThis.indexedDB ? globalThis.IDBKeyRange : IDBKeyRange,
    });
    const fetchFn = globalThis.fetch.bind(globalThis);
    super({ chains, fetchFn, database });
  }
}

export const createAkshara = async () => new AksharaClient();
