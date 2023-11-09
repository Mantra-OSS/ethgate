'use client';
import type { SolverNode } from '@/lib-solver';
import type { EdgeType } from '@/lib-solver';
import { ArrowOutward } from '@mui/icons-material';
import { Box, Divider, Grid, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material';
import { createElement } from 'react';
import { FormattedMessage } from 'react-intl';

import { useNode, useSolver } from '../client/backend';

import NodeConnectionList from './ConnectionList';
import { listItemComponents } from './list-items';
import { overviewComponents } from './overviews';
import { FallbackBoundary, NodeAvatar, Section } from './ui';

export default function NodePage({ node }: { node: SolverNode }) {
  const solver = useSolver();
  const nodeType = solver.graph.getNodeTypeById(node.id);
  const edgeTypes = solver.graph.getEdgeTypesForNode(nodeType.name).filter((edgeType) => {
    if (edgeType.name === 'BlockHasReceipt') {
      return false;
    } else if (
      edgeType.name === 'ChainHasChain'
      // && Object.keys(node).includes('parentId')
    ) {
      return false;
    }
    return true;
  });
  const children = createElement((overviewComponents as any)[nodeType.name], { node });

  return (
    <>
      <Grid container spacing={1} padding={1}>
        <Grid item xs={12}>
          <Paper>
            <Stack direction="row" alignItems="center" gap={1} p={1} pl={2}>
              <NodeAvatar nodeId={node.id} />
              <Stack>
                <Typography variant="h3" flex={1}>
                  {node.meta.name}
                </Typography>
              </Stack>
            </Stack>
            <Divider />
            <FallbackBoundary>{children}</FallbackBoundary>
          </Paper>
        </Grid>
        {edgeTypes.map((edgeType) => (
          <Grid
            key={edgeType.connectionName}
            item
            xs={12}
            md={edgeTypes.length > 2 ? 4 : edgeTypes.length > 1 ? 6 : 12}
          >
            <NodePageConnectionSection tailId={node.id} edgeType={edgeType} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export function NodePageConnectionSection({
  tailId,
  edgeType,
}: {
  tailId: SolverNode['id'];
  edgeType: EdgeType<any>;
}) {
  const tail = useNode(tailId);
  const renderItem: React.ComponentProps<typeof NodeConnectionList>['renderItem'] = ({ headId }) =>
    createElement((listItemComponents as any)[edgeType.name], { nodeId: headId });
  return (
    <Section
      title={
        <Typography variant="h4">
          <FormattedMessage
            id={`Connection.title`}
            defaultMessage={`{name, select,
              chains {Chains}
              blocks {Blocks}
              transactions {Transactions}
              receipts {Receipts}
              logs {Logs}
              other {Connection "{name}"}
            }`}
            values={{
              name: edgeType.connectionName,
            }}
          />
        </Typography>
      }
      actions={
        <>
          <Tooltip title={<FormattedMessage id="Connection.viewAll" defaultMessage="View All" />}>
            <IconButton
              href={`${tail.meta.slug}/${edgeType.connectionName}`}
              size="small"
              color="primary"
            >
              <ArrowOutward />
            </IconButton>
          </Tooltip>
        </>
      }
    >
      <Stack
      // minHeight={300}
      // maxHeight={500}
      // style={{
      //   overflowY: 'auto',
      // }}
      >
        <FallbackBoundary>
          <NodeConnectionList
            baseHref=""
            tailId={tailId}
            edgeType={edgeType}
            renderItem={renderItem}
          />
        </FallbackBoundary>
      </Stack>
      <Divider />
      <Box pt={1} />
    </Section>
  );
}
