import NodePage from '@/app/components/NodePage';
import { getSolver } from '@/app/server/backend';
import { chains } from '@mantra-oss/chains';
import type { Metadata } from 'next';

export type Params = { path: string[] };
export type Props = { params: Params; searchParams: object };

// // https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
// export const dynamic = false;
// export const dynamicParams = false;

export async function generateStaticParams(): Promise<Params[]> {
  return Object.values(chains).flatMap((chain) => [
    { path: [chain.chainId] },
    { path: [chain.meta.slug] },
  ]);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const solver = await getSolver();
  const node = await solver.solver.resolvePath(['chains', ...params.path]);
  return {
    title: node.meta.name,
  };
}

export default async function ChainPage({ params }: Props) {
  const solver = await getSolver();
  const node = await solver.solver.resolvePath(['chains', ...params.path]);
  return <NodePage node={{ ...node }} />;
}
