import type { Transaction } from '@ethgate/lib-solver';
import { useLoaderData } from 'react-router-dom';

import { useNode } from '../helpers/backend.js';
import TransactionView from '../nodes/TransactionView.js';

export default function TransactionPage() {
  const node = useNode<Transaction>(useLoaderData() as any);

  return <TransactionView node={node} />;
}
