import { GitHub, Twitter } from '@mui/icons-material';
import { Alert, AppBar, Box, Button, IconButton, Paper, Stack, Toolbar } from '@mui/material';
import type { Metadata, Viewport } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import ClientProvider from '../client/AppProvider';
import logo from '../client/logo.svg';

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
      <Stack role="banner" style={{ minHeight: '100vh' }}>
        <AppBar position="sticky">
          <Toolbar>
            <Image src={logo} alt="ethgate.io logo" width={32} height={32} />
            {nav}
            <Box flex={1} />
            <Stack direction="row" spacing={2} alignItems="center">
              <Button href="/about" color={'primary'}>
                About
              </Button>
              <IconButton href="https://github.com/mantra-oss/" target="_blank" color={'primary'}>
                <GitHub />
              </IconButton>
              <IconButton href="https://twitter.com/ethgate_io" target="_blank" color={'primary'}>
                <Twitter />
              </IconButton>
              {/* <ChangeLanguage /> */}
            </Stack>
          </Toolbar>
          <Alert severity="warning">
            This is a beta! Send feedback here:{' '}
            <Link href="https://forms.gle/RweA6zGf6LE1hjN49">
              https://forms.gle/RweA6zGf6LE1hjN49
            </Link>
          </Alert>
        </AppBar>
        {children}
      </Stack>
      <Box m={1} mt="auto">
        <Paper>
          <Stack width="100%" direction="row" justifyContent="flex-end" padding={1}>
            <IconButton href="https://github.com/mantra-oss/" target="_blank" color={'primary'}>
              <GitHub />
            </IconButton>
            <IconButton href="https://twitter.com/ethgate_io" target="_blank" color={'primary'}>
              <Twitter />
            </IconButton>
          </Stack>
        </Paper>
      </Box>
    </ClientProvider>
  );
}
