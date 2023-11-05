import ChainView from '@/app/components/ChainView';
import { readObject } from '@/app/helpers/akshara.server';
import { chains } from '@mantra-oss/chains';
import type { Metadata } from 'next';

const paramToKey = Object.fromEntries(
  Object.values(chains).flatMap((chain) => [
    [chain.chainId, { chainId: chain.chainId }],
    [chain.meta.slug, { chainId: chain.chainId }],
  ]),
);

type Params = { chain: string };

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = false;

export async function generateStaticParams(): Promise<Params[]> {
  return Object.keys(paramToKey).map((param) => ({ chain: param }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const nodeData = await readObject({
    type: 'Chain',
    ...paramToKey[params.chain],
  });
  return {
    title: nodeData?.meta.name,
  };
}

export default async function ChainPage({ params }: { params: Params }) {
  const nodeData = await readObject({
    type: 'Chain',
    ...paramToKey[params.chain],
  });
  return <ChainView nodeData={nodeData} />;
}
