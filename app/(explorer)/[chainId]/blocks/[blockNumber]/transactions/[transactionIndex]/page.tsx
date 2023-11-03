import type { AksharaTransactionKey } from '@/akshara';
import { formatTransactionId } from '@/akshara';
import TransactionView from '@/app/components/TransactionView';
import { readNode } from '@/app/helpers/backend';
import type { Transaction } from '@/solver';

export default async function TransactionPage({
  params,
}: {
  params: { chainId: string; blockNumber: string; transactionIndex: string };
}) {
  const { chainId, blockNumber, transactionIndex } = params;

  const key: AksharaTransactionKey = {
    chainId,
    blockNumber: parseInt(blockNumber, 10),
    transactionIndex: Number(transactionIndex),
  };
  const node = await readNode<Transaction>(`Transaction:${formatTransactionId(key)}`);
  return <TransactionView nodeId={node.id} />;
}
