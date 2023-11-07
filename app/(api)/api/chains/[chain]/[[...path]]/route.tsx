import { readAksharaNode } from '@/app/server/akshara.server';
import { getSolver } from '@/app/server/backend';
import { chains } from '@mantra-oss/chains';
import { notFound } from 'next/navigation';
import { NextResponse } from 'next/server';

import type { AksharaChainKey } from '../../../../../../akshara/spec/db';

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
  const solver = await getSolver();

  const node = chain;
  // if (params.path){
  // for (let i = 0; i < params.path.length; i+=2) {
  //   const connectionName = params.path[i];
  //   const edgeType = solver.solver.graph.edgeTypes.find((edgeType) => edgeType.connectionName === connectionName);
  //   const headSlug = params.path[i + 1];

  //   if (headSlug) {
  //     const edge = await edgeType?.get(node.id, {
  //       isForward: true,
  //       after:
  //     }, ctx)
  //     const tail = node.connections[connectionName].find((node) => node.meta.slug === tailSlug);
  //     if (!tail) notFound();
  //     node = await readAksharaNode(tail);
  //   }

  // }}

  return NextResponse.json(node);
}
