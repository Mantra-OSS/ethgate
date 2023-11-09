'use client';

import { useNode2 } from '@/app/client/backend';
import type { Chain } from '@/lib-solver';
import { Avatar, Container, Divider, Grid, Link, Paper, Stack, Typography } from '@mui/material';

// import ChainBlockList from './ChainBlockList';
import type { Explorer } from '../../solver/graph/explorer';
import { FallbackBoundary } from '../components/ui';
import { SuspenseFallback } from '../components/ui';

import HomeChart from './HomeChart';

// import ChainDescendantBlockList from './ChainDescendantBlockList';
// import ChainChainList from './ChainChainList';
// import ChainOverview from './ChainOverview';
// import ChainTransactionList from './ChainTransactionList';

export default function HomeView() {
  const node = useNode2<Explorer>('Explorer:');
  if (!node) return <SuspenseFallback />;

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={1} padding={1}>
          {/* <Grid item xs={12}>
            <Paper>
              <Typography variant="h3" padding={1} textAlign="center">
                Chain Overview
              </Typography>
              <Divider />
              <FallbackBoundary>
                <HomeChart width={300} height={300} />
              </FallbackBoundary>
            </Paper>
          </Grid> */}
          <Grid item xs={12}>
            <Paper>
              <Typography variant="h3" padding={1} textAlign="center">
                Chains
              </Typography>
              <Divider />
              <FallbackBoundary>
                <Stack direction="row" padding={3} justifyContent="space-between">
                  {Object.values(node.data.chains).map((chain) => {
                    return (
                      <Link href={`/${chain.meta.slug}`} key={chain.chainId}>
                        <Avatar alt={chain.meta.name} src={`/statics/${chain.chainId}.svg`}>
                          {chain.meta.name
                            .split(' ')
                            .map((word: string) => word[0])
                            .join('')}
                        </Avatar>
                      </Link>
                    );
                  })}
                </Stack>
              </FallbackBoundary>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
