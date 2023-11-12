import { getSolver } from '@/app/server/backend';
import type { PageArgs } from '@/lib-solver';
import { notFound } from 'next/navigation';
import { NextResponse } from 'next/server';

type Params = { nodeId: string; connectionName: string };
type SearchParams = PageArgs<any>;
type Props = { params: Params; searchParams?: SearchParams };

export async function GET(request: Request, { params, searchParams }: Props) {
  const solver = getSolver();
  const node = await solver.database.readNode(params.nodeId as any);
  const edgeTypes = solver.graph.getEdgeTypesForNode(node.type);
  const edgeType = edgeTypes.find((edgeType) => edgeType.connectionName === params.connectionName);
  if (!edgeType) notFound();
  const connection = await solver.database
    .getConnection(
      edgeType.typeName,
      node.id,
      searchParams ?? {
        first: 10,
      },
    )
    .collect();
  return NextResponse.json(connection);
}
