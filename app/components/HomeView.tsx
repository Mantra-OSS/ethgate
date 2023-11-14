'use client';

import type { HomeViewChainQuery } from '@/__generated__/HomeViewChainQuery.graphql';
import { useConnection, useNode, useNode2, useSolver } from '@/app/client/backend';
import type { Block, Chain, ChainHasBlock } from '@/lib-solver';
import { Avatar, Container, Divider, Grid, Link, Paper, Stack, Typography } from '@mui/material';
// import ChainBlockList from './ChainBlockList';
import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';
import { useLazyLoadQuery } from 'react-relay';
import { graphql } from 'relay-runtime';

import type { Explorer } from '../../solver/graph/explorer';
import { FallbackBoundary, NodeAvatar } from '../components/ui';
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
                Explore Chains
              </Typography>
              <Divider />
              <FallbackBoundary>
                <Stack direction="row" padding={3} justifyContent="space-between">
                  {Object.values(node.data.chains).map((chain) => {
                    return <HomeViewChain chainId={`Chain:${chain.chainId}`} key={chain.chainId} />;
                  })}
                </Stack>
              </FallbackBoundary>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <Typography variant="h3" padding={1} textAlign="center">
                Follow Us
              </Typography>
              <Divider />
              <Stack direction="row" padding={3} justifyContent="center">
                <QRCodeSVG value="https://twitter.com/ethgate_io" includeMargin size={200} />
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

const homeViewChainQuery = graphql`
  query HomeViewChainQuery($chainId: ID!) {
    node(id: $chainId) {
      id
      meta {
        name
        slug
      }
      connection(type: "ChainHasBlock", first: 1) {
        edges {
          node {
            id
            data
          }
        }
      }
    }
  }
`;

function HomeViewChain({ chainId }: { chainId: any }) {
  const { node: chain } = useLazyLoadQuery<HomeViewChainQuery>(homeViewChainQuery, { chainId });
  // const chain = useNode<Chain>(chainId);
  // const solver = useSolver();
  // const edgeType = solver.graph.getEdgeType('ChainHasBlock');
  // const {
  //   data: pageData,
  //   error,
  //   isLoading,
  //   isValidating,
  //   mutate,
  // } = useConnection(edgeType, chainId, { first: 11 });
  // const latestChainHasBlock: ChainHasBlock | undefined = pageData?.edges[0];
  // const latestBlock: Block | undefined = useNode<Block>(latestChainHasBlock?.headId as any);

  if (!chain?.id || !chain?.meta) {
    throw new Error(`Chain not found: ${chainId}`);
  }

  return (
    <Link href={`/${chain.meta.slug}`} style={{ textDecoration: 'none' }}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <NodeAvatar nodeId={chain.id} />
        {/* <Stack direction="column" spacing={0}>
          <Typography variant="h6">{chain.meta.name}</Typography>
          <Typography variant="h6">{chain.connection.edges[0]?.node.data.number}</Typography>
        </Stack> */}
      </Stack>
    </Link>
  );
}
