'use client';
import {
  type EdgeAbstract,
  EthgateSolver,
  type NodeAbstract,
  type PageArgs,
  type PageInfo,
} from '@ethgate/lib-solver';
import { cache } from 'react';

import { createAkshara } from './akshara.client';

export class EthgateSolverMainThread {
  solver: EthgateSolver;

  static async create() {
    const node = await createAkshara();
    const solver = await EthgateSolver.create({ node });
    return new EthgateSolverMainThread(solver);
  }

  private constructor(solver: EthgateSolver) {
    this.solver = solver;
  }
}

export const serverPromise = EthgateSolverMainThread.create();

// export class PunkerBackendClient {
//   #backend: EthgateSolverServer | Promise<EthgateSolverServer> = serverPromise;

//   async query(request: string, variables: Variables): Promise<QueryResponse> {
//     const backend = await this.#backend;
//     return backend.query(request, variables);
//   }
//   async subscribe(request: string, variables: Variables): Promise<Observable<QueryResponse>> {
//     const backend = await this.#backend;
//     return backend.subscribe(request, variables);
//   }
// }

export const readNode = cache(async function readNode<T extends NodeAbstract>(id: T['id']) {
  const database = (await serverPromise).solver.database;
  const node = await database.readNode(id);
  return node;
});

export const readConnection = cache(async function readConnection<Edge extends EdgeAbstract>(
  type: Edge['type'],
  tailId: Edge['tailId'],
  args: PageArgs<Edge>,
): Promise<{ edges: Edge[]; pageInfo: PageInfo<Edge> }> {
  const database = (await serverPromise).solver.database;
  const connection = database.getConnection(type, tailId, args).collect();
  return connection;
});
