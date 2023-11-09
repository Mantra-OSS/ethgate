import { useNode } from '@/app/client/backend';
import type { Block, Chain, Log, Receipt, Transaction } from '@/lib-solver';
import { Avatar, Divider, Link, Stack, Typography } from '@mui/material';
import { green, red } from '@mui/material/colors';
import { AnimatedAxis, AnimatedGrid, AnimatedLineSeries, Tooltip, XYChart } from '@visx/xychart';
import { DateTime } from 'luxon';
import { FormattedNumber, FormattedRelativeTime } from 'react-intl';

import { useNow } from '../viewer/viewer';

export function ChainOverview({ node }: { node: Chain }) {
  /*   const data1 = [
    { x: '2020-01-01', y: 50 },
    { x: '2020-01-02', y: 10 },
    { x: '2020-01-03', y: 20 },
  ];

  const data2 = [
    { x: '2020-01-01', y: 30 },
    { x: '2020-01-02', y: 40 },
    { x: '2020-01-03', y: 80 },
  ];

  const accessors = {
    xAccessor: (d: any) => d.x,
    yAccessor: (d: any) => d.y,
  }; */

  return (
    <>
      <Stack direction="column" padding={2} spacing={2} divider={<Divider />}>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Chain Name</Typography>
          <Typography>{node.meta.name}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Chain ID</Typography>
          <Typography>{node.data.chainId}</Typography>
        </Stack>
        {Object.keys(node).includes('parentId') && (
          <ParentChainOverview chainId={node.parentId as Chain['id']} />
        )}
      </Stack>
      {/*       <XYChart height={300} xScale={{ type: 'band' }} yScale={{ type: 'linear' }}>
        <AnimatedAxis orientation="bottom" />
        <AnimatedGrid columns={false} numTicks={0} />
        <AnimatedLineSeries dataKey="Line 1" data={data1} {...accessors} />
        <AnimatedLineSeries dataKey="Line 2" data={data2} {...accessors} />
        <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          showVerticalCrosshair
          showSeriesGlyphs
          renderTooltip={({ tooltipData, colorScale }: any) => (
            <div>
              <div style={{ color: colorScale(tooltipData.nearestDatum.key) }}>
                {tooltipData.nearestDatum.key}
              </div>
              {accessors.xAccessor(tooltipData.nearestDatum.datum)}
              {', '}
              {accessors.yAccessor(tooltipData.nearestDatum.datum)}
            </div>
          )}
        />
      </XYChart> */}
      {/* <ChainChart chainId={node.id} /> */}
    </>
  );
}

function ParentChainOverview({ chainId }: { chainId: Chain['id'] }) {
  const chain = useNode<Chain>(chainId);

  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography>Parent Chain</Typography>
      <Link href={`/${chain.meta.slug}`}>
        <Typography>{chain.meta.name}</Typography>
      </Link>
    </Stack>
  );
}

// function ChainChart({ chainId }: { chainId: Chain['id'] }) {
//   const [, startTransition] = useTransition();
//   const [blocks, loadNext, refetch] = useConnection<ChainHasBlock>('ChainHasBlock', chainId, {
//     first: 10,
//   });
//   const onLoadNext = useCallback(() => {
//     startTransition(() => {
//       loadNext();
//     });
//   }, [loadNext]);

//   useEffect(() => {
//     let abort = false;

//     (async () => {
//       const database = (await solverPromise).solver.database;
//       const update = await database.networkUpdates(chainId).next();
//       if (update.done) return;
//       if (abort) return;
//       startTransition(() => {
//         refetch();
//       });
//       // const { headId } = update.value;
//     })();

