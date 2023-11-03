/* eslint-disable @typescript-eslint/no-unused-vars */
import type { MetadataRoute } from 'next';

import { theme } from './components/theme';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ethgate.io',
    short_name: 'ethgate.io',
    description: 'Block explorer for Ethereum and friends',
    start_url: '/',
    display: 'standalone',
    // theme_color: theme.palette.primary.main,
    // background_color: theme.palette.background.default,
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/maskable-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}

// <link rel="apple-touch-icon" href="/apple-touch-icon-180x180.png" sizes="180x180" />
// <link rel="mask-icon" href="/maskable-icon-512x512.png" color="#FFFFFF" />
