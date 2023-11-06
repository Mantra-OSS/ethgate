'use client';

import { ArrowOutward } from '@mui/icons-material';
import { Divider, Grid, IconButton, Link, Paper, Stack, Tooltip, Typography } from '@mui/material';

import type { Chain } from '../../solver/data';
import { FallbackBoundary } from '../components/ui';

import ChainBlockList from './ChainBlockList';
import ChainOverview from './ChainOverview';
import ChainTransactionList from './ChainTransactionList';
import { NodePageSection } from './NodePage';
import NodePageBarContent from './NodePageBarContent';

export default function ChainView({ node }: { node: Chain }) {
  return (
    <Grid container spacing={1} padding={1}>
      <Grid item xs={12}>
        <Paper>
          <Stack direction="row" padding={2} spacing={2} alignItems="center">
            <NodePageBarContent node={node} />
          </Stack>
          <Divider />
          <FallbackBoundary>
            <ChainOverview node={node} />
          </FallbackBoundary>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <NodePageSection
          node={node}
          title="Blocks"
          actions={
            <>
              <Tooltip title="View All">
                <IconButton
                  href={`${node.data.chainId}/blocks`}
                  size="small"
                  aria-label="view all"
                  color="primary"
                >
                  <ArrowOutward />
                </IconButton>
              </Tooltip>
            </>
          }
        >
          <ChainBlockList chainId={node.id} />
        </NodePageSection>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper>
          <Stack direction="row" alignItems="center" px={1} py={0.5}>
            <Typography variant="h3" pl={1} flex={1}>
              Transactions
            </Typography>
            <Tooltip title="View All">
              <IconButton
                href={`${node.data.chainId}/transactions`}
                size="small"
                aria-label="view all"
                color="primary"
              >
                <ArrowOutward />
              </IconButton>
            </Tooltip>
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
