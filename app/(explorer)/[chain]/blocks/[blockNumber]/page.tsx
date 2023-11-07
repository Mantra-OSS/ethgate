import Blah from '@/app/client/Blah';
import BlockView from '@/app/components/BlockView';
import { readAksharaNode } from '@/app/server/akshara.server';
import { chains } from '@mantra-oss/chains';
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

import type { AksharaBlockKey } from '../../../../../akshara/spec/db';

export type Params = { chain: string; blockNumber: string };
export type Props = { params: Params; searchParams: object };

export async function keyFromParams(params: Params): Promise<AksharaBlockKey & { type: 'Block' }> {
  const chain = Object.values(chains).find(
    (chain) => chain.chainId === params.chain || chain.meta.slug === params.chain,
  );
  if (!chain) notFound();
  return { type: 'Block', chainId: chain.chainId, number: parseInt(params.blockNumber, 10) };
}

// export async function generateStaticParams(): Promise<Params[]> {
//   return Object.keys(paramToKey).map((param) => ({ chain: param }));
// }

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const node = await readAksharaNode(await keyFromParams(params));
  return {
    title: node.meta.name,
  };
}

export default async function BlockPage({ params }: Props) {
  const node = await readAksharaNode(await keyFromParams(params));
  return (
    <Blah node={node.toObject()}>
      <BlockView node={node.toObject()} />
    </Blah>
  );
}
