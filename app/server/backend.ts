import 'server-only';
import {
  type PageArgs,
  type PageInfo,
  Solver,
  type SolverEdge,
  type SolverNode,
} from '@/lib-solver';
import { memoize } from 'lodash';

import { createAkshara } from './akshara.server';

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

const solverPromise = EthgateSolver.create();

export async function getSolver() {
  return solverPromise;
}

export interface Connection<Edge extends SolverEdge> {
  edges: Edge[];
  pageInfo: PageInfo<Edge>;
}
