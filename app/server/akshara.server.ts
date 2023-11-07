import 'server-only';

import { Akshara, AksharaDatabase } from '@/lib-node';
import type { AksharaObjectKey, AksharaObjects } from '@/lib-node';
import type { AksharaNode, SolverNode } from '@/lib-solver';
import { blockType, chainType, logType, receiptType, transactionType } from '@/lib-solver';
import { chains } from '@mantra-oss/chains';
import { IDBFactory, IDBKeyRange } from 'fake-indexeddb';
import { memoize } from 'lodash';

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
