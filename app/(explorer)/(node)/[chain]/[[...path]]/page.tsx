import ConnectionPage from '@/app/components/ConnectionPage';
import NodePage from '@/app/components/NodePage';
import { getSolver } from '@/app/server/backend';
import { notFound } from 'next/navigation';

import type { Props } from './layout';

export default async function Page({ params }: Props) {
  const solver = getSolver();
  const resolved = await solver.resolvePath(['chains', params.chain, ...(params.path ?? [])]);
  if (!resolved) notFound();
  switch (resolved[0]) {
    case 'node': {
      const [, node] = resolved;
      return <NodePage node={{ ...node }} />;
    }
    case 'connection': {
      const [, node, edgeType] = resolved;
      return <ConnectionPage node={{ ...node }} edgeTypeName={edgeType.typeName} />;
    }
  }
}
