import { useNode } from '@/app/client/backend';
import type { Block, Chain, Log, Transaction } from '@/lib-solver';
import { Link, ListItemText, Stack, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { FormattedRelativeTime } from 'react-intl';

import { useNow } from '../viewer';

export function ChainListItem({ chainId }: { chainId: Chain['id'] }) {
  const node = useNode<Chain>(chainId);

  return (
    <ListItemText>
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Link href={`/${node.meta.slug}`}>
          <Typography>{node.meta.name}</Typography>
        </Link>
        <Stack direction="column">
          {/* // TODO: Maybe we use target="_blank" here? But Link doesn't support it. */}
          <Link href={node.data.extra.meta.url}>
            <Typography>{node.data.extra.meta.url}</Typography>
          </Link>
          <Typography>Native Coin: {node.data.extra.currency.symbol}</Typography>
        </Stack>
      </Stack>
    </ListItemText>
  );
}

export function BlockListItem({ blockId }: { blockId: Block['id'] }) {
  const node = useNode<Block>(blockId);

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
            Block Hash: {node.hash.slice(0, 4)}...{node.hash.slice(-4)}
          </Typography>
          <Typography>
            Miner: {node.miner.slice(0, 4)}...{node.miner.slice(-4)}
          </Typography>
        </Stack>
        <Stack direction="column">
          <Typography>{node.transactions.length} txns</Typography>
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

export function TransactionListItem({ transactionId }: { transactionId: Transaction['id'] }) {
  const node = useNode<Transaction>(transactionId);
  const block = useNode<Block>(node.blockId);

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

export function LogListItem({ logId }: { logId: Log['id'] }) {
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
