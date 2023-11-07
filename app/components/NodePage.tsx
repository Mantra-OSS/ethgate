'use client';
import { ArrowOutward } from '@mui/icons-material';
import { Box, Divider, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import type { SolverEdge, SolverNode } from '../../solver/data';
import type { EdgeType } from '../../solver/graph';

import { BlockLogListItem } from './BlockLogList';
import { BlockTransactionListItem } from './BlockTransactionList';
import NodeConnectionList from './NodeConnectionList';
import { FallbackBoundary } from './ui';

export function NodePage({ node, children }: { node: SolverNode; children: React.ReactNode }) {
  return <>{children}</>;
}

export function NodePageSection({
  title,
  actions,
  children,
}: {
  title: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Paper>
      <Stack direction="row" alignItems="center" px={1} py={0.5}>
        <Typography variant="h3" pl={1} flex={1}>
          {title}
        </Typography>
        {actions}
      </Stack>
      <Divider />
      <FallbackBoundary>{children}</FallbackBoundary>
    </Paper>
  );
}

export function NodePageConnectionSection({
  title,
  href,
  children,
}: {
  title: React.ReactNode;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <NodePageSection
      title={title}
      actions={
        <>
          <Tooltip title={<FormattedMessage id="Connection.viewAll" defaultMessage="View All" />}>
            <IconButton href={href} size="small" color="primary">
              <ArrowOutward />
            </IconButton>
          </Tooltip>
        </>
      }
    >
      <Stack
        minHeight={300}
        maxHeight={500}
        style={{
          overflowY: 'auto',
        }}
      >
        <FallbackBoundary>{children}</FallbackBoundary>
      </Stack>
      <Divider />
      <Box pt={1} />
    </NodePageSection>
  );
}

export function NodePageConnectionSection2({
  node,
  edgeType,
}: {
  node: SolverNode;
  edgeType: EdgeType<any>;
}) {
  let children: React.ReactNode;
  switch (edgeType.name) {
    case 'BlockHasTransaction': {
      children = (
        <NodeConnectionList
          node={node}
          edgeType={edgeType}
          renderItem={({ headId }) => <BlockTransactionListItem transactionId={headId} />}
        />
      );
      break;
    }
    case 'BlockHasLog': {
      children = (
        <NodeConnectionList
          node={node}
          edgeType={edgeType}
          renderItem={({ headId }) => <BlockLogListItem logId={headId} />}
        />
      );
      break;
    }
    default:
      throw new Error(`Unknown edge type: ${edgeType.name}`);
  }
  return (
    <NodePageSection
      title={
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
        minHeight={300}
        maxHeight={500}
        style={{
          overflowY: 'auto',
        }}
      >
        <FallbackBoundary>{children}</FallbackBoundary>
      </Stack>
      <Divider />
      <Box pt={1} />
    </NodePageSection>
  );
}
