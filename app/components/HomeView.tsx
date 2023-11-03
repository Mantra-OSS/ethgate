import type { Chain } from '@ethgate/lib-solver';
import { Container, Divider, Grid, Paper, Stack, Typography } from '@mui/material';

// import ChainBlockList from './ChainBlockList.js';
import { FallbackBoundary } from '../components/ui.js';
import { useNode } from '../helpers/backend.js';

// import ChainDescendantBlockList from './ChainDescendantBlockList.js';
import ChainChainList from './ChainChainList.js';
import ChainOverview from './ChainOverview.js';
import ChainTransactionList from './ChainTransactionList.js';

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
              <FallbackBoundary>
                <ChainOverview node={node} />
              </FallbackBoundary>
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
                  <ChainChainList chain={node} />
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
                <ChainTransactionList chainId={node.id} />
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
                <ChainTransactionList chainId={node.id} />
              </FallbackBoundary>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
