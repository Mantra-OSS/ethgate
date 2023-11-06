'use client';
import {
  Solver,
  type PageArgs,
  type PageInfo,
  type SolverEdge,
  type SolverNode,
} from '@/lib-solver';
import { memoize } from 'lodash';

import { createAkshara } from '../helpers/akshara.client';
import { use } from 'react';

export class EthgateSolver {
  solver: Solver;

  static async create() {
    const node = await createAkshara();
    const solver = await Solver.create({ node });
    return new EthgateSolver(solver);
  }

  private constructor(solver: Solver) {
    this.solver = solver;
  }
}

export const solverPromise = EthgateSolver.create();

export function useSolver() {
  return use(solverPromise);
}

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

export const readNode = memoize(async function readNode<T extends SolverNode>(id: T['id']) {
  const database = (await solverPromise).solver.database;
  const node = await database.readNode(id);
  return node;
});

export interface Connection<Edge extends SolverEdge> {
  edges: Edge[];
  pageInfo: PageInfo<Edge>;
}

export const readConnection = async function readConnection<Edge extends SolverEdge>(
  type: Edge['type'],
  tailId: Edge['tailId'],
  args: PageArgs<Edge>,
): Promise<Connection<Edge>> {
  console.debug(`[backend] readConnection(${type}, ${tailId}, ${JSON.stringify(args)})`);
  const database = (await solverPromise).solver.database;
  const connection = await database.getConnection(type, tailId, args).collect();
  console.debug(
    `[backend] readConnection(${type}, ${tailId}, ${JSON.stringify(args)}) -> ${JSON.stringify(
      connection,
    )}`,
  );
  return connection;
};
