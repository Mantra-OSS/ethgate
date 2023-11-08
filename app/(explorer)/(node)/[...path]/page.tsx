import NodePage from '@/app/components/NodePage';
import { getSolver } from '@/app/server/backend';
import type { Metadata } from 'next';

import type { Props } from './layout';

// // https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
// export const dynamic = false;
// export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const solver = await getSolver();
  const node = await solver.solver.resolvePath(['chains', ...params.path]);
  return {
    title: `${node.type}: ${node.meta.name}`,
    description: `${node.type} page for ${node.meta.name} on ethgate.io`,
  };
}

export default async function Page({ params }: Props) {
  const solver = await getSolver();
  const node = await solver.solver.resolvePath(['chains', ...params.path]);
  return <NodePage node={{ ...node }} />;
}
