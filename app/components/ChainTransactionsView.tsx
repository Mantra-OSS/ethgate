'use client';

import { Chain } from '@/lib-solver';
import { Divider, Grid, Paper, Stack, Typography } from '@mui/material';

import ChainTransactionList from '../components/ChainTransactionList';
import { FallbackBoundary } from '../components/ui';

import NodePageBarContent from './NodePageBarContent';
export default function ChainTransactionsView({ nodeData }: { nodeData: Chain['data'] }) {
  const node = new Chain(nodeData);
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
        <Paper>
          <Stack direction="row">
            <Typography variant="h3" padding={1} textAlign="center">
              Transactions
            </Typography>
          </Stack>
          <Divider />
          <FallbackBoundary>
            <ChainTransactionList chainId={node.id} />
          </FallbackBoundary>
        </Paper>
      </Grid>
    </Grid>
  );
}
