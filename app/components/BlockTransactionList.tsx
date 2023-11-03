import type { Block, BlockHasTransaction, Transaction } from '@ethgate/lib-solver';
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

import InfiniteList from '../components/InfiniteList.js';
import { useConnection, useNode } from '../helpers/backend.js';

export default function BlockTransactionList({ block }: { block: Block }) {
  const [, startTransition] = useTransition();

  const [transactions, hasNext, loadNext] = useConnection<BlockHasTransaction>(
    'BlockHasTransaction',
    block.id,
    {
      // TODO: Paginate
      first: 10,
    },
  );
  const onLoadNext = useCallback(() => {
    startTransition(() => {
      loadNext(3);
    });
  }, [loadNext]);

  return (
    <>
      <InfiniteList
        // loadPrevious={hasPrevious && onLoadPrevious}
        loadNext={hasNext && onLoadNext}
      >
        <TransitionGroup>
          {transactions.edges.map(({ headId }) => (
            <Collapse key={headId}>
              <ListItem>
                <BlockTransactionListItem transactionId={headId} />
              </ListItem>
            </Collapse>
          ))}
        </TransitionGroup>
      </InfiniteList>
    </>
  );
}

export function BlockTransactionListItem({ transactionId }: { transactionId: Transaction['id'] }) {
  const node = useNode<Transaction>(transactionId);

  return (
    <ListItemButton href={`tx/${node.transactionIndex}`}>
      <ListItemAvatar>
        <Avatar alt={node.meta.name}>{node.meta.name.slice(0, 1)}</Avatar>
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
