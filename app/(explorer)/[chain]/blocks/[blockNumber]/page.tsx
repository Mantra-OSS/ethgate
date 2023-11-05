import BlockView from '@/app/components/BlockView';
import { readObject } from '@/app/helpers/akshara.server';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { chainId: string; blockNumber: string };
  searchParams: object;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  console.log('generateMetadata', params, await parent);
  const nodeData = await readObject({
    type: 'Block',
    chainId: params.chainId,
    number: parseInt(params.blockNumber, 10),
  });
  return {
    title: nodeData?.name,
  };
}

export default async function BlockPage({ params }: Props) {
  const nodeData = await readObject({
    type: 'Block',
    chainId: params.chainId,
    number: parseInt(params.blockNumber, 10),
  });
  return <BlockView nodeData={nodeData} />;
}
