'use client';

import type { Block } from '@/lib-solver';
import { Divider, Grid, Paper, Stack, Typography } from '@mui/material';

import { FallbackBoundary } from '../components/ui';

import BlockLogList from './BlockLogList';
import BlockOverview from './BlockOverview';
import BlockTransactionList from './BlockTransactionList';
import { NodePageConnectionSection, NodePageSection } from './NodePage';
import NodePageBarContent from './NodePageBarContent';
import { useSolver } from '../client/backend';

export default function BlockView({ node }: { node: Block }) {
  const solver = useSolver();
  const edgeTypes = solver.solver.graph
    .getEdgeTypesForNode(node.type)
    .filter((edgeType) => !['receipts'].includes(edgeType.connectionName));
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
        {edgeTypes.map((edgeType) => (
          <Grid key={edgeType.connectionName} item xs={12} md={6}>
            <NodePageConnectionSection
              title={edgeType.connectionName}
              href={`/${node.meta.slug}/${edgeType.connectionName}`}
            >
              {edgeType.connectionName === 'transactions' && <BlockTransactionList block={node} />}
              {edgeType.connectionName === 'logs' && <BlockLogList block={node} />}
            </NodePageConnectionSection>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
