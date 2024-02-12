import { useNode2 } from '@/app/client/backend';
import type { Receipt } from '@/lib-solver';
import {
  type Block,
  type Chain,
  ChainHasBlock,
  type Log,
  SolverNode,
  type Transaction,
} from '@/lib-solver';
import { Avatar, Divider, Link, Skeleton, Stack, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import { green, red } from '@mui/material/colors';
import { DateTime } from 'luxon';
import { FormattedNumber, FormattedRelativeTime } from 'react-intl';
// import { graphql, useLazyLoadQuery } from 'react-relay';

import { useNow } from './now';
import { FallbackBoundary, NodeAvatar } from './ui';

export const overviewComponents = {
  Chain: ChainOverview,
  Block: BlockOverview,
  Transaction: TransactionOverview,
  Receipt: ReceiptOverview,
  Log: LogOverview,
};

export function ChainOverview({ node }: { node: Chain }) {
  return (
    <>
      <Stack
        direction={{ md: 'row', xs: 'column' }}
        spacing={1}
        justifyContent="center"
        padding={2}
      >
        <Chip label={`Chain ID: ${node.data.extra.chainId}`} variant="outlined" />
        <Chip label={`Native Currency: ${node.data.extra.currency.symbol}`} variant="outlined" />
        <Chip
          label={`Web Page: ${node.data.extra.meta.url}`}
          variant="outlined"
          component="a"
          href={node.data.extra.meta.url}
          target="_blank"
          clickable
        />
        {node.data.parent &&
          node.data.parent.bridges.length > 0 &&
          node.data.parent.bridges.map((bridge, index) => (
            <Chip
              key={index}
              label={`Bridge: ${bridge.url}`}
              variant="outlined"
              component="a"
              href={bridge.url}
              target="_blank"
              clickable
            />
          ))}
      </Stack>
    </>
  );
}

export function ChainRow({ chainId }: { chainId: Chain['id'] }) {
  const chain = useNode2<Chain>(chainId);

  return (
    <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
      <Typography>Chain</Typography>
      {chain ? (
        <Link href={`/${chain.meta.slug}`}>
          <NodeAvatar nodeId={chain.id} />
        </Link>
      ) : (
        <Skeleton width={300} />
      )}
    </Stack>
  );
}

export function BlockRow({ blockId }: { blockId: Block['id'] }) {
  const block = useNode2<Block>(blockId);
  const chain = useNode2<Chain>(block?.chainId ?? null);

  return (
    <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
      <Typography>Block</Typography>
      {block && chain ? (
        <Link href={`/${chain.meta.slug}/blocks/${block.data.number}`}>
          <Typography>
            <FormattedNumber value={block.data.number} />
          </Typography>
        </Link>
      ) : (
        <Skeleton width={300} />
      )}
    </Stack>
  );
}

export function ReceiptRow({ receiptId }: { receiptId: Receipt['id'] }) {
  const receipt = useNode2<Receipt>(receiptId);
  const transaction = useNode2<Transaction>(receipt?.transactionId ?? null);
  const block = useNode2<Block>(receipt?.blockId ?? null);
  const chain = useNode2<Chain>(receipt?.chainId ?? null);

  return (
    <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
      <Typography>Transaction</Typography>
      {receipt && transaction && block && chain ? (
        <Link
          href={`/${chain.meta.slug}/blocks/${block.meta.slug}/transactions/${transaction.meta.slug}`}
        >
          <Typography whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
            {receipt.data.transactionHash}
          </Typography>
        </Link>
      ) : (
        <Skeleton width={300} />
      )}
    </Stack>
  );
}

export function BlockOverview({ node }: { node: Block }) {
  const timestamp = DateTime.fromMillis(node.data.timestamp * 1000);
  const now = useNow();

  return (
    <Stack divider={<Divider />}>
      <ChainRow chainId={node.chainId} />
      <Stack
        width="100%"
        direction={{ md: 'row', xs: 'column' }}
        padding={2}
        justifyContent="space-between"
      >
        <Typography>Block Hash</Typography>
        <Typography whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
          {node.data.hash}
        </Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Block Number</Typography>
        <Typography>
          <FormattedNumber value={node.data.number} />
        </Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Parent Block</Typography>
        <Typography>
          <Link href={`${node.data.number - 1}`}>
            <FormattedNumber value={node.data.number - 1} />
          </Link>
        </Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Gas Used</Typography>
        <Typography>
          <FormattedNumber value={node.data.gasUsed} />
        </Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Gas Limit</Typography>
        <Typography>
          <FormattedNumber value={node.data.gasLimit} />
        </Typography>
      </Stack>
      {/* <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Logs Bloom</Typography>
        <Typography
          textAlign={'right'}
          dangerouslySetInnerHTML={{ __html: node.data.logsBloom.replace(/(.{20})/g, '$1<wbr />') }}
        />
      </Stack> */}
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Size</Typography>
        <Typography>
          <FormattedNumber value={node.data.size} style="unit" unit="byte" unitDisplay="narrow" />
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
      <Stack
        width="100%"
        direction={{ md: 'row', xs: 'column' }}
        padding={2}
        justifyContent="space-between"
      >
        <Typography whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
          Miner
        </Typography>
        <Typography>
          <Link href={`https://etherscan.io/address/${node.data.miner}`}>{node.data.miner}</Link>
        </Typography>
      </Stack>
    </Stack>
  );
}

export function TransactionOverview({ node }: { node: Transaction }) {
  const receipt = useNode2<Receipt>(node.receiptId);

  return (
    <Stack divider={<Divider />}>
      <ChainRow chainId={node.chainId} />
      <BlockRow blockId={node.blockId} />
      <Stack
        width="100%"
        direction={{ md: 'row', xs: 'column' }}
        padding={2}
        justifyContent="space-between"
      >
        <Typography>Transaction Hash</Typography>
        <Typography whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
          {node.data.hash}
        </Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Transaction Index</Typography>
        <Typography>{<FormattedNumber value={node.data.transactionIndex} />}</Typography>
      </Stack>
      <Stack
        width="100%"
        direction={{ md: 'row', xs: 'column' }}
        padding={2}
        justifyContent="space-between"
      >
        <Typography>From Address</Typography>
        <Typography whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
          {<Link href={`https://etherscan.io/address/${node.data.from}`}>{node.data.from}</Link>}
        </Typography>
      </Stack>
      <Stack
        width="100%"
        direction={{ md: 'row', xs: 'column' }}
        padding={2}
        justifyContent="space-between"
      >
        <Typography>To Address</Typography>
        <Typography whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
          {node.data.to ? (
            <Link href={`https://etherscan.io/address/${node.data.to}`}>{node.data.to}</Link>
          ) : (
            'Contract Creation'
          )}
        </Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Gas</Typography>
        <Typography>{<FormattedNumber value={node.data.gas} />}</Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Gas Price</Typography>
        <Typography>{<FormattedNumber value={node.data.gasPrice} />}</Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Input</Typography>
        <Typography
          textAlign={'right'}
          dangerouslySetInnerHTML={{ __html: node.data.input.replace(/(.{30})/g, '$1<wbr />') }}
        />
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Value</Typography>
        <Typography>{<FormattedNumber value={parseInt(node.data.value, 16)} />}</Typography>
      </Stack>
      {receipt && <ReceiptOverview receipt={receipt} />}
    </Stack>
  );
}

export function ReceiptOverview({ receipt: node }: { receipt: Receipt }) {
  return (
    <Stack divider={<Divider />}>
      <ChainRow chainId={node.chainId} />
      <BlockRow blockId={node.blockId} />
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Gas Used</Typography>
        <Typography>{<FormattedNumber value={node.data.gasUsed} />}</Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Cumulative Gas Used</Typography>
        <Typography>{<FormattedNumber value={node.data.cumulativeGasUsed} />}</Typography>
      </Stack>
      {/* <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Logs Bloom</Typography>
        <Typography
          textAlign={'right'}
          dangerouslySetInnerHTML={{ __html: node.data.logsBloom.replace(/(.{30})/g, '$1<wbr />') }}
        />
      </Stack> */}
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Status</Typography>
        <Typography bgcolor={parseInt(node.data.status, 16) ? green[700] : red[700]} paddingX={1}>
          {parseInt(node.data.status, 16) ? 'Success' : 'Failed'}
        </Typography>
      </Stack>
    </Stack>
  );
}

export function LogOverview({ node }: { node: Log }) {
  return (
    <Stack divider={<Divider />}>
      <ChainRow chainId={node.chainId} />
      <BlockRow blockId={node.blockId} />
      <ReceiptRow receiptId={node.receiptId} />
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Log Index</Typography>
        <Typography>{<FormattedNumber value={node.data.logIndex} />}</Typography>
      </Stack>
      <Stack
        width="100%"
        direction={{ md: 'row', xs: 'column' }}
        padding={2}
        justifyContent="space-between"
      >
        <Typography>Address</Typography>
        <Link href={`https://etherscan.io/address/${node.data.address}`}>
          <Typography whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
            {node.data.address}
          </Typography>
        </Link>
      </Stack>
      <Stack
        width="100%"
        direction={{ md: 'row', xs: 'column' }}
        padding={2}
        justifyContent="space-between"
      >
        <Typography>Topics</Typography>
        <Typography
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          textAlign={'right'}
          dangerouslySetInnerHTML={{ __html: node.data.topics.join('<br />') }}
        />
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Data</Typography>
        <Typography
          textAlign={'right'}
          dangerouslySetInnerHTML={{ __html: node.data.data.replace(/(.{30})/g, '$1<wbr />') }}
        />
      </Stack>
    </Stack>
  );
}
