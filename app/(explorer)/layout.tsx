import type { Metadata, Viewport } from 'next';

import { NowProvider } from '../components/now';
import { getNow } from '../server/now';

import BaseThemeProvider from './layout.client';

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'ethgate.io',
    description: 'Block explorer for Ethereum and friends',
  };
}

// https://nextjs.org/docs/app/api-reference/functions/generate-viewport
export async function generateViewport(): Promise<Viewport> {
  return {
    // themeColor: '#000000',
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  const now = getNow();
  // console.log({ now });
  return (
    <BaseThemeProvider>
      {/* <NowProvider value={now}>{children}</NowProvider> */}
      {children}
    </BaseThemeProvider>
  );
}
