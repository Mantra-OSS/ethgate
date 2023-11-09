'use client';

import { nodeSubscriptionFetcher, useConnection, useNode, useSolver } from '@/app/client/backend';
import type { ConnectionBlah, Log, SolverEdge, SolverNode } from '@/lib-solver';
import type { EdgeType } from '@/lib-solver';
import { Collapse, List, ListItem, ListItemAvatar, ListItemButton } from '@mui/material';
import { memo, useCallback, useEffect, useTransition } from 'react';
import { TransitionGroup } from 'react-transition-group';
import { FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

import InfiniteList from './InfiniteList';
import { FallbackBoundary, NodeAvatar, SuspenseFallback } from './ui';

export default function NodeConnectionList<TEdge extends SolverEdge>({
  node,
  edgeType,
  renderItem,
}: {
  node: SolverNode;
  edgeType: EdgeType<TEdge>;
  renderItem: (edge: TEdge) => React.ReactNode;
}) {
  const { data, error, isLoading, isValidating, mutate, size, setSize } = useConnection(
    edgeType,
    node,
  );
  const pages = data ?? [];
  const lastPage = pages[pages.length - 1];
  const edges = pages.flatMap((page) => page.edges);

  const onLoadNext = useCallback(() => {
    setSize((size) => size + 1);
  }, [setSize]);

  const itemCount = edges.length + 1;

  return (
    <>
      {/* <InfiniteLoader
        isItemLoaded={(index) => index < edges.length}
        itemCount={itemCount}
        loadMoreItems={onLoadNext}
      >
        {({ onItemsRendered, ref }) => (
          <List ref={ref}>
            <FixedSizeList
              itemCount={itemCount}
              onItemsRendered={onItemsRendered}
              ref={ref}
              height={400}
              width={300}
              itemSize={55}
              itemData={edges}
            >
              {({ index, style }) => {
                const edge = edges[index];
                if (!edge) {
                  return (
                    <ListItem dense disablePadding style={style}>
                      <ListItemButton>
                        <ListItemAvatar>
                          <NodeAvatar node={node} />
                        </ListItemAvatar>
                      </ListItemButton>
                    </ListItem>
                  );
                }
                // console.log(index);
                return (
                  <ListItem dense disablePadding style={style}>
                    <Collapse key={edge.headId}>
                    <FallbackBoundary
                      suspenseFallback={
                        <ListItemButton>
                          <ListItemAvatar>
                            <NodeAvatar node={node} />
                          </ListItemAvatar>
                        </ListItemButton>
                      }
                    >
                      <NodeConnectionListItem edgeType={edgeType} tail={node} edge={edge}>
                        {renderItem(edge as any)}
                      </NodeConnectionListItem>
                    </FallbackBoundary>
                    </Collapse>
                  </ListItem>
                );
              }}
            </FixedSizeList>
          </List>
        )}
      </InfiniteLoader> */}
      <InfiniteList
        // loadPrevious={hasPrevious && onLoadPrevious}
        loadNext={lastPage.pageInfo.hasNextPage && onLoadNext}
      >
        <List>
          <TransitionGroup>
            {edges.map((edge) => (
              <Collapse key={edge.headId}>
                <ListItem dense disablePadding>
                  <FallbackBoundary
                    suspenseFallback={
                      <ListItemButton>
                        <ListItemAvatar>
                          <NodeAvatar node={node} />
                        </ListItemAvatar>
                      </ListItemButton>
                    }
                  >
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

const NodeConnectionListItem = memo(function NodeConnectionListItem<TEdge extends SolverEdge>({
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
});
