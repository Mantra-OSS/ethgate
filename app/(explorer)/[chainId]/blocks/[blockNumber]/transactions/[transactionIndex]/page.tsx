import TransactionView from '@/app/components/TransactionView';
import { readObject } from '@/app/helpers/akshara.server';
import type { Metadata } from 'next';

type Params = { chainId: string; blockNumber: string; transactionIndex: string };

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const nodeData = await readObject({
    type: 'Transaction',
    chainId: params.chainId,
    blockNumber: parseInt(params.blockNumber, 10),
    transactionIndex: Number(params.transactionIndex),
  });
  return {
    title: nodeData?.name,
  };
}

export default async function TransactionPage({ params }: { params: Params }) {
  const nodeData = await readObject({
    type: 'Transaction',
    chainId: params.chainId,
    blockNumber: parseInt(params.blockNumber, 10),
    transactionIndex: Number(params.transactionIndex),
  });
  return <TransactionView nodeData={nodeData} />;
}
