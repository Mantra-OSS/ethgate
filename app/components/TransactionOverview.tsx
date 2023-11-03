import type { Transaction } from '@ethgate/lib-solver';
import { Divider, Link, Stack, Typography } from '@mui/material';
import { FormattedNumber } from 'react-intl';

export default function TransactionOverview({ node }: { node: Transaction }) {
  return (
    <Stack divider={<Divider />}>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Transaction Hash</Typography>
        <Typography>{node.hash}</Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Transaction Index</Typography>
        <Typography>{<FormattedNumber value={node.transactionIndex} />}</Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>From Address</Typography>
        <Typography>{<Link href={`/address/${node.from}`}>{node.from}</Link>}</Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>To Address</Typography>
        <Typography>{<Link href={`/address/${node.to}`}>{node.to}</Link>}</Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Gas</Typography>
        <Typography>{<FormattedNumber value={node.gas} />}</Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Gas Price</Typography>
        <Typography>{<FormattedNumber value={node.gasPrice} />}</Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Input</Typography>
        <Typography>{node.input}</Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Value</Typography>
        <Typography>{<FormattedNumber value={parseInt(node.value, 16)} />}</Typography>
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
