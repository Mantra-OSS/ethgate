import ChainView from '@/app/components/ChainView';
import { readObject } from '@/app/helpers/akshara.server';
import { chains } from '@mantra-oss/chains';
import type { Metadata } from 'next';

// TODO: Move this to @mantra-oss/chains
const chainSlugs: any = {
  '1': 'ethereum',
  '10': 'optimism',
  '324': 'zksync-era',
  '8453': 'base',
  '42161': 'arbitrum',
  '42170': 'arbitrum-nova',
  '534352': 'scroll',
};

const paramToKey = Object.fromEntries(
  Object.values(chains).flatMap((chain) => [
    [chain.chainId, { chainId: chain.chainId }],
    [chainSlugs[chain.chainId], { chainId: chain.chainId }],
  ]),
);

type Params = { chain: string };

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = false;

export async function generateStaticParams(): Promise<Params[]> {
  return Object.values(paramToKey);
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const nodeData = await readObject({
    type: 'Chain',
    ...paramToKey[params.chain],
  });
  return {
    title: nodeData?.name,
  };
}

export default async function ChainPage({ params }: { params: Params }) {
  console.log({ chains });
  const nodeData = await readObject({
    type: 'Chain',
    ...paramToKey[params.chain],
  });
  return <ChainView nodeData={nodeData} />;
}
