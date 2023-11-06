'use client';

import { Transaction } from '@/lib-solver';
import type { Receipt } from '@/lib-solver';
import { Divider, Grid, Paper, Stack } from '@mui/material';
import { usePathname, useRouter, useSelectedLayoutSegments } from 'next/navigation';

import { FallbackBoundary } from '../components/ui';
import { useNode } from '../helpers/hooks';

import NodePageBarContent from './NodePageBarContent';
import ReceiptLogList from './ReceiptLogList';
import ReceiptOverview from './ReceiptOverview';
import TransactionOverview from './TransactionOverview';

export default function TransactionView({ nodeData }: { nodeData: Transaction['data'] }) {
  const node = new Transaction(nodeData);
  const receipt = useNode<Receipt>(node.receiptId);
  const router = useRouter();
  const segments = useSelectedLayoutSegments();
  const pathname = usePathname();
  console.log({ pathname, segments, router });

  return (
    <Grid container spacing={1} padding={1}>
      <Grid item xs={12}>
        <Paper>
          <Stack direction="row" padding={2} spacing={2}>
            <NodePageBarContent node={node} />
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
