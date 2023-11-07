'use client';

import type { Block } from '@/lib-solver';
import { Grid, Stack } from '@mui/material';

import { useSolver } from '../client/backend';

import BlockOverview from './BlockOverview';
import { NodePageConnectionSection2, NodePageSection } from './NodePage';
import NodePageBarContent from './NodePageBarContent';

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
            <NodePageConnectionSection2 node={node} edgeType={edgeType} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
