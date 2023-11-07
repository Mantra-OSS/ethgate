'use client';

import { useNode } from '@/app/helpers/hooks';
import type { Block, SolverEdge, Transaction } from '@/lib-solver';
import { ListItemAvatar, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';

import type { EdgeType } from '../../solver/graph';

import NodeConnectionList from './NodeConnectionList';
import { NodeAvatar } from './ui';

export function BlockTransactionListItem({ transactionId }: { transactionId: Transaction['id'] }) {
  console.log('BlockTransactionListItem', transactionId);
  const node = useNode<Transaction>(transactionId);

  return (
    <>
      <ListItemText>
        <Typography>
          {node.hash.slice(0, 6)}...{node.hash.slice(-6)}
        </Typography>
        <Typography>{node.blockNumber}</Typography>
      </ListItemText>
      <ListItemText>
        <Typography>
          From: {node.from.slice(0, 6)}...{node.from.slice(-6)}
        </Typography>
        <Typography>
          To: {node.to.slice(0, 6)}...{node.from.slice(-6)}
        </Typography>
      </ListItemText>
      <ListItemText>
        <Typography>{(parseInt(node.value, 16) / 10 ** 18).toFixed(2)} ETH</Typography>
      </ListItemText>
    </>
  );
}
