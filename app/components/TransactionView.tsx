import type { Receipt, Transaction } from '@ethgate/lib-solver';
import { Divider, Grid, Paper, Stack } from '@mui/material';

// import NodePageBarContent from '../components/NodePage.js';
import { FallbackBoundary } from '../components/ui.js';
import { useNode } from '../helpers/backend.js';

import ReceiptLogList from './ReceiptLogList.js';
import ReceiptOverview from './ReceiptOverview.js';
import TransactionOverview from './TransactionOverview.js';

export default function TransactionView({ node }: { node: Transaction }) {
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