//     return () => {
//       abort = true;
//     };
//   });
//   /*   const data = blocks.edges.map((block) => ({
//     x: block.data.number,
//     y: block.data.transactions.length,
//   })); */
//   const data = [
//     { x: '111853870', y: 50 },
//     { x: '111853871', y: 10 },
//     { x: '111853872', y: 20 },
//     { x: '111853873', y: 42 },
//     { x: '111853874', y: 75 },
//     { x: '111853875', y: 57 },
//     { x: '111853876', y: 32 },
//   ];
//   return (
//     <>
//       <InfiniteList
//       // startSubscriptionConfig={subscriptionConfig}
//       // loadPrevious={hasPrevious && onLoadPrevious}
//       // loadNext={blocks?.pageInfo.hasNextPage && onLoadNext}
//       >
//         <Chart data={data} />
//       </InfiniteList>
//     </>
//   );
// }

function Chart({ data }: { data: any[] }) {
  const accessors = {
    xAccessor: (d: any) => d.x,
    yAccessor: (d: any) => d.y,
  };

  return (
    <XYChart height={300} xScale={{ type: 'band' }} yScale={{ type: 'linear' }}>
      <AnimatedAxis orientation="bottom" />
      <AnimatedAxis orientation="right" />
      <AnimatedGrid columns={false} numTicks={0} />
      <AnimatedLineSeries dataKey="Line 1" data={data} {...accessors} />
      <Tooltip
        snapTooltipToDatumX
        snapTooltipToDatumY
        showVerticalCrosshair
        showSeriesGlyphs
        renderTooltip={({ tooltipData, colorScale }: any) => (
          <div>
            <div style={{ color: colorScale(tooltipData.nearestDatum.key) }}>
              {tooltipData.nearestDatum.key}
            </div>
            {accessors.xAccessor(tooltipData.nearestDatum.datum)}
            {', '}
            {accessors.yAccessor(tooltipData.nearestDatum.datum)}
          </div>
        )}
      />
    </XYChart>
  );
}

export function BlockOverview({ node }: { node: Block }) {
  const chain = useNode<Chain>(node.chainId);
  const timestamp = DateTime.fromMillis(node.data.timestamp * 1000);
  const now = useNow();

  return (
    <Stack divider={<Divider />}>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Chain</Typography>
        <Link href={`/${chain.meta.slug}`}>
          <Avatar src={`/statics/${chain.data.chainId}.svg`} alt={chain.meta.name}>
            {chain.meta.name
              .split(' ')
              .map((word) => word[0])
              .join('')}
          </Avatar>
        </Link>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Block Hash</Typography>
        <Typography>{node.data.hash}</Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Block Number</Typography>
        <Typography>{<FormattedNumber value={node.data.number} />}</Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Gas Used</Typography>
        <Typography>{<FormattedNumber value={node.data.gasUsed} />}</Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Gas Limit</Typography>
        <Typography>{<FormattedNumber value={node.data.gasLimit} />}</Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Logs Bloom</Typography>
        <Typography
          textAlign={'right'}
          dangerouslySetInnerHTML={{ __html: node.data.logsBloom.replace(/(.{20})/g, '$1<wbr />') }}
        />
      </Stack>
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
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Miner</Typography>
        <Typography>
          <Link href={`https://etherscan.io/address/${node.data.miner}`}>{node.data.miner}</Link>
        </Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Parent</Typography>
        <Typography>
          <Link href={`/${chain.meta.slug}/blocks/${node.data.number - 1}`}>
            <FormattedNumber value={node.data.number - 1} />
          </Link>
        </Typography>
      </Stack>
    </Stack>
  );
}

