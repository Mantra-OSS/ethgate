import type { AksharaChainKey } from '@/akshara';
import ChainView from '@/app/components/ChainView';
import { createAkshara } from '@/app/helpers/akshara.server';
import { chains } from '@mantra-oss/chains';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return Object.values(chains).map((chain) => ({
    chainId: chain.chainId,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { chainId: string };
}): Promise<Metadata> {
  const { chainId } = params;

  const key: AksharaChainKey = {
    chainId,
  };
  const akshara = await createAkshara();
  const nodeData = await akshara.getChain(key);
  return {
    title: nodeData?.name,
  };
}

export default async function ChainPage({ params }: { params: { chainId: string } }) {
  const { chainId } = params;

  const key: AksharaChainKey = {
    chainId,
  };
  const akshara = await createAkshara();
  const nodeData = await akshara.getChain(key);
  if (!nodeData) throw new Error(`Chain not found: ${JSON.stringify(key)}`);
  return <ChainView nodeData={nodeData} />;
}
