import { GitHub, Twitter } from '@mui/icons-material';
import type { Theme, ThemeOptions } from '@mui/material';
import {
  Alert,
  AppBar,
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import Link from 'next/link';

import ClientProvider from '../client/AppProvider';

import EthgateLogo from './EthgateLogo';

export default async function ExplorerLayout({
  themeOptions,
  children,
  nav,
}: {
  themeOptions: ThemeOptions;
  children: React.ReactNode;
  nav: React.ReactNode;
}) {
  return (
    <ClientProvider themeOptions={themeOptions}>
      <Stack role="banner" style={{ minHeight: '100vh' }}>
        <AppBar position="sticky">
          <Toolbar>
            <Box pr={2}>
              <Typography color="primary">
                <EthgateLogo width={32} height={32} />
              </Typography>
            </Box>
            {nav}
            <Box flex={1} />
            <Stack direction="row" spacing={2} alignItems="center">
              <Button href="/about">About</Button>
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
