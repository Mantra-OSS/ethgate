import LogView from '@/app/components/LogView';
import { readObject } from '@/app/helpers/akshara.server';
import type { Metadata } from 'next';

type Params = { chainId: string; blockNumber: string; transactionIndex: string; logIndex: string };

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const nodeData = await readObject({
    type: 'Log',
    chainId: params.chainId,
    blockNumber: parseInt(params.blockNumber, 10),
    transactionIndex: Number(params.transactionIndex),
    logIndex: Number(params.logIndex),
  });
  return {
    title: nodeData?.name,
  };
}

export default async function LogPage({ params }: { params: Params }) {
  const nodeData = await readObject({
    type: 'Log',
    chainId: params.chainId,
    blockNumber: parseInt(params.blockNumber, 10),
    transactionIndex: Number(params.transactionIndex),
    logIndex: Number(params.logIndex),
  });
  return <LogView nodeData={nodeData} />;
}
