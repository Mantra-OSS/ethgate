'use client';

import { Chain } from '@/lib-solver';
import { Divider, Grid, Link, Paper, Stack, Typography } from '@mui/material';

//import NodePageBarContent from '../components/NodePage';
import { FallbackBoundary } from '../components/ui';

import ChainBlockList from './ChainBlockList';
import ChainOverview from './ChainOverview';
import ChainTransactionList from './ChainTransactionList';


export default function ChainView({ nodeData: nodeData }: { nodeData: Chain['data'] }) {
  const node = new Chain(nodeData);
  return (
    <Grid container spacing={1} padding={1}>
      <Grid item xs={12}>
        <Paper>
          <Stack direction="row" padding={2} spacing={2}>
            {/* <NodePageBarContent node={node} /> */}
          </Stack>
          <Divider />
          <FallbackBoundary>
            <ChainOverview node={node} />
          </FallbackBoundary>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper>
          <Stack direction="row">
            <Typography variant="h3" padding={1} textAlign="center">
              Blocks
            </Typography>
            <Link href="blocks">View</Link>
          </Stack>
          <Divider />
          <FallbackBoundary>
            <ChainBlockList chainId={node.id} />
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
            <ChainTransactionList chainId={node.id} />
          </FallbackBoundary>
        </Paper>
      </Grid>
    </Grid>
  );
}
