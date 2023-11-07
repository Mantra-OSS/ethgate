'use client';

import type { Chain } from '@/lib-solver';
import { Grid, Paper, Stack } from '@mui/material';

import { useSolver } from '../client/backend';

import { NodePageConnectionSection2 } from './NodePage';
import NodePageBarContent from './NodePageBarContent';

// import ChainBlockList from './ChainBlockList';

export default function NodeConnectionPage({
  node,
  edgeTypeName,
}: {
  node: Chain;
  edgeTypeName: string;
}) {
  const solver = useSolver();
  const edgeType = solver.solver.graph.getEdgeType(edgeTypeName);
  return (
    <Grid container spacing={1} padding={1}>
      <Grid item xs={12}>
        <Paper>
          <Stack direction="row" padding={2} spacing={2}>
            <NodePageBarContent node={node} />
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <NodePageConnectionSection2 node={node} edgeType={edgeType} />
      </Grid>
    </Grid>
  );
}
