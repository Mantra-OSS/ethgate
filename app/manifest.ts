import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ethgate.io',
    short_name: 'ethgate.io',
    description: 'Block explorer for Ethereum and friends',
    // start_url: '/',
    // display: 'standalone',
    // background_color: '#fff',
    // theme_color: '#fff',
    // icons: [
    //   {
    //     src: '/favicon.ico',
    //     sizes: 'any',
    //     type: 'image/x-icon',
    //   },
    // ],
  };
}
