import BlockView from '@/app/components/BlockView';
import { readObject } from '@/app/helpers/akshara.server';
import type { Metadata } from 'next';

type Params = { chainId: string; blockNumber: string };

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const nodeData = await readObject({
    type: 'Block',
    chainId: params.chainId,
    number: parseInt(params.blockNumber, 10),
  });
  return {
    title: nodeData?.name,
  };
}

export default async function BlockPage({ params }: { params: Params }) {
  const nodeData = await readObject({
    type: 'Block',
    chainId: params.chainId,
    number: parseInt(params.blockNumber, 10),
  });
  return <BlockView nodeData={nodeData} />;
}
