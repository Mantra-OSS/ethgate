'use client';

import type { HomeViewChain_node$key } from '@/__generated__/HomeViewChain_node.graphql';
import type { HomeViewQuery } from '@/__generated__/HomeViewQuery.graphql';
import { useConnection, useNode, useNode2, useSolver } from '@/app/client/backend';
import type { Block, Chain, ChainHasBlock } from '@/lib-solver';
import { Avatar, Container, Divider, Grid, Link, Paper, Stack, Typography } from '@mui/material';
// import ChainBlockList from './ChainBlockList';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import { Fragment } from 'react';
import { useFragment, useLazyLoadQuery, useSubscription } from 'react-relay';
import { graphql } from 'relay-runtime';

import type { Explorer } from '../../solver/graph/explorer';
import { FallbackBoundary, NodeAvatar } from '../components/ui';
import { SuspenseFallback } from '../components/ui';

import HomeChart from './HomeChart';

// import ChainDescendantBlockList from './ChainDescendantBlockList';
// import ChainChainList from './ChainChainList';
// import ChainOverview from './ChainOverview';
// import ChainTransactionList from './ChainTransactionList';

const homeViewQuery = graphql`
  query HomeViewQuery {
    root {
      chains {
        edges {
          headId
          node {
            ...HomeViewChain_node
          }
        }
      }
    }
  }
`;

export default function HomeView() {
  const data = useLazyLoadQuery<HomeViewQuery>(homeViewQuery, {});

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
                <Stack
                  direction="row"
                  p={2}
                  gap={2}
                  justifyContent="space-around"
                  flexWrap={'wrap'}
                >
                  {data.root.chains.edges.map((edge) => (
                    <Fragment key={edge.headId}>
                      <HomeViewChain chain={edge.node} />
                    </Fragment>
                  ))}
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

const HomeViewChain_node = graphql`
  fragment HomeViewChain_node on Chain {
    id
    meta {
      name
      slug
    }
    connection(type: "ChainHasBlock", first: 1) @connection(key: "HomeViewChainQuery_connection") {
      __id
      edges {
        node {
          ...HomeViewChain_block @relay(mask: false)
        }
      }
      pageInfo {
        startCursor
      }
    }
  }
`;

const HomeViewChain_block = graphql`
  fragment HomeViewChain_block on Block {
    id
    data
  }
`;

const homeViewChainSubscriptionQuery = graphql`
  subscription HomeViewChainSubscriptionQuery(
    $chainId: ID!
    $type: String!
    $before: String
    $connection: ID!
  ) {
    node_connection(id: $chainId, type: $type, before: $before) {
      edges @prependEdge(connections: [$connection]) {
        node {
          ...HomeViewChain_block @relay(mask: false)
        }
      }
    }
  }
`;

function HomeViewChain({ chain: chainFragment }: { chain: HomeViewChain_node$key }) {
  const chain = useFragment(HomeViewChain_node, chainFragment);
  useSubscription({
    subscription: homeViewChainSubscriptionQuery,
    variables: {
      chainId: chain.id,
      type: 'ChainHasBlock',
      // before: chain.connection.pageInfo.startCursor,
      connection: chain.connection.__id,
    },
  });
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

  return (
    <Link href={`/${chain.meta.slug}`} style={{ textDecoration: 'none' }}>
      <Stack direction="row" alignItems="center" spacing={2} flexWrap={'nowrap'}>
        <NodeAvatar nodeId={chain.id} />
        <Stack direction="column" spacing={0}>
          <Typography variant="h6">{chain.meta.name}</Typography>
          <Typography variant="h6">{chain.connection.edges[0]?.node.data.number}</Typography>
        </Stack>
      </Stack>
    </Link>
  );
}
