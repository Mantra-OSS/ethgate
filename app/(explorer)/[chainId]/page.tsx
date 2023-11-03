import ChainView from '@/app/components/ChainView';
import { readObject } from '@/app/helpers/akshara.server';
import { chains } from '@mantra-oss/chains';
import type { Metadata } from 'next';

type Params = { chainId: string };

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = false;

export async function generateStaticParams(): Promise<Params[]> {
  return Object.values(chains).map((chain) => ({
    chainId: chain.chainId,
  }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const nodeData = await readObject({
    type: 'Chain',
    ...params,
  });
  return {
    title: nodeData?.name,
  };
}

export default async function ChainPage({ params }: { params: Params }) {
  const nodeData = await readObject({
    type: 'Chain',
    ...params,
  });
  return <ChainView nodeData={nodeData} />;
}
