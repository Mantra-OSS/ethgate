'use client';
import type { Chain, ChainHasBlock } from '@/lib-solver';
import { Divider, Stack, Typography, Collapse } from '@mui/material';
import { AnimatedAxis, AnimatedGrid, AnimatedLineSeries, Tooltip, XYChart } from '@visx/xychart';
import { useCallback, useEffect, useTransition } from 'react';
import { useConnection, useNode } from '../helpers/hooks';
import { solverPromise } from '../client/backend';
import InfiniteList from '../components/InfiniteList';
import { NodeList, NodeListItem } from './NodeList';

export default function ChainOverview({ node }: { node: Chain }) {
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
      <ChainChart chainId={node.id} />
    </>
  );
}

function ChainChart({ chainId }: { chainId: Chain['id'] }) {
  const [, startTransition] = useTransition();
  const [blocks, loadNext, refetch] = useConnection<ChainHasBlock>('ChainHasBlock', chainId, {
    first: 10,
  });
  const onLoadNext = useCallback(() => {
    startTransition(() => {
      loadNext();
    });
  }, [loadNext]);

  useEffect(() => {
    let abort = false;

    (async () => {
      const database = (await solverPromise).solver.database;
      const update = await database.networkUpdates(chainId).next();
      if (update.done) return;
      if (abort) return;
      startTransition(() => {
        refetch();
      });
      // const { headId } = update.value;
    })();

    return () => {
      abort = true;
    };
  });
  /*   const data = blocks.edges.map((block) => ({
    x: block.data.number,
    y: block.data.transactions.length,
  })); */
  const data = [
    { x: '111853870', y: 50 },
    { x: '111853871', y: 10 },
    { x: '111853872', y: 20 },
    { x: '111853873', y: 42 },
    { x: '111853874', y: 75 },
    { x: '111853875', y: 57 },
    { x: '111853876', y: 32 },
  ];
  return (
    <>
      <InfiniteList
        // startSubscriptionConfig={subscriptionConfig}
        // loadPrevious={hasPrevious && onLoadPrevious}
        loadNext={blocks?.pageInfo.hasNextPage && onLoadNext}
      >
        <Chart data={data} />
      </InfiniteList>
    </>
  );
}

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
