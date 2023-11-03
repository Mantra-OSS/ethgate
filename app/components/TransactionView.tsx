'use client';
import { useNode } from '@/app/helpers/hooks';
import type { Receipt, Transaction } from '@ethgate/lib-solver';
import { Divider, Grid, Paper, Stack } from '@mui/material';

// import NodePageBarContent from '../components/NodePage';
import { FallbackBoundary } from '../components/ui';

import ReceiptLogList from './ReceiptLogList';
import ReceiptOverview from './ReceiptOverview';
import TransactionOverview from './TransactionOverview';

export default function TransactionView({ nodeId }: { nodeId: Transaction['id'] }) {
  const node = useNode<Transaction>(nodeId);
  const receipt = useNode<Receipt>(node.receiptId);

  return (
    <Grid container spacing={1} padding={1}>
      <Grid item xs={12}>
        <Paper>
          <Stack direction="row" padding={2} spacing={2}>
            {/* <NodePageBarContent node={node} /> */}
          </Stack>
          <Divider />
          <FallbackBoundary>
            <TransactionOverview node={node} />
          </FallbackBoundary>
          <Divider />
          <FallbackBoundary>
            <ReceiptOverview receipt={receipt} />
          </FallbackBoundary>
          <Divider />
          <FallbackBoundary>
            <ReceiptLogList receipt={receipt} />
          </FallbackBoundary>
        </Paper>
      </Grid>
    </Grid>
  );
}
