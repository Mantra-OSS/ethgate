import { createChainThemeOptions } from '@/app/components/theme';
import { getSolver } from '@/app/server/backend';
import { type ThemeOptions } from '@mui/material';
import { notFound } from 'next/navigation';

import type { Chain } from '../../../../solver/graph';
import type { Explorer } from '../../../../solver/graph/explorer';

import ChainThemeProvider from './layout.client';

// // // https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
// export const dynamic = false;
// export const dynamicParams = false;

export type Params = { chain: string; path?: string[] };
export type Props = { params: Params; searchParams?: object };

export async function generateStaticParams(): Promise<Params[]> {
  const solver = getSolver();
  const explorer = await solver.database.readNode<Explorer>('Explorer:');
  return Object.values(explorer.data.chains).flatMap((chain) =>
    [{ chain: chain.chainId }, { chain: chain.meta.slug }].flatMap((params) => [
      params,
      { ...params, path: ['blocks', '0'] },
    ]),
  );
}

export default async function Layout({
  params,
  children,
}: {
  params: Params;
  children: React.ReactNode;
}) {
  const solver = getSolver();
  const resolved = await solver.resolvePath(['chains', params.chain]);
  if (!resolved || resolved[0] !== 'node') notFound();
  const [, node] = resolved;
  let themeOptions: ThemeOptions | undefined;
  if (node.meta.chainId) {
    const chain = await solver.database.readNode<Chain>(node.meta.chainId);
    themeOptions = createChainThemeOptions(chain);
  }
  return <ChainThemeProvider themeOptions={themeOptions}>{children}</ChainThemeProvider>;
}
