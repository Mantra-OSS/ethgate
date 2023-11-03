import type { AksharaChainKey } from '@/akshara';
import { formatChainId } from '@/akshara';
import AppProvider from '@/app/components/App';
import ChainView from '@/app/components/ChainView';
import { readNode } from '@/app/helpers/backend';
import type { Chain } from '@/solver';

export async function generateMetadata({ params }: { params: { chainId: string } }) {
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
