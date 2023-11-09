'use client';

import { useNode } from '@/app/client/backend';
import type { ConnectionBlah, Log, SolverEdge, SolverNode } from '@/lib-solver';
import type { EdgeType } from '@/lib-solver';
import { Collapse, List, ListItem, ListItemAvatar, ListItemButton } from '@mui/material';
import { useCallback, useTransition } from 'react';
import { TransitionGroup } from 'react-transition-group';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

import { connectionFetcher } from '../client/backend';

import InfiniteList from './InfiniteList';
import { FallbackBoundary, NodeAvatar } from './ui';

export default function NodeConnectionList<TEdge extends SolverEdge>({
  node,
  edgeType,
  renderItem,
}: {
  node: SolverNode;
  edgeType: EdgeType<TEdge>;
  renderItem: (edge: TEdge) => React.ReactNode;
}) {
  const [, startTransition] = useTransition();
  // const { data, error } = useSWR(
  //   [
  //     edgeType.name,
  //     node.id,
  //     {
  //       first: 10,
  //     },
  //   ],
  //   connectionFetcher,
  // );
  const getKey = useCallback(
    (pageIndex: number, previousPageData: ConnectionBlah<any> | null) => {
      if (previousPageData && !previousPageData.pageInfo.hasNextPage) return null;
      const key = [
        edgeType.name,
        node.id,
        {
          first: 10,
          after: previousPageData?.pageInfo.endCursor,
        },
      ];
      return key;
    },
    [edgeType.name, node.id],
  );

  const { data, error, isLoading, isValidating, mutate, size, setSize } = useSWRInfinite(
    getKey,
    connectionFetcher,
    { suspense: true },
  );
  const pages = data ?? [];
  const lastPage = pages[pages.length - 1];
  const edges = pages.flatMap((page) => page.edges);

  const onLoadNext = useCallback(() => {
    startTransition(() => {
      setSize((size) => size + 1);
    });
  }, [setSize]);

  return (
    <>
      <InfiniteList
        // loadPrevious={hasPrevious && onLoadPrevious}
        loadNext={lastPage.pageInfo.hasNextPage && onLoadNext}
      >
        <List>
          <TransitionGroup>
            {edges.map((edge) => (
              <Collapse key={edge.headId}>
                <ListItem dense disablePadding>
                  <FallbackBoundary>
                    <NodeConnectionListItem edgeType={edgeType} tail={node} edge={edge}>
                      {renderItem(edge as any)}
                    </NodeConnectionListItem>
                  </FallbackBoundary>
                </ListItem>
              </Collapse>
            ))}
          </TransitionGroup>
        </List>
      </InfiniteList>
    </>
  );
}

export function NodeConnectionListItem<TEdge extends SolverEdge>({
  edgeType,
  tail,
  edge,
  children,
}: {
  edgeType: EdgeType<TEdge>;
  tail: SolverNode;
  edge: TEdge;
  children: React.ReactNode;
}) {
  const node = useNode(edge.headId);

  let href = `${tail.meta.slug}/${edgeType.connectionName}/${node.meta.slug}`;
  switch (edgeType.name) {
    case 'BlockHasLog': {
      href = `${tail.meta.slug}/transactions/${(node as Log).data.transactionIndex}/${
        edgeType.connectionName
      }/${node.meta.slug}`;
    }
  }

  return (
    <ListItemButton href={href}>
      <ListItemAvatar>
        <NodeAvatar node={node} />
      </ListItemAvatar>
      {children}
    </ListItemButton>
  );
}
