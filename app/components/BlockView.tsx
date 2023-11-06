'use client';

import { Block } from '@/lib-solver';
import { Divider, Grid, Paper, Stack, Typography } from '@mui/material';

import NodePageBarContent from './NodePageBarContent';
import { FallbackBoundary } from '../components/ui';

import BlockLogList from './BlockLogList';
import BlockOverview from './BlockOverview';
import BlockTransactionList from './BlockTransactionList';

export default function BlockView({ nodeData }: { nodeData: Block['data'] }) {
  const node = new Block(nodeData);
  return (
    <>
      <Grid container spacing={1} padding={1}>
        <Grid item xs={12}>
          <Paper>
            <Stack direction="row" padding={2} spacing={2}>
              <NodePageBarContent node={node} />
            </Stack>
            <Divider />
            <FallbackBoundary>
              <BlockOverview node={node} />
            </FallbackBoundary>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <Typography variant="h3" padding={1} textAlign="center">
              Transactions
            </Typography>
            <Divider />
            <FallbackBoundary>
              <BlockTransactionList block={node} />
            </FallbackBoundary>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <Typography variant="h3" padding={1} textAlign="center">
              Logs
            </Typography>
            <Divider />
            <FallbackBoundary>
              <BlockLogList block={node} />
            </FallbackBoundary>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
