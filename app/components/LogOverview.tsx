import type { Log, Chain } from '@/lib-solver';
import { Avatar, Divider, Link, Stack, Typography } from '@mui/material';
import { FormattedNumber } from 'react-intl';
import { useNode } from '../helpers/hooks';

export default function LogOverview({ node }: { node: Log }) {
  const chain = useNode<Chain>(node.chainId);
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
