import LogView from '@/app/components/LogView';
import { readAksharaNode } from '@/app/server/akshara.server';
import { chains } from '@mantra-oss/chains';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import type { AksharaLogKey } from '../../../../../../../../../akshara/spec/db';

export type Params = {
  chain: string;
  blockNumber: string;
  transactionIndex: string;
  logIndex: string;
};
export type Props = { params: Params; searchParams: object };

export async function keyFromParams(params: Params): Promise<AksharaLogKey & { type: 'Log' }> {
  const chain = Object.values(chains).find(
    (chain) => chain.chainId === params.chain || chain.meta.slug === params.chain,
  );
  if (!chain) notFound();
  return {
    type: 'Log',
    chainId: chain.chainId,
    blockNumber: parseInt(params.blockNumber, 10),
    transactionIndex: parseInt(params.transactionIndex, 10),
    logIndex: parseInt(params.logIndex, 10),
  };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const node = await readAksharaNode(await keyFromParams(params));
  const chain = Object.values(chains).find(
    (chain) => chain.chainId === params.chain || chain.meta.slug === params.chain,
  );
  if (!chain) notFound();
  const metadata = {
    title: `Log: ${node.meta.name}`,
    description: `Log number ${node.meta.name} of chain number ${
      chain.chainId
    }, block number ${parseInt(params.blockNumber, 10)}, transaction index ${parseInt(
      params.transactionIndex,
      10,
    )}.`,
  };

  return {
    ...metadata,
    twitter: {
      ...metadata,
    },
  };
}

export default async function LogPage({ params }: { params: Params }) {
  const node = await readAksharaNode(await keyFromParams(params));
  return <LogView node={node.toObject()} />;
}
