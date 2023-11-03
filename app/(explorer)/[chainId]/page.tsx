import type { AksharaChainKey } from '@/akshara';
import { formatChainId } from '@/akshara';
import ChainView from '@/app/components/ChainView';
import { readNode } from '@/app/helpers/backend';
import type { Chain } from '@/solver';
import type { Metadata } from 'next';

// export async function generateStaticParams() {
//   const chains = ['1', '10'];

//   return chains.map((chain) => ({
//     chainId: chain.data.chainId,
//   }))
// }

export async function generateMetadata({
  params,
}: {
  params: { chainId: string };
}): Promise<Metadata> {
  const { chainId } = params;

  const key: AksharaChainKey = {
    chainId,
  };
  const node = await readNode<Chain>(`Chain:${formatChainId(key)}`);
  return {
    title: node.meta.name,
  };
}

export default async function ChainPage({ params }: { params: { chainId: string } }) {
  const { chainId } = params;

  const key: AksharaChainKey = {
    chainId,
  };
  const node = await readNode<Chain>(`Chain:${formatChainId(key)}`);
  return <ChainView nodeId={node.id} />;
}
