import type { Receipt } from '@ethgate/lib-solver';
import { Typography } from '@mui/material';
import { Suspense } from 'react';

import { useNode } from '../helpers/backend.js';

import ReceiptLogList from './ReceiptLogList.js';
//import ReceiptOverview from './ReceiptOverview.js';

export default function ReceiptView({ nodeId }: { nodeId: Receipt['id'] }) {
  const node = useNode<Receipt>(nodeId);

  return (
    <>
      <Suspense fallback={<Typography>Loading...</Typography>}>
        {/* <ReceiptOverview nodeId={node.id} /> */}
      </Suspense>
      <Suspense fallback={<Typography>Loading...</Typography>}>
        <ReceiptLogList receipt={node} />
      </Suspense>
    </>
  );
}
