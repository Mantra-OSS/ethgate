import { getSolver } from '@/app/server/backend';
import { notFound } from 'next/navigation';
import { NextResponse } from 'next/server';

import type { PageArgs } from '../../../../../../solver/graph';

type Params = { nodeId: string; connectionName: string };
type SearchParams = PageArgs<any>;
type Props = { params: Params; searchParams?: SearchParams };

export async function GET(request: Request, { params, searchParams }: Props) {
  const solver = await getSolver();
  const node = await solver.solver.database.readNode(params.nodeId as any);
  const edgeTypes = solver.solver.graph.getEdgeTypesForNode(node.type);
  const edgeType = edgeTypes.find((edgeType) => edgeType.connectionName === params.connectionName);
  if (!edgeType) notFound();
  const connection = await solver.solver.database
    .getConnection(
      edgeType.name,
      node.id,
      searchParams ?? {
        first: 10,
      },
    )
    .collect();
  return NextResponse.json(connection);
}
