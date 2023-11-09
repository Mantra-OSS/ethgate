'use client';
import 'client-only';
import { Akshara, AksharaDatabase } from '@/lib-node';
import type { Chain, ChainHasBlock, ConnectionPage, EdgeType } from '@/lib-solver';
import { type PageArgs, Solver, type SolverEdge, type SolverNode } from '@/lib-solver';
import { chains } from '@mantra-oss/chains';
import { IDBFactory, IDBKeyRange } from 'fake-indexeddb';
import { useCallback, useEffect, useMemo } from 'react';
import type { Fetcher, SWRResponse } from 'swr';
import useSWR, { useSWRConfig } from 'swr';
import type { SWRInfiniteKeyLoader } from 'swr/infinite';
import useSWRInfinite, { SWRInfiniteResponse } from 'swr/infinite';
import type { SWRSubscription, SWRSubscriptionOptions } from 'swr/subscription';
import useSWRSubscription from 'swr/subscription';

class ClientAkshara extends Akshara {
  constructor() {
    const database = new AksharaDatabase({
      name: 'akshara',
      indexedDB: globalThis.indexedDB ?? new IDBFactory(),
      IDBKeyRange: globalThis.indexedDB ? globalThis.IDBKeyRange : IDBKeyRange,
    });
    const fetchFn = globalThis.fetch.bind(globalThis);
    const daBatchScheduleFn = (callback: any) => setTimeout(callback, 2000);
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

export const useNode = function useNode<TNode extends SolverNode>(id: TNode['id']): TNode {
  const { data: node } = useSWR(id, nodeFetcher as any, { suspense: true });
  return node;
};

export const useNode2 = function useNode<TNode extends SolverNode>(
  id: TNode['id'] | null,
): TNode | undefined {
  const { data: node } = useSWR<TNode>(id, nodeFetcher as any, {
    // suspense: true
  });
  return node;
};

export const useNodes = function useNodes<TNode extends SolverNode>(
  ids: TNode['id'][],
): TNode[] | undefined {
  const { data: node } = useSWR<TNode[]>(ids, nodesFetcher as any, {
    // suspense: true
  });
  return node;
};

export const useConnection = function useConnection<TEdge extends SolverEdge>(
  edgeType: EdgeType<TEdge>,
  tailId: SolverNode['id'],
  args: PageArgs<TEdge>,
): SWRResponse<ConnectionData<TEdge>> {
  // useDaSubscription(tailId);
  const response = useSWR(['connection', edgeType.name, tailId, args], connectionFetcher as any);
  return response;
};

export type Pagination<TEdge extends SolverEdge> = {
  edges: TEdge[];
  loadNext?: () => void;
};
export const usePagination = function usePagination<TEdge extends SolverEdge>(
  edgeType: EdgeType<TEdge>,
  tailId: SolverNode['id'],
  args: PageArgs<TEdge>,
): Pagination<TEdge> {
  const subscription = useDaSubscription(tailId);
  const getKey: SWRInfiniteKeyLoader<ConnectionPage<TEdge>> = useCallback(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.pageInfo.hasNextPage) return null;
      const key = [
        'connection',
        edgeType.name,
        tailId,
        {
          first: 10,
          after: previousPageData?.pageInfo.endCursor,
        },
      ];
      return key;
    },
    [edgeType.name, tailId],
  );
  const { data, error, isLoading, isValidating, mutate, setSize, size } = useSWRInfinite(
    getKey,
    connectionFetcher as any,
  );
  const pages = data ? data : [];
  const lastPage = pages[pages.length - 1];
  const edges = pages.flatMap((page) => page.edges);

  useEffect(() => {
    // mutate();
  }, [mutate, subscription.data]);

  // const loadNext = useCallback(() => {
  //   if (isLoading || isValidating) {
  //     return;
  //   }
  //   console.log('loadNext', pages.length);
  //   setSize(pages.length + 1);
  // }, [setSize, pages.length, isLoading, isValidating]);

  const loadNext = undefined;
  const hasNext = lastPage?.pageInfo.hasNextPage;

  return {
    edges,
    loadNext: hasNext && !isValidating && !isLoading ? loadNext : undefined,
  };
};

export const useDaSubscription = function useDaSubscription(nodeId: SolverNode['id']) {
  const node = useNode(nodeId);
  const subscription = useSWRSubscription(node.meta.chainId ?? null, nodeSubscriptionFetcher);
  return subscription;
};

const nodeFetcher: Fetcher<SolverNode, SolverNode['id']> = async (key) => {
  // console.debug(`[backend] nodeFetcher(${key})`);
  const node = await solver.database.readNode(key);
  // console.debug(`[backend] nodeFetcher(${key}) -> ${JSON.stringify(node)}`);
  return node;
};

const nodesFetcher = async <TNode extends SolverNode>(keys: TNode['id'][]): Promise<TNode[]> => {
  // console.debug(`[backend] nodeFetcher(${key})`);
  const node = await Promise.all(keys.map((key) => solver.database.readNode(key)));
  // console.debug(`[backend] nodeFetcher(${key}) -> ${JSON.stringify(node)}`);
  return node;
};

export type ConnectionKey<TEdge extends SolverEdge = SolverEdge> = [
  'connection',
  type: TEdge['type'],
  tailId: TEdge['tailId'],
  args: PageArgs<TEdge>,
];
export type ConnectionData<TEdge extends SolverEdge = SolverEdge> = ConnectionPage<TEdge> & {
  type: TEdge['type'];
  tailId: TEdge['tailId'];
};
const connectionFetcher: Fetcher<ConnectionData, ConnectionKey> = async (key) => {
  const [, type, tailId, args] = key;
  // console.debug(`[backend] connectionFetcher(${type}, ${tailId}, ${JSON.stringify(args)})`);
  const connection = await solver.database.getConnection(type, tailId, args).collect();
  // console.debug(
  //   `[backend] connectionFetcher(${type}, ${tailId}, ${JSON.stringify(args)}) -> ${JSON.stringify(
  //     connection,
  //   )}`,
  // );
  return { type, tailId, ...connection };
};

const nodeSubscriptionFetcher: SWRSubscription<SolverNode['id'], ChainHasBlock, Error> = (
  key,
  { next },
) => {
  // console.debug(`[backend] nodeSubscriptionFetcher(${key})`);
  let aborted = false;
  (async () => {
    const updates = solver.database.networkUpdates(key as Chain['id']);
    for await (const update of updates) {
      if (aborted) {
        break;
      }
      // console.debug(`[backend] nodeSubscriptionFetcher(${key}) -> ${JSON.stringify(update)}`);
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
