import type { Block, Chain, Log, Transaction } from '@/lib-solver';
import { Avatar, Card, CardContent, Link, ListItemText, Stack, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { FormattedRelativeTime } from 'react-intl';

import { useNode } from '../helpers/hooks';
import { useNow } from '../viewer';

import { NodeAvatar } from './ui';

export function BlockLogListItem({ logId }: { logId: Log['id'] }) {
  const node = useNode<Log>(logId);
  return (
    <ListItemText>
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Stack direction="column">
          <Typography>Tx Index: {node.transactionIndex}</Typography>
          <Typography>
            Tx Hash: {node.transactionHash.slice(0, 6)}...
            {node.transactionHash.slice(-6)}
          </Typography>
        </Stack>
        <Stack direction="column">
          <Typography>
            Address: {node.address.slice(0, 6)}...{node.address.slice(-6)}
          </Typography>
          <Typography>Topics Count: {node.topics.length}</Typography>
        </Stack>
        <Typography>Removed: {node.removed.toString()}</Typography>
      </Stack>
    </ListItemText>
  );
}
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
export function ChainTransactionListItem({ transactionId }: { transactionId: Transaction['id'] }) {
  const node = useNode<Transaction>(transactionId);
  const block = useNode<Block>(node.blockId);
  const chain = useNode<Chain>(node.chainId);

  const timestamp = DateTime.fromMillis(block.timestamp * 1000);
  const now = useNow();

  return (
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
  );
}
export function ChainChainListItem({ chainId }: { chainId: Chain['id'] }) {
  const node = useNode<Chain>(chainId);

  return (
    <Card
      variant="outlined"
      sx={{
        width: '400px',
        margin: { sm: 1, md: 1, lg: 1, xl: 1 },
      }}
    >
      <CardContent>
        <Stack direction="row" gap={1}>
          <Avatar alt={node.meta.name} src={`/statics/${node.data.chainId}.svg`}>
            {node.meta.name
              .split(' ')
              .map((word) => word[0])
              .join('')}
          </Avatar>
          <Link href={`/${node.meta.slug}`}>
            <Typography>{node.meta.name}</Typography>
          </Link>
        </Stack>
        <Stack direction="column">
          <Stack direction="row" justifyContent="space-between" mt={1}>
            <Typography textAlign={'left'} fontWeight={'bold'}>
              Info Url :
            </Typography>
            <Link href={node.data.extra.meta.url}>
              <Typography textAlign={'right'}>{node.data.extra.meta.url}</Typography>
            </Link>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography textAlign={'left'} fontWeight={'bold'}>
              Native Coin :
            </Typography>
            <Typography textAlign={'right'}>{node.data.extra.currency.symbol}</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export function ReceiptLogListItem({ logId }: { logId: Log['id'] }) {
  const node = useNode<Log>(logId);

  return (
    <Card
      variant="outlined"
      sx={{
        width: '300px',
        margin: { sm: 1, md: 1, lg: 1, xl: 1 },
      }}
    >
      <CardContent>
        <Stack direction="row" gap={1}>
          <NodeAvatar node={node} />
          <Link href={`${node.transactionIndex}/logs/${node.logIndex}`}>
            <Typography>Log Id: {node.meta.name}</Typography>
          </Link>
        </Stack>
        <Stack direction="column" width="100%">
          <Stack direction="row" justifyContent="space-between" mt={1}>
            <Typography textAlign={'left'} fontWeight={'bold'}>
              Address :
            </Typography>
            <Typography textAlign={'right'}>
              {node.address.slice(0, 6)}...{node.address.slice(-6)}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography textAlign={'left'} fontWeight={'bold'}>
              Topics Count :
            </Typography>
            <Typography textAlign={'right'}>{node.topics.length}</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
