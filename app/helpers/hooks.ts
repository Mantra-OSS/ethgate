'use client';
import type { SolverNode } from '@/lib-solver';
import { type PageArgs, type PageInfo, type SolverEdge } from '@/lib-solver';
import { use, useCallback, useEffect, useMemo, useState } from 'react';

import type { Connection } from '../client/backend';
import { readConnection, readNode, solverPromise } from '../client/backend';

export const useNode = function useNode<T extends SolverNode>(id: T['id']): T {
  const node = use(readNode(id));
  return node;
};

export const useConnection = function useConnection<Edge extends SolverEdge>(
  type: Edge['type'],
  tailId: Edge['tailId'],
  initialArgs: PageArgs<Edge>,
): [Connection<Edge> | undefined, loadNext: () => Promise<void>, refetch: () => Promise<void>] {
  const [connection, setConnection] = useState<Connection<Edge> | undefined>(undefined);
  const [aggregatedConnection, setAggregatedConnection] = useState<Connection<Edge> | undefined>(
    undefined,
  );

  useEffect(() => {
    (async () => {
      setConnection(await readConnection(type, tailId, initialArgs));
    })();
  }, [type, tailId, initialArgs]);

  // useEfEffect(() => {
  //   const startCursor = connection?.pageInfo.startCursor;
  //   const endCursor = connection?.pageInfo.endCursor;

  //   if (!startCursor || !endCursor) {
  //     return;
  //   }

  //   if (
  //     aggregatedConnection?.pageInfo.startCursor === startCursor &&
  //     aggregatedConnection?.pageInfo.endCursor === endCursor
  //   ) {
  //     return;
  //   }

  //   console.debug('aggregating connections', connection);

  //   setAggregatedConnection((current) => ({
  //     edges: [...(current?.edges ?? []), ...connection.edges],
  //     pageInfo: {
  //       ...current?.pageInfo,
  //       ...connection.pageInfo,
  //     },
  //   }));
  // }, [connection?.pageInfo.startCursor, connection?.pageInfo.endCursor]);

  const loadNext = useCallback(async () => {
    if (!connection) {
      return;
    }
    const newConnectionPageArgs = {
      after: connection.pageInfo.endCursor,
      first: initialArgs.first,
    };
    console.debug('loading next page', newConnectionPageArgs);
    // setConnection(await readConnection(type, tailId, newConnectionPageArgs));
  }, [connection, type, tailId]);

  const refetch = useCallback(async () => {
    // setConnection(await readConnection(type, tailId, initialArgs));
  }, [type, tailId, initialArgs]);

  return [connection, loadNext, refetch];
};
