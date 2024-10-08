'use client';

import { useConnection, useNode, usePagination, useSolver } from '@/app/client/backend';
import type { ConnectionBlah, Log, SolverEdge, SolverNode, Transaction } from '@/lib-solver';
import type { EdgeType } from '@/lib-solver';
import { Collapse, List, ListItem, ListItemAvatar, ListItemButton } from '@mui/material';
import { memo, useCallback, useEffect, useTransition } from 'react';
import { TransitionGroup } from 'react-transition-group';
import { FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

import InfiniteList from './InfiniteList';
import { FallbackBoundary, NodeAvatar, SuspenseFallback } from './ui';

export default function NodeConnectionList<TEdge extends SolverEdge>({
  baseHref,
  tailId,
  edgeType,
  renderItem,
  paginate,
}: {
  baseHref: string;
  tailId: SolverNode['id'];
  edgeType: EdgeType<TEdge>;
  renderItem: (edge: TEdge) => React.ReactNode;
  paginate?: boolean;
}) {
  const { edges, loadNext } = usePagination(edgeType, tailId, { first: 10 });

  // const onLoadNext = useCallback(() => {
  //   setSize((size) => size + 1);
  // }, [setSize]);

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
        loadNext={paginate && loadNext}
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
                          <NodeAvatar nodeId={edge.headId} />
                        </ListItemAvatar>
                      </ListItemButton>
                    }
                  >
                    <NodeConnectionListItem
                      baseHref={baseHref}
                      edgeType={edgeType}
                      tailId={tailId}
                      edge={edge}
                    >
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

const nodeConnectionListItemHeight: number = 22;

const NodeConnectionListItem = memo(function ConnectionListItem<TEdge extends SolverEdge>({
  baseHref,
  edgeType,
  tailId,
  edge,
  children,
}: {
  baseHref: string;
  edgeType: EdgeType<TEdge>;
  tailId: SolverNode['id'];
  edge: TEdge;
  children: React.ReactNode;
}) {
  const tail = useNode(tailId);
  const node = useNode(edge.headId);
  // console.log('tail', tail);
  // console.log('node', node);

  const prefix = `${baseHref}${tail.meta.slug}`;
  const suffix = `${edgeType.connectionName}/${node.meta.slug}`;
  let href;
  switch (edgeType.name) {
    case 'ChainHasTransaction': {
      href = `${prefix}/blocks/${(node as Transaction).data.blockNumber}/${suffix}`;
      break;
    }
    case 'BlockHasLog': {
      href = `${prefix}/transactions/${(node as Log).data.transactionIndex}/${suffix}`;
      break;
    }
    default: {
      href = `${prefix}/${suffix}`;
      break;
    }
  }

  return (
    <ListItemButton href={href}>
      <ListItemAvatar>
        <NodeAvatar nodeId={edge.headId} />
      </ListItemAvatar>
      {children}
    </ListItemButton>
  );
});
