'use client';
import type { NodePageConnectionSection_node$key } from '@/__generated__/NodePageConnectionSection_node.graphql';
import type { NodePageQuery } from '@/__generated__/NodePageQuery.graphql';
import type { SolverNode } from '@/lib-solver';
import type { EdgeType } from '@/lib-solver';
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
import { NodePageOverview } from './NodePageOverview';
import { listItemComponents } from './list-items';
import { FallbackBoundary, Section } from './ui';

const nodePageQuery = graphql`
  query NodePageQuery($nodeId: ID!) {
    node(id: $nodeId) {
      ...NodePageOverview_node
      ...NodePageConnectionSection_node
      ...NodeAvatar_node
      id
      meta {
        name
      }
      data
    }
  }
`;

export default function NodePage({ nodeId }: { nodeId: SolverNode['id'] }) {
  const { node } = useLazyLoadQuery<NodePageQuery>(nodePageQuery, { nodeId });
  if (!node) notFound();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  const solver = useSolver();
  const nodeType = solver.graph.getNodeTypeById(node.id);
  const edgeTypes = solver.graph.getEdgeTypesForNode(nodeType.name).filter((edgeType) => {
    if (edgeType.typeName === 'BlockHasReceipt') {
      return false;
    } else if (
      edgeType.typeName === 'ChainHasChain'
      // && Object.keys(node).includes('parentId')
    ) {
      return false;
    }
    return true;
  });
  if (!ready) return null;
  return (
    <>
      <Grid container spacing={1} padding={1}>
        <Grid item xs={12}>
          <Paper>
            <Stack direction="row" alignItems="center" gap={1} p={1} pl={2}>
              <NodeAvatar node={node} />
              <Stack>
                <Typography variant="h3" flex={1}>
                  {node.meta.name}
                </Typography>
              </Stack>
            </Stack>
            <Divider />
            <FallbackBoundary>
              <NodePageOverview node={node} />
            </FallbackBoundary>
          </Paper>
        </Grid>
        {edgeTypes.map((edgeType) => (
          <Grid
            key={edgeType.connectionName}
            item
            xs={12}
            md={edgeTypes.length > 2 ? 4 : edgeTypes.length > 1 ? 6 : 12}
          >
            <NodePageConnectionSection node={node} edgeType={edgeType} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

const nodePageConnectionSectionFragment = graphql`
  fragment NodePageConnectionSection_node on Node {
    ...ConnectionList_node
    id
    meta {
      slug
    }
  }
`;

export function NodePageConnectionSection({
  node: nodeFragment,
  edgeType,
}: {
  node: NodePageConnectionSection_node$key;
  edgeType: EdgeType<any>;
}) {
  const node = useFragment(nodePageConnectionSectionFragment, nodeFragment);
  const renderItem: React.ComponentProps<typeof ConnectionList>['renderItem'] = ({ headId }) =>
    createElement((listItemComponents as any)[edgeType.typeName], { nodeId: headId });
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
              href={`${node.meta.slug}/${edgeType.connectionName}`}
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
          <ConnectionList node={node} baseHref="" edgeType={edgeType} renderItem={renderItem} />
        </FallbackBoundary>
      </Stack>
      <Divider />
      <Box pt={1} />
    </Section>
  );
}
