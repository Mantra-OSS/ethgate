'use client';

import type { EdgeType, SolverNode } from '@/lib-solver';
import { ArrowOutward } from '@mui/icons-material';
import { Box, Divider, Grid, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material';
import { createElement, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { useSolver } from '../client/backend';

import ConnectionList from './ConnectionList';
import {
  BlockListItem,
  ChainListItem,
  LogListItem,
  TransactionListItem,
  listItemComponents,
} from './list-items';
import { FallbackBoundary, NodeAvatar, Section } from './ui';

// import ChainBlockList from './ChainBlockList';

export default function ConnectionPage({
  node,
  edgeTypeName,
}: {
  node: SolverNode;
  edgeTypeName: string;
}) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  const solver = useSolver();
  const edgeType = solver.graph.getEdgeType(edgeTypeName);
  if (!ready) return null;
  return (
    <Grid container spacing={1} padding={1}>
      <Grid item xs={12}>
        <Paper>
          <Stack direction="row" alignItems="center" gap={1} p={1}>
            <NodeAvatar nodeId={node.id} />
            <Stack>
              <Typography variant="h4" flex={1}>
                {node.meta.name}{' '}
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
            </Stack>
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <NodeConnectionPageOverview node={node} edgeType={edgeType} />
      </Grid>
    </Grid>
  );
}

export function NodeConnectionPageOverview({
  node,
  edgeType,
}: {
  node: SolverNode;
  edgeType: EdgeType<any>;
}) {
  const renderItem: React.ComponentProps<typeof ConnectionList>['renderItem'] = ({ headId }) =>
    createElement((listItemComponents as any)[edgeType.typeName], { nodeId: headId });
  return (
    <Section
      title={
        <>
          {/* <FormattedMessage
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
          /> */}
        </>
      }
      actions={
        <>
          {/* <Tooltip title={<FormattedMessage id="Connection.viewAll" defaultMessage="View All" />}>
            <IconButton
              href={`${node.meta.slug}/${edgeType.connectionName}`}
              size="small"
              color="primary"
            >
              <ArrowOutward />
            </IconButton>
          </Tooltip> */}
        </>
      }
    >
      <Stack minHeight={300}>
        <FallbackBoundary>
          <ConnectionList
            baseHref="../"
            paginate
            tailId={node.id}
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
