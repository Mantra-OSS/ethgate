'use client';
import 'client-only';
import { Akshara, AksharaDatabase } from '@/lib-node';
import type { Chain, ConnectionBlah, EdgeType } from '@/lib-solver';
import { type PageArgs, Solver, type SolverEdge, type SolverNode } from '@/lib-solver';
import { chains } from '@mantra-oss/chains';
import { IDBFactory, IDBKeyRange } from 'fake-indexeddb';
import { useCallback, useEffect, useMemo } from 'react';
import type { SWRResponse } from 'swr';
import useSWR, { useSWRConfig } from 'swr';
import type { SWRInfiniteKeyLoader } from 'swr/infinite';
import useSWRInfinite, { SWRInfiniteResponse } from 'swr/infinite';
import type { SWRSubscriptionOptions } from 'swr/subscription';
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
  const response = useSWR<ConnectionData<TEdge>>(
    ['connection', edgeType.name, tailId, args],
    connectionFetcher,
    {
      // suspense: true,
    },
  );
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
  // useDaSubscription(tailId);
  const getKey: SWRInfiniteKeyLoader<ConnectionBlah<TEdge>> = useCallback(
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
  const { data, error, isLoading, isValidating, mutate, setSize, size } = useSWRInfinite<
    ConnectionBlah<TEdge>
  >(getKey, connectionFetcher, {
    suspense: true,
  });
  const pages = data ? data : [];
  const lastPage = pages[pages.length - 1];
  const edges = pages.flatMap((page) => page.edges);

  // const loadNext = useCallback(() => {
  //   if (isLoading || isValidating) {
  //     return;
  //   }
  //   console.log('loadNext', pages.length);
  //   setSize(pages.length + 1);
  // }, [setSize, pages.length, isLoading, isValidating]);

  const loadNext = undefined;
  const hasNext = lastPage.pageInfo.hasNextPage;

  return {
    edges,
    loadNext: hasNext && !isValidating && !isLoading ? loadNext : undefined,
  };
};

export const useDaSubscription = function useDaSubscription(nodeId: SolverNode['id']) {
  const node = useNode(nodeId);
  const { mutate } = useSWRConfig();
  const subscription = useSWRSubscription(node.meta.chainId ?? null, nodeSubscriptionFetcher);

  useEffect(() => {
    mutate((key) => {
      if (Array.isArray(key) && key[0] === 'connection') {
        const [, type, tailId, args] = key;
        if (!args.after) {
          console.log('mutate', key);
          return true;
        }
      }
      return false;
    });
  }, [mutate, subscription.data]);
  return subscription;
};

const nodeFetcher = async <TNode extends SolverNode>(key: TNode['id']): Promise<TNode> => {
  // console.debug(`[backend] nodeFetcher(${key})`);
  const database = solver.database;
  const node = await database.readNode(key);
  // console.debug(`[backend] nodeFetcher(${key}) -> ${JSON.stringify(node)}`);
  return node;
};

const nodesFetcher = async <Node extends SolverNode>(keys: Node['id'][]): Promise<Node[]> => {
  // console.debug(`[backend] nodeFetcher(${key})`);
  const database = solver.database;
  const node = await Promise.all(keys.map((key) => database.readNode(key)));
  // console.debug(`[backend] nodeFetcher(${key}) -> ${JSON.stringify(node)}`);
  return node;
};

export type ConnectionKey<TEdge extends SolverEdge = SolverEdge> = [
  'connection',
  type: TEdge['type'],
  tailId: TEdge['tailId'],
  args: PageArgs<TEdge>,
];
export type ConnectionData<TEdge extends SolverEdge = SolverEdge> = ConnectionBlah<TEdge> & {
  type: TEdge['type'];
  tailId: TEdge['tailId'];
};
const connectionFetcher = async <TEdge extends SolverEdge>(
  key: ConnectionKey<TEdge>,
): Promise<ConnectionData<TEdge>> => {
  const [, type, tailId, args] = key;
  // console.debug(`[backend] connectionFetcher(${type}, ${tailId}, ${JSON.stringify(args)})`);
  const database = solver.database;
  const connection = await database.getConnection(type, tailId, args).collect();
  // console.debug(
  //   `[backend] connectionFetcher(${type}, ${tailId}, ${JSON.stringify(args)}) -> ${JSON.stringify(
  //     connection,
  //   )}`,
  // );
  return { type, tailId, ...connection };
};

const nodeSubscriptionFetcher = <TNode extends SolverNode>(
  key: TNode['id'],
  { next }: SWRSubscriptionOptions,
) => {
  // console.debug(`[backend] nodeSubscriptionFetcher(${key})`);
  let aborted = false;
  (async () => {
    const database = solver.database;
    const updates = database.networkUpdates(key as Chain['id']);
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
