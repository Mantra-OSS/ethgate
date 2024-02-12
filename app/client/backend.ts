'use client';
import 'client-only';
import { Akshara, AksharaDatabase } from '@/lib-node';
import { type PageArgs, Solver, type SolverEdge, type SolverNode } from '@/lib-solver';
import { chains } from '@mantra-oss/chains';
import { IDBFactory, IDBKeyRange } from 'fake-indexeddb';

class ClientAkshara extends Akshara {
  constructor() {
    const database = new AksharaDatabase({
      name: 'akshara',
      indexedDB: globalThis.indexedDB ?? new IDBFactory(),
      IDBKeyRange: globalThis.indexedDB ? globalThis.IDBKeyRange : IDBKeyRange,
    });
    const fetchFn = globalThis.fetch.bind(globalThis);
    const daBatchScheduleFn = (callback: any) => setTimeout(callback, 1000);
    super({ chains, fetchFn, database, daBatchScheduleFn });
  }
}

class ClientSolver extends Solver {
  constructor() {
    const node = new ClientAkshara();
    super({ node });
  }
}

const solver = new ClientSolver();

export function useSolver() {
  return solver;
}
