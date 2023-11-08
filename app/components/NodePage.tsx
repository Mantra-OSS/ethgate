'use client';
import type { SolverNode } from '@/lib-solver';
import type { EdgeType } from '@/lib-solver';
import { ArrowOutward } from '@mui/icons-material';
import { Box, Divider, Grid, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { useSolver } from '../client/backend';

import NodeConnectionList from './NodeConnectionList';
import NodePageBarContent from './NodePageBarContent';
import { BlockListItem, ChainListItem, TransactionListItem } from './list-items';
import { LogListItem } from './list-items';
import {
  BlockOverview,
  ChainOverview,
  LogOverview,
  ReceiptOverview,
  TransactionOverview,
} from './overviews';
import { FallbackBoundary } from './ui';

export default function NodePage({ node }: { node: SolverNode }) {
  const solver = useSolver();
  const edgeTypes = solver.solver.graph.getEdgeTypesForNode(node.type).filter((edgeType) => {
    if (edgeType.name === 'BlockHasReceipt') {
      return false;
    } else if (edgeType.name === 'ChainHasChain' && Object.keys(node).includes('parentId')) {
      return false;
    }
    return true;
  });

  return (
    <>
      <Grid container spacing={1} padding={1}>
        <Grid item xs={12}>
          <NodePageOverviewSection node={node} />
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
  node,
  edgeType,
}: {
  node: SolverNode;
  edgeType: EdgeType<any>;
}) {
  let renderItem: React.ComponentProps<typeof NodeConnectionList>['renderItem'];
  switch (edgeType.name) {
    case 'ChainHasChain': {
      renderItem = ({ headId }) => <ChainListItem chainId={headId} />;
      break;
    }
    case 'ChainHasDescendantBlock': {
      renderItem = ({ headId }) => <BlockListItem blockId={headId} />;
      break;
    }
    case 'ChainHasBlock': {
      renderItem = ({ headId }) => <BlockListItem blockId={headId} />;
      break;
    }
    case 'ChainHasTransaction': {
      renderItem = ({ headId }) => <TransactionListItem transactionId={headId} />;
      break;
    }
    case 'BlockHasTransaction': {
      renderItem = ({ headId }) => <TransactionListItem transactionId={headId} />;
      break;
    }
    case 'BlockHasLog': {
      renderItem = ({ headId }) => <LogListItem logId={headId} />;
      break;
    }
    case 'TransactionHasLog': {
      renderItem = ({ headId }) => <LogListItem logId={headId} />;
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
        <FallbackBoundary>
          <NodeConnectionList node={node} edgeType={edgeType} renderItem={renderItem} />
        </FallbackBoundary>
      </Stack>
      <Divider />
      <Box pt={1} />
    </NodePageSection>
  );
}

export function NodePageOverviewSection({ node }: { node: SolverNode }) {
  let children: React.ReactNode;
  switch (node.type) {
    case 'Chain': {
      children = <ChainOverview node={node as any} />;
      break;
    }
    case 'Block': {
      children = <BlockOverview node={node as any} />;
      break;
    }
    case 'Transaction': {
      children = <TransactionOverview node={node as any} />;
      break;
    }
    case 'Receipt': {
      children = <ReceiptOverview receipt={node as any} />;
      break;
    }
    case 'Log': {
      children = <LogOverview node={node as any} />;
      break;
    }
    default:
      throw new Error(`Unknown node type: ${node.type}`);
  }
  return (
    <NodePageSection
      title={
        <Stack direction="row" padding={2} spacing={2}>
          <NodePageBarContent node={node} />
        </Stack>
      }
    >
      {children}
    </NodePageSection>
  );
}
