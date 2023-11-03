import { useNode } from '@/app/helpers/hooks';
import type { Receipt } from '@/lib-solver';
import { Typography } from '@mui/material';
import { Suspense } from 'react';

import ReceiptLogList from './ReceiptLogList';

//import ReceiptOverview from './ReceiptOverview';

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
