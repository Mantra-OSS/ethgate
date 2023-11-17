'use client';

import type { ConnectionPageOverview_node$key } from '@/__generated__/ConnectionPageOverview_node.graphql';
import type { ConnectionPageQuery } from '@/__generated__/ConnectionPageQuery.graphql';
import type { EdgeType, SolverNode } from '@/lib-solver';
import { ArrowOutward } from '@mui/icons-material';
import { Box, Divider, Grid, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material';
import { notFound } from 'next/navigation';
import { createElement, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useFragment, useLazyLoadQuery } from 'react-relay';
import { graphql } from 'relay-runtime';

import { useSolver } from '../client/backend';

import ConnectionList from './ConnectionList';
import { NodeAvatar } from './NodeAvatar';
import {
  BlockListItem,
  ChainListItem,
  LogListItem,
  TransactionListItem,
  listItemComponents,
} from './list-items';
import { FallbackBoundary, NodeAvatar2, Section } from './ui';

const connectionPageQuery = graphql`
  query ConnectionPageQuery($nodeId: ID!, $edgeTypeName: String!) {
    node(id: $nodeId) {
      ...NodeAvatar_node
      ...ConnectionPageOverview_node @arguments(edgeTypeName: $edgeTypeName, first: 20)
      id
      meta {
        name
      }
      # connection(type: $edgeTypeName, first: 10)
      #   @connection(key: "ConnectionPageQuery_connection") {
      #   __id
      #   edges {
      #     node {
      #       id
      #     }
      #   }
      # }
      # ...NodePageOverview_node
      # ...NodePageConnectionSection_node
      # id
      # meta {
      #   name
      # }
      # data
    }
  }
`;

export default function ConnectionPage({
  nodeId,
  edgeTypeName,
}: {
  nodeId: SolverNode['id'];
  edgeTypeName: string;
}) {
  const { node } = useLazyLoadQuery<ConnectionPageQuery>(connectionPageQuery, {
    nodeId,
    edgeTypeName,
  });
  if (!node) notFound();
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
            <NodeAvatar node={node} />
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
        <ConnectionPageOverview node={node} edgeType={edgeType} />
      </Grid>
    </Grid>
  );
}
export const connectionPageOverviewFragment = graphql`
  fragment ConnectionPageOverview_node on Node
  @argumentDefinitions(edgeTypeName: { type: "String!" }, first: { type: "Int!" }) {
    ...ConnectionList_node @arguments(edgeTypeName: $edgeTypeName, first: $first)
    id
    meta {
      slug
    }
  }
`;

export function ConnectionPageOverview({
  node: nodeFragment,
  edgeType,
}: {
  node: ConnectionPageOverview_node$key;
  edgeType: EdgeType<any>;
}) {
  const node = useFragment(connectionPageOverviewFragment, nodeFragment);
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
            node={node}
            baseHref="../"
            paginate
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
