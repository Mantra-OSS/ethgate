'use client';

import { useNode } from '@/app/helpers/hooks';
import type { Block, BlockHasTransaction, Transaction } from '@/lib-solver';
import {
  Avatar,
  Collapse,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { useCallback, useTransition } from 'react';
import { TransitionGroup } from 'react-transition-group';

import InfiniteList from '../components/InfiniteList';
import { useConnection } from '../helpers/hooks';

import { NodeList, NodeListItem } from './NodeList';

import { NodeAvatar } from './ui';
import { useSolver } from '../client/backend';

export default function BlockTransactionList({ block: tail }: { block: Block }) {
  const solver = useSolver();
  const edgeType = solver.solver.graph.getEdgeType('BlockHasTransaction');

  const [, startTransition] = useTransition();

  const [transactions, loadNext] = useConnection<BlockHasTransaction>(edgeType.name, tail.id, {
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
        loadNext={transactions?.pageInfo.hasNextPage && onLoadNext}
      >
        <NodeList>
          {transactions?.edges.map(({ headId }) => (
            <Collapse key={headId}>
              <NodeListItem>
                <BlockTransactionListItem transactionId={headId} />
              </NodeListItem>
            </Collapse>
          ))}
        </NodeList>
      </InfiniteList>
    </>
  );
}

export function BlockTransactionListItem({ transactionId }: { transactionId: Transaction['id'] }) {
  console.log('BlockTransactionListItem', transactionId);
  const node = useNode<Transaction>(transactionId);

  return (
    <ListItemButton href={`${node.blockNumber}/transactions/${node.transactionIndex}`}>
      <ListItemAvatar>
        {/* <Avatar alt={node.meta.name}>{node.meta.name.slice(0, 1)}</Avatar> */}
        <NodeAvatar node={node} />
      </ListItemAvatar>
      <ListItemText>
        <Stack direction="row" spacing={1} justifyContent="space-between">
          <Stack direction="column">
            <Typography>
              {node.hash.slice(0, 6)}...{node.hash.slice(-6)}
            </Typography>
            <Typography>{node.blockNumber}</Typography>
          </Stack>
          <Stack direction="column">
            <Typography>
              From: {node.from.slice(0, 6)}...{node.from.slice(-6)}
            </Typography>
            <Typography>
              To: {node.to.slice(0, 6)}...{node.from.slice(-6)}
            </Typography>
          </Stack>
          <Stack direction="column">
            <Typography>{(parseInt(node.value, 16) / 10 ** 18).toFixed(2)} ETH</Typography>
          </Stack>
        </Stack>
      </ListItemText>
    </ListItemButton>
  );
}
