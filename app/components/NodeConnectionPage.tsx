'use client';

import type { EdgeType, SolverNode } from '@/lib-solver';
import { ArrowOutward } from '@mui/icons-material';
import { Box, Divider, Grid, IconButton, Paper, Stack, Tooltip } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { useSolver } from '../client/backend';

import NodeConnectionList from './NodeConnectionList';
import { NodePageSection } from './NodePage';
import NodePageBarContent from './NodePageBarContent';
import { BlockListItem, ChainListItem, LogListItem, TransactionListItem } from './list-items';
import { FallbackBoundary } from './ui';

// import ChainBlockList from './ChainBlockList';

export default function NodeConnectionPage({
  node,
  edgeTypeName,
}: {
  node: SolverNode;
  edgeTypeName: string;
}) {
  const solver = useSolver();
  const edgeType = solver.solver.graph.getEdgeType(edgeTypeName);
  return (
    <Grid container spacing={1} padding={1}>
      <Grid item xs={12}>
        <Paper>
          <Stack direction="row" padding={2} spacing={2}>
            <NodePageBarContent node={node} />
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
