'use client';

import { useNode } from '@/app/helpers/hooks';
import type { Block, Chain, Transaction } from '@/lib-solver';
import { ListItemAvatar, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { FormattedRelativeTime } from 'react-intl';

import { useNow } from '../viewer/viewer';

import { NodeAvatar } from './ui';

export function ChainTransactionListItem({ transactionId }: { transactionId: Transaction['id'] }) {
  const node = useNode<Transaction>(transactionId);
  const block = useNode<Block>(node.blockId);
  const chain = useNode<Chain>(node.chainId);

  const timestamp = DateTime.fromMillis(block.timestamp * 1000);
  const now = useNow();

  return (
    <ListItemButton
      href={`${node.data.chainId}/blocks/${node.blockNumber}/transactions/${node.transactionIndex}`}
    >
      <ListItemAvatar>
        <NodeAvatar node={node} />
      </ListItemAvatar>
      <ListItemText>
        <Stack direction="row" spacing={1} justifyContent="space-between">
          <Stack direction="column">
            <Typography>
              {node.hash.slice(0, 4)}...{node.hash.slice(-4)}
            </Typography>
            <Typography>{node.blockNumber}</Typography>
          </Stack>
          <Stack direction="column">
            <Typography>
              From: {node.from.slice(0, 4)}...{node.from.slice(-4)}
            </Typography>
            <Typography>
              To: {node.to.slice(0, 4)}...{node.from.slice(-4)}
            </Typography>
          </Stack>
          <Stack direction="column">
            <Typography>{(parseInt(node.value, 16) / 10 ** 18).toFixed(2)} ETH</Typography>
            <Typography variant="caption">
              <FormattedRelativeTime
                value={timestamp.diff(now).as('seconds')}
                unit="second"
                style="narrow"
              />
            </Typography>
          </Stack>
        </Stack>
      </ListItemText>
    </ListItemButton>
  );
}
