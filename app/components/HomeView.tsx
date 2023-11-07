'use client';
import { useNode } from '@/app/helpers/hooks';
import type { Chain } from '@/lib-solver';
import { Container, Divider, Grid, Paper, Stack, Typography } from '@mui/material';

// import ChainBlockList from './ChainBlockList';
import { FallbackBoundary } from '../components/ui';

// import ChainDescendantBlockList from './ChainDescendantBlockList';
// import ChainChainList from './ChainChainList';
// import ChainOverview from './ChainOverview';
// import ChainTransactionList from './ChainTransactionList';

export default function HomeView() {
  const node = useNode<Chain>('Chain:1');

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={1} padding={1}>
          <Grid item xs={12}>
            <Paper>
              <Typography variant="h3" padding={1} textAlign="center">
                Chain Overview
              </Typography>
              <Divider />
              <FallbackBoundary>{/* <ChainOverview node={node} /> */}</FallbackBoundary>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <Typography variant="h3" padding={1} textAlign="center">
                Subchains
              </Typography>
              <Divider />
              <FallbackBoundary>
                <Stack direction="row" sx={{ overflowX: 'auto' }}>
                  {/* <ChainChainList chain={node} /> */}
                </Stack>
              </FallbackBoundary>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper>
              <Typography variant="h3" padding={1} textAlign="center">
                Blocks
              </Typography>
              <Divider />
              <FallbackBoundary>
                {/* <ChainBlockList chain={node} /> */}
                {/* <ChainDescendantBlockList chain={node} /> */}
              </FallbackBoundary>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper>
              <Typography variant="h3" padding={1} textAlign="center">
                Transactions
              </Typography>
              <Divider />
              <FallbackBoundary>
                {/* <ChainTransactionList chainId={node.id} /> */}
              </FallbackBoundary>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper>
              <Typography variant="h3" padding={1} textAlign="center">
                Logs
              </Typography>
              <Divider />
              <FallbackBoundary>
                {/* <ChainTransactionList chainId={node.id} /> */}
              </FallbackBoundary>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
