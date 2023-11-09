import { getSolver } from '@/app/server/backend';
import { notFound } from 'next/navigation';
import { NextResponse } from 'next/server';

type Params = { nodeId: string };
type Props = { params: Params; searchParams: object };

export async function GET(request: Request, { params, searchParams }: Props) {
  const solver = getSolver();
  const node = await solver.database.readNode(params.nodeId as any);
  return NextResponse.json(node);
}
