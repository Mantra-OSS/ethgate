'use client';

import { useNode } from '@/app/helpers/hooks';
import type { Transaction } from '@/lib-solver';
import { ListItemText, Typography } from '@mui/material';

export function BlockTransactionListItem({ transactionId }: { transactionId: Transaction['id'] }) {
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
