import { getSolver } from '@/app/server/backend';
import { NextResponse } from 'next/server';

type Params = { chain: string; path?: string[] };
type Props = { params: Params; searchParams: object };

export async function GET(request: Request, { params }: Props) {
  const solver = await getSolver();
  const node = await solver.resolvePath(['chains', params.chain, ...(params.path ?? [])]);
  // TODO: connection args handling
  return NextResponse.json(node);
}
