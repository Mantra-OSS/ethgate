import { Axis } from '@visx/axis';
import * as allCurves from '@visx/curve';
import { Group } from '@visx/group';
import { MarkerArrow, MarkerCircle, MarkerCross, MarkerLine, MarkerX } from '@visx/marker';
import type { DateValue } from '@visx/mock-data/lib/generators/genDateValue';
import generateDateValue from '@visx/mock-data/lib/generators/genDateValue';
import { ScaleSVG } from '@visx/responsive';
import { type AnyD3Scale, scaleLinear, scaleTime } from '@visx/scale';
import { LinePath } from '@visx/shape';
import { extent, max, min } from '@visx/vendor/d3-array';
import React, { Fragment, useState } from 'react';
import { graphql } from 'relay-runtime';

import type {
  Block,
  Chain,
  ChainHasBlock,
  EdgeType,
  SolverEdge,
  SolverNode,
} from '../../solver/graph';
import { useConnection, useNode, useNodes } from '../client/backend';

import ConnectionChart from './ConnectionChart';
import { FallbackBoundary } from './ui';

// export const chainChartFragment = graphql`
//   fragment ChainChart_node on Node
//   @argumentDefinitions(
//     edgeTypeName: { type: "String!" }
//     first: { type: "Int!" }
//     after: { type: "String" }
//   )
//   @refetchable(queryName: "ChainChartPaginationQuery") {
//     id
//     meta {
//       slug
//     }
//     connection(type: $edgeTypeName, first: $first, after: $after)
//       @connection(key: "ChainChart_connection") {
//       __id
//       edges {
//         ...ChainChartItem_edge
//         headId
//       }
//     }
//   }
// `;

// data accessors
// const getX = (edge: SolverEdge) => edge.time;
// const getY = (node: SolverNode) => node.data;
type Datum = { edge: SolverEdge; node: SolverNode };
const getX = (d: Datum) => d.edge.time as number;
const getY = (d: Datum) => d.node.data.transactions.length as number;

// scales

export type CurveProps = {
  edgeType: EdgeType<any>;
  tail: SolverNode;
  width: number;
  height: number;
  showControls?: boolean;
};

export default function ChainChart({ edgeType, tail, width, height }: CurveProps) {
  const {
    data: pageData,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useConnection(edgeType, tail.id, { first: 10 });
  const pages = pageData ? [pageData] : [];
  const lastPage = pages[pages.length - 1];
  const edges = pages.flatMap((page) => page.edges);
  const chain = useNode(tail.meta.chainId!);
  const nodes = useNodes(edges.map((edge) => edge.headId));

  const data = nodes
    ? edges.map((edge) => {
        return { edge, node: nodes.find((node) => node.id === edge.headId)! };
      })
    : [];

  const minX = Math.min(...data.map((d) => getX(d)));
  const maxX = Math.max(...data.map((d) => getX(d)));

  const minY = Math.min(...data.map((d) => d.node.data.transactions.length));
  const maxY = Math.max(...data.map((d) => d.node.data.transactions.length));

  const yScaleTicks = Array.from({ length: 5 }, (_, i) => (i * (maxY - minY)) / 4 + minY);

  const xScale = scaleLinear<number>({
    // domain: extent(edges, getX) as [Date, Date],
    domain: extent(data, getX) as [number, number],
  });
  const yScale = scaleLinear<number>({
    domain: [minY, maxY],
  });

  // update scale output ranges
  xScale.range([0, width - 50]);
  yScale.range([height - 2, 0]);
  // xScale.domain(extent(edges, getX) as [number, number]);

  //const padding = { top: 20, right: 20, bottom: 20, left: 20 };

  return (
    <ConnectionChart tailId={tail.id} edgeType={edgeType} width={width + 30} height={height + 40}>
      <Group top={15} left={30}>
        <LinePath<Datum>
          curve={allCurves.curveNatural}
          data={data}
          x={(d) => xScale(getX(d)) ?? 0}
          y={(d) => yScale(getY(d)) ?? 0}
          stroke={chain.meta.themeColor}
          strokeWidth={2}
          shapeRendering="geometricPrecision"
        />
        {data.map((data) => (
          <Fragment key={data.edge.headId}>
            <circle
              r={3}
              cx={xScale(getX(data))}
              cy={yScale((data.node as Block).data.transactions.length)}
              stroke="rgba(33,33,33,0.5)"
              fill={chain.meta.themeColor}
            />
          </Fragment>
        ))}
        {/* https://airbnb.io/visx/docs/axis */}
        {/* https://airbnb.io/visx/axis */}
        <Axis
          scale={xScale}
          orientation={'bottom'}
          top={height}
          tickLabelProps={{
            stroke: 'gray',
            fontSize: 14,
          }}
          hideAxisLine={true}
          hideTicks={true}
          tickValues={[minX, maxX]}
        />
        <Axis
          scale={yScale}
          orientation={'left'}
          tickLabelProps={{
            stroke: 'gray',
            fontSize: 14,
          }}
          hideAxisLine={true}
          hideTicks={true}
          left={-10}
          tickValues={yScaleTicks}
        />
      </Group>
    </ConnectionChart>
  );
}

function NodePoint(props: { edge: SolverEdge; xScale: AnyD3Scale; yScale: AnyD3Scale }) {
  const node = useNode(props.edge.headId);
  const chain = useNode(node.meta.chainId!);

  return (
    <circle
      r={3}
      cx={props.xScale(getX({ edge: props.edge, node }))}
      cy={props.yScale((node as Block).data.transactions.length)}
      stroke="rgba(33,33,33,0.5)"
      fill={chain.meta.themeColor}
    />
  );
}
