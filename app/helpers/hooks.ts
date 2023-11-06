'use client';
import type { SolverNode } from '@/lib-solver';
import { type PageArgs, type PageInfo, type SolverEdge } from '@/lib-solver';
import { use, useCallback, useEffect, useMemo, useState } from 'react';

import type { Connection } from './backend';
import { readConnection, readNode, serverPromise } from './backend';

export const useNode = function useNode<T extends SolverNode>(id: T['id']): T {
  const node = use(readNode(id));
  return node;
};

export const useConnection = function useConnection<Edge extends SolverEdge>(
  type: Edge['type'],
  tailId: Edge['tailId'],
  initialArgs: PageArgs<Edge>,
): [
    Connection<Edge> | undefined,
    loadNext: () => Promise<void>,
    refetch: () => Promise<void>,
  ] {
  const [connection, setConnection] = useState<Connection<Edge> | undefined>(undefined);
  const [aggregatedConnection, setAggregatedConnection] = useState<Connection<Edge> | undefined>(undefined);

  useEffect(() => {
    (async () => {
      setConnection(await readConnection(type, tailId, initialArgs));
    })();
  }, [type, tailId, initialArgs]);

  useEffect(() => {
    if (!connection) {
      return;
    }
    setAggregatedConnection({
      edges: [...(aggregatedConnection?.edges ?? []), ...connection.edges],
      pageInfo: {
        ...aggregatedConnection?.pageInfo,
        ...connection.pageInfo,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection]);

  const loadNext = useCallback(async () => {
    if (!connection) {
      return;
    }
    setConnection(await readConnection(type, tailId, {
      ...connection.pageInfo,
      after: connection.pageInfo.endCursor,
    }));
  }, [connection, type, tailId]);

  const refetch = useCallback(async () => {
    setConnection(await readConnection(type, tailId, initialArgs));
  }, [type, tailId, initialArgs]);

  return [aggregatedConnection, loadNext, refetch];
};
