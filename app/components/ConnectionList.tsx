'use client';

import type { ConnectionList_node$key } from '@/__generated__/ConnectionList_node.graphql';
import { useConnection, useNode, useSolver } from '@/app/client/backend';
import type { ConnectionPage, Log, SolverEdge, SolverNode, Transaction } from '@/lib-solver';
import type { EdgeType } from '@/lib-solver';
import {
  Collapse,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Skeleton,
  Stack,
} from '@mui/material';
import { Fragment, memo, useCallback, useEffect, useTransition } from 'react';
import { useFragment } from 'react-relay';
import { TransitionGroup } from 'react-transition-group';
import { FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { graphql } from 'relay-runtime';

import InfiniteList from './InfiniteList';
import { FallbackBoundary, NodeAvatar2, SuspenseFallback } from './ui';

export const connectionListFragment = graphql`
  fragment ConnectionList_node on Node {
    id
    meta {
      slug
    }
  }
`;

export default function ConnectionList<TEdge extends SolverEdge>({
  node: nodeFragment,
  baseHref,
  edgeType,
  renderItem,
  paginate,
}: {
  node: ConnectionList_node$key;
  baseHref: string;
  edgeType: EdgeType<TEdge>;
  renderItem: (edge: TEdge) => React.ReactNode;
  paginate?: boolean;
}) {
  const node = useFragment(connectionListFragment, nodeFragment);
  const {
    data: pageData,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useConnection(edgeType, node.id, { first: 10 });
  const pages = pageData ? [pageData] : [];
  const lastPage = pages[pages.length - 1];
  const edges = pages.flatMap((page) => page.edges);

  // const onLoadNext = useCallback(() => {
  //   setSize((size) => size + 1);
  // }, [setSize]);

  // const itemCount = edges.length + 1;

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
      // loadNext={paginate && loadNext}
      >
        <List>
          <TransitionGroup>
            {edges.map((edge) => (
              <Collapse key={edge.headId}>
                {/* <Fragment key={edge.headId}> */}
                <ListItem dense disablePadding>
                  <FallbackBoundary
                    suspenseFallback={
                      <ListItemButton>
                        <ListItemAvatar>
                          <NodeAvatar2 nodeId={edge.headId} />
                        </ListItemAvatar>
                        <ListItemText>
                          <Stack direction="row" spacing={1} justifyContent="space-between">
                            <Stack direction="column" flex={1}>
                              <Skeleton width={100} />
                            </Stack>
                          </Stack>
                        </ListItemText>
                      </ListItemButton>
                    }
                  >
                    <ConnectionListItem
                      baseHref={baseHref}
                      edgeType={edgeType}
                      tailId={node.id}
                      edge={edge}
                    >
                      {renderItem(edge as any)}
                    </ConnectionListItem>
                  </FallbackBoundary>
                </ListItem>
                {/* </Fragment> */}
              </Collapse>
            ))}
          </TransitionGroup>
        </List>
      </InfiniteList>
    </>
  );
}

const connectionListItemHeight: number = 22;

const ConnectionListItem = memo(function ConnectionListItem<TEdge extends SolverEdge>({
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
  switch (edgeType.typeName) {
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
        <NodeAvatar2 nodeId={edge.headId} />
      </ListItemAvatar>
      {children}
    </ListItemButton>
  );
});
