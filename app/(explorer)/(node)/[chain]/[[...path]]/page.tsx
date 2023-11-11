import ConnectionPage from '@/app/components/ConnectionPage';
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
  const resolved = await solver.resolvePath(['chains', params.chain, ...(params.path ?? [])]);
  if (!resolved) notFound();
  switch (resolved[0]) {
    case 'node': {
      const [, node] = resolved;
      return {
        title: `${node.type}: ${node.meta.name}`,
        description: `${node.type} page for ${node.meta.name} on ethgate.io`,
        icons: '/icon',
        openGraph: {
          title: `${node.type}: ${node.meta.name}`,
          description: `${node.type} page for ${node.meta.name} on ethgate.io`,
        },
        twitter: {
          title: `${node.type}: ${node.meta.name}`,
          description: `${node.type} page for ${node.meta.name} on ethgate.io`,
        },
      };
    }
    case 'connection': {
      const [, node, edgeType] = resolved;
      // TODO: add edge type stuff to meta
      return {
        title: `${node.type}: ${node.meta.name}`,
        description: `${node.type} page for ${node.meta.name} on ethgate.io`,
        icons: '/icon',
        openGraph: {
          title: `${node.type}: ${node.meta.name}`,
          description: `${node.type} page for ${node.meta.name} on ethgate.io`,
        },
        twitter: {
          title: `${node.type}: ${node.meta.name}`,
          description: `${node.type} page for ${node.meta.name} on ethgate.io`,
        },
      };
    }
  }
}

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
      return <ConnectionPage node={{ ...node }} edgeTypeName={edgeType.name} />;
    }
  }
}
