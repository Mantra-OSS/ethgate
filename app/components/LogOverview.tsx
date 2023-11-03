import type { Log } from '@ethgate/lib-solver';
import { Divider, Link, Stack, Typography } from '@mui/material';
import { FormattedNumber } from 'react-intl';

export default function LogOverview({ node }: { node: Log }) {
  return (
    <Stack divider={<Divider />}>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Transaction Hash</Typography>
        <Typography>{node.transactionHash}</Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Transaction Index</Typography>
        <Typography>{<FormattedNumber value={node.transactionIndex} />}</Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Log Index</Typography>
        <Typography>{<FormattedNumber value={node.logIndex} />}</Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Address</Typography>
        <Typography>{<Link href={`/address/${node.address}`}>{node.address}</Link>}</Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Data</Typography>
        <Typography>{JSON.stringify(node.data)}</Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Block Hash</Typography>
        <Typography>{node.blockHash}</Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Block Number</Typography>
        <Typography>{<FormattedNumber value={node.blockNumber} />}</Typography>
      </Stack>
    </Stack>
  );
}
