import { readAksharaNode } from '@/app/server/akshara.server';
import { chains } from '@mantra-oss/chains';
import { notFound } from 'next/navigation';
import { NextResponse } from 'next/server';

import type { AksharaChainKey } from '../../../../../akshara/spec/db';

type Params = { chain: string; path?: string[] };
type Props = { params: Params; searchParams: object };

function keyFromParams(params: Params): AksharaChainKey & { type: 'Chain' } {
  const chain = Object.values(chains).find(
    (chain) => chain.chainId === params.chain || chain.meta.slug === params.chain,
  );
  if (!chain) notFound();
  return { type: 'Chain', chainId: chain.chainId };
}

export async function GET(request: Request, { params }: Props) {
  const chainKey = keyFromParams(params);
  const chain = await readAksharaNode(chainKey);

  if (params.path) {
    throw new Error('Not yet implemented');
    // for (let i = 0; i < params.path.length; i++) {
    //   const path = params.path.slice(0, i + 1);
    // }
  }

  return NextResponse.json(chain);
}
