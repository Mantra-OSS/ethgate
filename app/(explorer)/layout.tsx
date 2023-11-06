'use server';
import type { Metadata, Viewport } from 'next';

import ClientProvider from '../client/AppProvider';

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

export default async function ExplorerLayout({
  children,
  nav,
}: {
  children: React.ReactNode;
  nav: React.ReactNode;
}) {
  return (
    <ClientProvider>
      {nav}
      {children}
    </ClientProvider>
  );
}
