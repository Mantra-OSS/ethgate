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
import { NodeOverview } from './NodeOverview';
import { listItemComponents } from './list-items';
import { FallbackBoundary, NodeAvatar, Section } from './ui';

const nodePageQuery = graphql`
  query NodePageQuery($id: ID!) {
    node(id: $id) {
      ...NodeOverview_node
      ...NodePageConnectionSection_node
      id
      meta {
        name
      }
      data
    }
  }
`;

export default function NodePage({ nodeId }: { nodeId: SolverNode['id'] }) {
  const { node } = useLazyLoadQuery<NodePageQuery>(nodePageQuery, { id: nodeId });
  if (!node) notFound();
  console.log('node2', node);
  // const node2 = node;
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
  // const children = createElement((overviewComponents as any)[nodeType.name], { node: solverNode });
  if (!ready) return null;
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
            {/* <FallbackBoundary>{children}</FallbackBoundary> */}
            <FallbackBoundary>
              <NodeOverview node={node} />
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
            <NodePageConnectionSection tail={node} edgeType={edgeType} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

const nodePageConnectionSection_nodeFragment = graphql`
  fragment NodePageConnectionSection_node on Node {
    id
    meta {
      slug
    }
  }
`;

export function NodePageConnectionSection({
  tail: tailFragment,
  edgeType,
}: {
  tail: NodePageConnectionSection_node$key;
  edgeType: EdgeType<any>;
}) {
  const tail = useFragment(nodePageConnectionSection_nodeFragment, tailFragment);
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
          <ConnectionList
            baseHref=""
            tailId={tail.id}
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
