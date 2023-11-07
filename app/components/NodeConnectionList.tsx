'use client';

import { useNode } from '@/app/helpers/hooks';
import type { SolverEdge, SolverNode } from '@/lib-solver';
import {
  Collapse,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { useCallback, useTransition } from 'react';

import type { EdgeType } from '../../solver/graph';
import { useConnection } from '../helpers/hooks';

import InfiniteList from './InfiniteList';
import { NodeList, NodeListItem } from './NodeList';
import { NodeAvatar } from './ui';

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

  const [connection, loadNext] = useConnection(edgeType.name, node.id, {
    first: 10,
  });
  const onLoadNext = useCallback(() => {
    startTransition(() => {
      loadNext();
    });
  }, [loadNext]);

  return (
    <>
      <InfiniteList
        // loadPrevious={hasPrevious && onLoadPrevious}
        loadNext={connection?.pageInfo.hasNextPage && onLoadNext}
      >
        <NodeList>
          {connection?.edges.map((edge) => (
            <Collapse key={edge.headId}>
              <NodeListItem>
                <NodeConnectionListItem edgeType={edgeType} tail={node} edge={edge}>
                  {renderItem(edge)}
                </NodeConnectionListItem>
              </NodeListItem>
            </Collapse>
          ))}
        </NodeList>
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

  return (
    <ListItemButton href={`${tail.meta.slug}/${edgeType.connectionName}/${node.meta.slug}`}>
      <ListItemAvatar>
        <NodeAvatar node={node} />
      </ListItemAvatar>
      {children}
    </ListItemButton>
  );
}
