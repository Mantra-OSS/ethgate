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

import type {
  Block,
  Chain,
  ChainHasBlock,
  EdgeType,
  SolverEdge,
  SolverNode,
} from '../../solver/graph';
import { useConnection, useNode, useNodes } from '../client/backend';

import { FallbackBoundary } from './ui';

export default function ConnectionChart<TEdgeType extends EdgeType<any>>({
  edgeType,
  tailId,
  width,
  height,
  children,
}: {
  edgeType: TEdgeType;
  tailId: SolverNode['id'];
  width: number;
  height: number;
  children?: React.ReactNode;
}) {
  return (
    <ScaleSVG width={width} height={height}>
      {children}
    </ScaleSVG>
  );
}
