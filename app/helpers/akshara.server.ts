'use server';
import 'server-only';

import { Akshara, AksharaDatabase } from '@/lib-node';
import type { AksharaObjectKey, AksharaObjects } from '@/lib-node';
import { chains } from '@mantra-oss/chains';
import { IDBFactory, IDBKeyRange } from 'fake-indexeddb';
import { memoize } from 'lodash';

import type { SolverNode } from '../../solver/data';
import { Block, Chain, Log, Receipt, Transaction } from '../../solver/data';

const { ANKR_KEY } = process.env;

class AksharaServer extends Akshara {
  constructor() {
    const database = new AksharaDatabase({
      name: 'akshara-server',
      indexedDB: new IDBFactory(),
      IDBKeyRange,
    });
    const fetchFn = globalThis.fetch.bind(globalThis);
    super({ chains: serverChains, fetchFn, database });
  }
}

export const createAkshara = memoize(async () => new AksharaServer());

export async function readObject<Key extends AksharaObjectKey>(
  key: Key,
): Promise<AksharaObjects[Key['type']]['Data']> {
  const akshara = await createAkshara();
  const object = await akshara.getObject(key);
  if (!object) {
    throw new Error(`Object not found: ${JSON.stringify(key)}`);
  }
  return object;
}

export async function readAksharaNode<Key extends AksharaObjectKey>(key: Key): Promise<SolverNode> {
  const akshara = await createAkshara();
  const object = await akshara.getObject(key);
  if (!object) {
    throw new Error(`Object not found: ${JSON.stringify(key)}`);
  }
  switch (key.type) {
    case 'Chain':
      return new Chain(object);
    case 'Block':
      return new Block(object);
    case 'Transaction':
      return new Transaction(object);
    case 'Receipt':
      return new Receipt(object);
    case 'Log':
      return new Log(object);
  }
}

const serverChains = {
  '1': {
    ...chains['1'],
    rpcs: [
      {
        url: `https://rpc.ankr.com/eth/${ANKR_KEY}`,
        source: 'test',
      },
    ],
  },
  '10': {
    ...chains['10'],
    rpcs: [
      {
        url: `https://rpc.ankr.com/optimism/${ANKR_KEY}`,
        source: 'test',
      },
    ],
  },
  '324': {
    ...chains['324'],
    rpcs: [
      {
        url: `https://rpc.ankr.com/zksync_era/${ANKR_KEY}`,
        source: 'test',
      },
    ],
  },
  '8453': {
    ...chains['8453'],
    rpcs: [
      {
        url: `https://rpc.ankr.com/base/${ANKR_KEY}`,
        source: 'test',
      },
    ],
  },
  '42161': {
    ...chains['42161'],
    rpcs: [
      {
        url: `https://rpc.ankr.com/arbitrum/${ANKR_KEY}`,
        source: 'test',
      },
    ],
  },
  '42170': {
    ...chains['42170'],
    rpcs: [
      {
        url: `https://rpc.ankr.com/arbitrumnova/${ANKR_KEY}`,
        source: 'test',
      },
    ],
  },
  '534352': {
    ...chains['534352'],
    rpcs: [
      {
        url: `https://rpc.ankr.com/scroll/${ANKR_KEY}`,
        source: 'test',
      },
    ],
  },
};
