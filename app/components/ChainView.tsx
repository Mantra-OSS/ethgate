'use client';

import { Divider, Grid, Paper, Stack } from '@mui/material';

import type { Chain } from '../../solver/data';
import { FallbackBoundary } from '../components/ui';

import ChainBlockList from './ChainBlockList';
import ChainOverview from './ChainOverview';
import ChainTransactionList from './ChainTransactionList';
import { NodePageConnectionSection, NodePageSection } from './NodePage';
import NodePageBarContent from './NodePageBarContent';

export default function ChainView({ node }: { node: Chain }) {
  return (
    <Grid container spacing={1} padding={1}>
      <Grid item xs={12}>
        <NodePageSection
          title={
            <Stack direction="row" padding={2} spacing={2} alignItems="center">
              <NodePageBarContent node={node} />
            </Stack>
          }
        >
          <ChainOverview node={node} />
        </NodePageSection>
      </Grid>
      <Grid item xs={12} md={6}>
        <NodePageConnectionSection title="Blocks" href={`${node.data.chainId}/blocks`}>
          <ChainBlockList chainId={node.id} />
        </NodePageConnectionSection>
      </Grid>
      <Grid item xs={12} md={6}>
        <NodePageConnectionSection title="Transactions" href={`${node.data.chainId}/transactions`}>
          <ChainTransactionList chainId={node.id} />
        </NodePageConnectionSection>
      </Grid>
    </Grid>
  );
}
