import type { Block, Chain } from '@/lib-solver';
import { Avatar, Divider, Link, Stack, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { FormattedNumber, FormattedRelativeTime } from 'react-intl';

import { useNow } from '../viewer/viewer';
import { useNode } from '../helpers/hooks';

export default function BlockOverview({ node }: { node: Block }) {
  const chain = useNode<Chain>(node.chainId);
  const timestamp = DateTime.fromMillis(node.timestamp * 1000);
  const now = useNow();

  return (
    <Stack divider={<Divider />}>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Chain</Typography>
        {/* <Typography>{chain.meta.name}</Typography> */}
        <Avatar src={`/statics/${chain.data.chainId}.svg`} alt={chain.meta.name}>
          {chain.meta.name
            .split(' ')
            .map((word) => word[0])
            .join('')}
        </Avatar>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Hash</Typography>
        <Typography>{node.hash}</Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Number</Typography>
        <Typography>{<FormattedNumber value={node.number} />}</Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Gas Used</Typography>
        <Typography>{<FormattedNumber value={node.gasUsed} />}</Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Size</Typography>
        <Typography>
          {<FormattedNumber value={node.size} style="unit" unit="byte" unitDisplay="narrow" />}
        </Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Timestamp</Typography>
        <Typography>
          <FormattedRelativeTime
            value={timestamp.diff(now).as('seconds')}
            unit="second"
            style="narrow"
          />
        </Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Miner</Typography>
        <Typography>
          {<Link href={`https://etherscan.io/address/${node.miner}`}>{node.miner}</Link>}
        </Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Parent</Typography>
        <Typography>
          {
            // TODO: Wrong link
            <Link href={`/block/${node.parentId}`}>
              <FormattedNumber value={node.number - 1} />
            </Link>
          }
        </Typography>
      </Stack>
    </Stack>
  );
}
