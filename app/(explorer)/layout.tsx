'use server';
import { Stack } from '@mui/material';
import type { Metadata, Viewport } from 'next';

import ClientProvider from '../client/AppProvider';

import AppFooter from './AppFooter';

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
      <Stack style={{ minHeight: '100vh' }}>
        {nav}
        {children}
      </Stack>
      <AppFooter />
    </ClientProvider>
  );
}
