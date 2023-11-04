'use client';

import { Log } from '@/lib-solver';
import { Divider, Grid, Paper, Stack } from '@mui/material';

import NodePageBarContent from '../components/NodePage';
import { FallbackBoundary } from '../components/ui';

import LogOverview from './LogOverview';

export default function LogView({ nodeData }: { nodeData: Log['data'] }) {
  const node = new Log(nodeData);
  return (
    <Grid container spacing={1} padding={1}>
      <Grid item xs={12}>
        <Paper>
          <Stack direction="row" padding={2} spacing={2}>
            <NodePageBarContent node={node} />
          </Stack>
          <Divider />
          <FallbackBoundary>
            <LogOverview node={node} />
          </FallbackBoundary>
        </Paper>
      </Grid>
    </Grid>
  );
}
