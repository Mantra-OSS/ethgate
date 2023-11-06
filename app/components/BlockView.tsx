'use client';

import type { Block } from '@/lib-solver';
import { Divider, Grid, Paper, Stack, Typography } from '@mui/material';

import { FallbackBoundary } from '../components/ui';

import BlockLogList from './BlockLogList';
import BlockOverview from './BlockOverview';
import BlockTransactionList from './BlockTransactionList';
import { NodePageConnectionSection, NodePageSection } from './NodePage';
import NodePageBarContent from './NodePageBarContent';

export default function BlockView({ node }: { node: Block }) {
  return (
    <>
      <Grid container spacing={1} padding={1}>
        <Grid item xs={12}>
          <NodePageSection
            title={
              <Stack direction="row" padding={2} spacing={2}>
                <NodePageBarContent node={node} />
              </Stack>
            }
          >
            <BlockOverview node={node} />
          </NodePageSection>
        </Grid>
        <Grid item xs={12} md={6}>
          <NodePageConnectionSection title="Transactions" href="#">
            <BlockTransactionList block={node} />
          </NodePageConnectionSection>
        </Grid>
        <Grid item xs={12} md={6}>
          <NodePageConnectionSection title="Logs" href="#">
            <BlockLogList block={node} />
          </NodePageConnectionSection>
        </Grid>
      </Grid>
    </>
  );
}
