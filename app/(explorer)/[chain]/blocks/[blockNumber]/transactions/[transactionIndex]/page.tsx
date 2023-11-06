import Blah from '@/app/client/Blah';
import TransactionView from '@/app/components/TransactionView';
import { readAksharaNode } from '@/app/helpers/akshara.server';
import { chains } from '@mantra-oss/chains';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import type { AksharaTransactionKey } from '../../../../../../../akshara/spec/db';

export type Params = { chain: string; blockNumber: string; transactionIndex: string };
export type Props = { params: Params; searchParams: object };

export async function keyFromParams(
  params: Params,
): Promise<AksharaTransactionKey & { type: 'Transaction' }> {
  const chain = Object.values(chains).find(
    (chain) => chain.chainId === params.chain || chain.meta.slug === params.chain,
  );
  if (!chain) notFound();
  return {
    type: 'Transaction',
    chainId: chain.chainId,
    blockNumber: parseInt(params.blockNumber, 10),
    transactionIndex: parseInt(params.transactionIndex, 10),
  };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const node = await readAksharaNode(await keyFromParams(params));
  return {
    title: node.meta.name,
  };
}

export default async function TransactionPage({ params }: { params: Params }) {
  const node = await readAksharaNode(await keyFromParams(params));
  return (
    <Blah node={node.toObject()}>
      <TransactionView node={node.toObject()} />
    </Blah>
  );
}
