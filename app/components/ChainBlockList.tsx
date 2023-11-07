'use client';
import type { Block, Chain } from '@/lib-solver';
import { ListItemText, Stack, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { FormattedRelativeTime } from 'react-intl';

import { useNode } from '../helpers/hooks';
import { useNow } from '../viewer/viewer';

export function ChainBlockListItem({ blockId }: { blockId: Block['id'] }) {
  const node = useNode<Block>(blockId);
  const chain = useNode<Chain>(node.chainId);

  const timestamp = DateTime.fromMillis(node.timestamp * 1000);
  const now = useNow();

  // throw new Promise(() => {});

  return (
    <ListItemText>
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Stack direction="column">
          <Typography>{node.number}</Typography>
        </Stack>
        <Stack direction="column">
          <Typography>
            Block Hash: {node.hash.slice(0, 6)} ... {node.hash.slice(-6)}
          </Typography>
          <Typography>
            Miner: {node.miner.slice(0, 6)} ... {node.miner.slice(-6)}
          </Typography>
        </Stack>
        <Stack direction="column">
          <Typography>123 txns</Typography>
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
  );
}
