import { getSolver } from '@/app/server/backend';
import { notFound } from 'next/navigation';

import ExplorerLayout from '../../../ExplorerLayout';

export type Params = { chain: string; path?: string[] };
export type Props = { params: Params; searchParams: object };

// export async function generateStaticParams(): Promise<Params[]> {
//   return Object.values(chains).flatMap((chain) => [
//     { path: [chain.chainId] },
//     { path: [chain.meta.slug] },
//   ]);
// }

export default async function Layout({
  params,
  children,
}: {
  params: Params;
  children: React.ReactNode;
}) {
  const solver = await getSolver();
  const resolved = await solver.resolvePath(['chains', params.chain, ...(params.path ?? [])]);
  if (!resolved) notFound();
  switch (resolved[0]) {
    case 'node': {
      const [, node] = resolved;
      return <ExplorerLayout>{children}</ExplorerLayout>;
    }
    case 'connection': {
      const [, tail, edgeType] = resolved;
      return <ExplorerLayout>{children}</ExplorerLayout>;
    }
  }
}
