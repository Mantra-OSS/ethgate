import Blah from '@/app/client/Blah';
import ChainView from '@/app/components/ChainView';
import { NodePage } from '@/app/components/NodePage';
import { readAksharaNode } from '@/app/server/akshara.server';
import { chains } from '@mantra-oss/chains';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import type { AksharaChainKey } from '../../../akshara/spec/db';

export type Params = { chain: string };
export type Props = { params: Params; searchParams: object };

export async function keyFromParams(params: Params): Promise<AksharaChainKey & { type: 'Chain' }> {
  const chain = Object.values(chains).find(
    (chain) => chain.chainId === params.chain || chain.meta.slug === params.chain,
  );
  if (!chain) notFound();
  return { type: 'Chain', chainId: chain.chainId };
}

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamic = false;
export const dynamicParams = false;

export async function generateStaticParams(): Promise<Params[]> {
  return Object.values(chains).flatMap((chain) => [
    { chain: chain.chainId },
    { chain: chain.meta.slug },
  ]);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const node = await readAksharaNode(await keyFromParams(params));
  return {
    title: node.meta.name,
  };
}

export default async function ChainPage({ params }: Props) {
  const node = await readAksharaNode(await keyFromParams(params));
  return (
    <NodePage node={node.toObject()}>
      <Blah node={node.toObject()}>
        <ChainView node={node.toObject()} />
      </Blah>
    </NodePage>
  );
}
