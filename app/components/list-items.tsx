import { useNode } from '@/app/client/backend';
import type { Block, Chain, Log, Transaction } from '@/lib-solver';
import { Link, ListItemText, Stack, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { FormattedRelativeTime } from 'react-intl';

import { useNow } from './now';
import { FormattedHex } from './ui';

export const listItemComponents = {
  ChainHasChain: ChainListItem,
  ChainHasDescendantBlock: BlockListItem,
  ChainHasBlock: BlockListItem,
  ChainHasTransaction: TransactionListItem,
  BlockHasTransaction: TransactionListItem,
  BlockHasLog: LogListItem,
  TransactionHasLog: LogListItem,
};

export function ChainListItem({ nodeId: chainId }: { nodeId: Chain['id'] }) {
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

export function BlockListItem({ nodeId: blockId }: { nodeId: Block['id'] }) {
  const node = useNode<Block>(blockId);

  const timestamp = DateTime.fromMillis(node.data.timestamp * 1000);
  const now = useNow();

  return (
    <ListItemText>
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Stack direction="column" flex={1}>
          <Typography>{node.data.number}</Typography>
        </Stack>
        <Stack direction="column" flex={2}>
          <Typography>
            Block Hash: <FormattedHex value={node.data.hash} />
          </Typography>
          <Typography>
            Miner: <FormattedHex value={node.data.miner} />
          </Typography>
        </Stack>
        <Stack direction="column" flex={1} textAlign="right">
          <Typography>{node.data.transactions.length} txns</Typography>
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

export function TransactionListItem({ nodeId: transactionId }: { nodeId: Transaction['id'] }) {
  const node = useNode<Transaction>(transactionId);
  const block = useNode<Block>(node.blockId);

  const timestamp = DateTime.fromMillis(block.data.timestamp * 1000);
  const now = useNow();

  return (
    <ListItemText>
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Stack direction="column" flex={1}>
          <Typography>
            <FormattedHex value={node.data.hash} />
          </Typography>
          <Typography>{node.data.blockNumber}</Typography>
        </Stack>
        <Stack direction="column" flex={2}>
          <Typography>
            From: <FormattedHex value={node.data.from} />
          </Typography>
          <Typography>
            To:
            {node.data.to && <FormattedHex value={node.data.to} />}
          </Typography>
        </Stack>
        <Stack direction="column" flex={1} textAlign="right">
          <Typography>{(parseInt(node.data.value, 16) / 10 ** 18).toFixed(2)} ETH</Typography>
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

export function LogListItem({ nodeId: logId }: { nodeId: Log['id'] }) {
  const node = useNode<Log>(logId);
  return (
    <ListItemText>
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Stack direction="column" flex={1}>
          <Typography>Tx Index: {node.data.transactionIndex}</Typography>
          <Typography>
            Tx Hash: <FormattedHex value={node.data.transactionHash} />
          </Typography>
        </Stack>
        <Stack direction="column" flex={1}>
          <Typography>
            Address: <FormattedHex value={node.data.address} />
          </Typography>
          <Typography>Topics Count: {node.data.topics.length}</Typography>
        </Stack>
      </Stack>
    </ListItemText>
  );
}
