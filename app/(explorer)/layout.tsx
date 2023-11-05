'use server';
import type { Metadata, Viewport } from 'next';

import ClientProvider from '../client/AppProvider';
import Blah from '../client/Blah';

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

export default async function ExplorerLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientProvider>
      <Blah>{children}</Blah>
    </ClientProvider>
  );
}