export function TransactionOverview({ node }: { node: Transaction }) {
  const chain = useNode<Chain>(node.chainId);
  const receipt = useNode<Receipt>(node.receiptId);

  return (
    <Stack divider={<Divider />}>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Chain</Typography>
        <Link href={`/${chain.meta.slug}`}>
          <Avatar src={`/statics/${chain.data.chainId}.svg`} alt={chain.meta.name}>
            {chain.meta.name
              .split(' ')
              .map((word) => word[0])
              .join('')}
          </Avatar>
        </Link>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Block Hash</Typography>
        <Link href={`/${chain.meta.slug}/blocks/${node.data.blockNumber}`}>
          <Typography>{node.data.blockHash}</Typography>
        </Link>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Block Number</Typography>
        <Link href={`/${chain.meta.slug}/blocks/${node.data.blockNumber}`}>
          <Typography>
            <FormattedNumber value={node.data.blockNumber} />
          </Typography>
        </Link>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Transaction Hash</Typography>
        <Typography>{node.data.hash}</Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Transaction Index</Typography>
        <Typography>{<FormattedNumber value={node.data.transactionIndex} />}</Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>From Address</Typography>
        <Typography>
          {<Link href={`https://etherscan.io/address/${node.data.from}`}>{node.data.from}</Link>}
        </Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>To Address</Typography>
        <Typography>
          {<Link href={`https://etherscan.io/address/${node.data.to}`}>{node.data.to}</Link>}
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
          dangerouslySetInnerHTML={{ __html: node.data.input.replace(/(.{20})/g, '$1<wbr />') }}
        />
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Value</Typography>
        <Typography>{<FormattedNumber value={parseInt(node.data.value, 16)} />}</Typography>
      </Stack>
      <ReceiptOverview receipt={receipt} />
    </Stack>
  );
}

export function ReceiptOverview({ receipt: node }: { receipt: Receipt }) {
  return (
    <Stack divider={<Divider />}>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Gas Used</Typography>
        <Typography>{<FormattedNumber value={node.data.gasUsed} />}</Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Cumulative Gas Used</Typography>
        <Typography>{<FormattedNumber value={node.data.cumulativeGasUsed} />}</Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Logs Bloom</Typography>
        <Typography
          textAlign={'right'}
          dangerouslySetInnerHTML={{ __html: node.data.logsBloom.replace(/(.{20})/g, '$1<wbr />') }}
        />
      </Stack>
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
  const chain = useNode<Chain>(node.chainId);
  return (
    <Stack divider={<Divider />}>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Chain</Typography>
        <Link href={`/${chain.meta.slug}`}>
          <Avatar src={`/statics/${chain.data.chainId}.svg`} alt={chain.meta.name}>
            {chain.meta.name
              .split(' ')
              .map((word) => word[0])
              .join('')}
          </Avatar>
        </Link>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Block Hash</Typography>
        <Link href={`/${chain.meta.slug}/blocks/${node.data.blockNumber}`}>
          <Typography>{node.data.blockHash}</Typography>
        </Link>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Block Number</Typography>
        <Link href={`/${chain.meta.slug}/blocks/${node.data.blockNumber}`}>
          <Typography>
            <FormattedNumber value={node.data.blockNumber} />
          </Typography>
        </Link>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Transaction Hash</Typography>
        <Link
          href={`/${chain.meta.slug}/blocks/${node.data.blockNumber}/transactions/${node.data.transactionIndex}`}
        >
          <Typography>{node.data.transactionHash}</Typography>
        </Link>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Transaction Index</Typography>
        <Link
          href={`/${chain.meta.slug}/blocks/${node.data.blockNumber}/transactions/${node.data.transactionIndex}`}
        >
          <Typography>{<FormattedNumber value={node.data.transactionIndex} />}</Typography>
        </Link>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Log Index</Typography>
        <Typography>{<FormattedNumber value={node.data.logIndex} />}</Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Address</Typography>
        <Typography>
          {
            <Link href={`https://etherscan.io/address/${node.data.address}`}>
              {node.data.address}
            </Link>
          }
        </Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Topics</Typography>
        <Typography
          textAlign={'right'}
          dangerouslySetInnerHTML={{ __html: node.data.topics.join('<br />') }}
        />
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Data</Typography>
        <Typography
          textAlign={'right'}
          dangerouslySetInnerHTML={{ __html: node.data.data.replace(/(.{20})/g, '$1<wbr />') }}
        />
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Removed</Typography>
        <Typography>{node.data.removed.toString()}</Typography>
      </Stack>
    </Stack>
  );
}
