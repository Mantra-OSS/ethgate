import NodeConnectionPage from '@/app/components/NodeConnectionPage';
import NodePage from '@/app/components/NodePage';
import { getSolver } from '@/app/server/backend';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import type { Props } from './layout';

// // https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
// export const dynamic = false;
// export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const solver = await getSolver();
  const resolved = await solver.solver.resolvePath(['chains', ...params.path]);
  if (!resolved) notFound();
  if (Array.isArray(resolved)) {
    const [tail, edgeType] = resolved;
    // TODO: edgeType
    return {
      title: `${tail.type}: ${tail.meta.name}`,
      description: `${tail.type} page for ${tail.meta.name} on ethgate.io`,
    };
  }
  const node = resolved;
  return {
    title: `${node.type}: ${node.meta.name}`,
    description: `${node.type} page for ${node.meta.name} on ethgate.io`,
  };
}

export default async function Page({ params }: Props) {
  const solver = await getSolver();
  const resolved = await solver.solver.resolvePath(['chains', ...params.path]);
  if (!resolved) notFound();
  if (Array.isArray(resolved)) {
    const [tail, edgeType] = resolved;
    return <NodeConnectionPage node={{ ...tail }} edgeTypeName={edgeType.name} />;
  }
  const node = resolved;
  return <NodePage node={{ ...node }} />;
}
