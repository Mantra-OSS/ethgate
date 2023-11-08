import { AppBreadcrumbs } from '@/app/client/breadcrumbs';
import { getSolver } from '@/app/server/backend';
import { chains } from '@mantra-oss/chains';

import ExplorerLayout from '../../ExplorerLayout';

export type Params = { path: string[] };
export type Props = { params: Params; searchParams: object };

export async function generateStaticParams(): Promise<Params[]> {
  return Object.values(chains).flatMap((chain) => [
    { path: [chain.chainId] },
    { path: [chain.meta.slug] },
  ]);
}

export default async function Layout({
  params,
  children,
}: {
  params: Params;
  children: React.ReactNode;
}) {
  const solver = await getSolver();
  const node = await solver.solver.resolvePath(['chains', ...params.path]);
  return <ExplorerLayout nav={<AppBreadcrumbs />}>{children}</ExplorerLayout>;
}
