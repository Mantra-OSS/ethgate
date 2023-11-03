import type { Block } from '@ethgate/lib-solver';
import { Divider, Link, Stack, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { FormattedNumber, FormattedRelativeTime } from 'react-intl';

import { useNow } from '../viewer/viewer';

export default function BlockOverview({ node }: { node: Block }) {
  const timestamp = DateTime.fromMillis(node.timestamp * 1000);
  const now = useNow();

  return (
    <Stack divider={<Divider />}>
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
