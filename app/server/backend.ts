import 'server-only';
import { type PageInfo, Solver, type SolverEdge } from '@/lib-solver';
import { IDBFactory, IDBKeyRange } from 'fake-indexeddb';
import { cache } from 'react';

import { AksharaDatabase } from '../../akshara/database';
import { Akshara } from '../../akshara/node';

import { serverChains } from './chains';

class ServerAkshara extends Akshara {
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

class ServerSolver extends Solver {
  constructor() {
    const node = new ServerAkshara();
    super({ node });
  }
}

export const getSolver = cache(() => {
  return new ServerSolver();
});

export interface Connection<TEdge extends SolverEdge> {
  edges: TEdge[];
  pageInfo: PageInfo<TEdge>;
}
