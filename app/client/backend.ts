'use client';
import 'client-only';
import type { Chain } from '@/lib-solver';
import { type PageArgs, Solver, type SolverEdge, type SolverNode } from '@/lib-solver';
import { use } from 'react';
import useSWR from 'swr';
import type { SWRSubscriptionOptions } from 'swr/subscription';

import { createAkshara } from './akshara.client';

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

export const useNode = function useNode<T extends SolverNode>(id: T['id']): T {
  const { data: node } = useSWR(id, nodeFetcher as any, { suspense: true });
  return node;
};

export const nodeFetcher = async <Node extends SolverNode>(key: Node['id']): Promise<Node> => {
  console.debug(`[backend] nodeFetcher(${key})`);
  const database = (await solverPromise).solver.database;
  const node = await database.readNode(key);
  console.debug(`[backend] nodeFetcher(${key}) -> ${JSON.stringify(node)}`);
  return node;
};

export const connectionFetcher = async <Edge extends SolverEdge>(
  key: [type: Edge['type'], tailId: Edge['tailId'], args: PageArgs<Edge>],
) => {
  const [type, tailId, args] = key;
  console.debug(`[backend] connectionFetcher(${type}, ${tailId}, ${JSON.stringify(args)})`);
  const database = (await solverPromise).solver.database;
  const connection = await database.getConnection(type, tailId, args).collect();
  console.debug(
    `[backend] connectionFetcher(${type}, ${tailId}, ${JSON.stringify(args)}) -> ${JSON.stringify(
      connection,
    )}`,
  );
  return { type, tailId, ...connection };
};

export const nodeSubscriptionFetcher = <Node extends SolverNode>(
  key: Node['id'],
  { next }: SWRSubscriptionOptions,
) => {
  console.debug(`[backend] nodeSubscriptionFetcher(${key})`);
  let aborted = false;
  (async () => {
    const database = (await solverPromise).solver.database;
    const updates = database.networkUpdates(key as Chain['id']);
    for await (const update of updates) {
      if (aborted) {
        break;
      }
      console.debug(`[backend] nodeSubscriptionFetcher(${key}) -> ${JSON.stringify(update)}`);
      if (!update) {
        continue;
      }
      next(undefined, update);
    }
  })();
  return () => {
    aborted = true;
  };
};
