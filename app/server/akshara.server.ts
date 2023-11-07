import 'server-only';

import { Akshara, AksharaDatabase } from '@/lib-node';
import type { AksharaObjectKey, AksharaObjects } from '@/lib-node';
import { chains } from '@mantra-oss/chains';
import { IDBFactory, IDBKeyRange } from 'fake-indexeddb';
import { memoize } from 'lodash';

import type { SolverNode } from '../../solver/graph';
import { blockType, chainType, logType, receiptType, transactionType } from '../../solver/graph';

const { ANKR_KEY } = process.env;

class AksharaServer extends Akshara {
  constructor() {
    const database = new AksharaDatabase({
      name: 'akshara-server',
      indexedDB: new IDBFactory(),
      IDBKeyRange,
    });
    const fetchFn = globalThis.fetch.bind(globalThis);
    // TODO: No batch
    // TODO: No cache
    super({ chains: serverChains, fetchFn, database, daBatchScheduleFn: undefined as any });
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
      return chainType.create(object);
    case 'Block':
      return blockType.create(object);
    case 'Transaction':
      return transactionType.create(object);
    case 'Receipt':
      return receiptType.create(object);
    case 'Log':
      return logType.create(object);
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
