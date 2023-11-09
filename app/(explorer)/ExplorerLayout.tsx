import { GitHub, NavigateNext, Telegram, Twitter } from '@mui/icons-material';
import type { Theme, ThemeOptions } from '@mui/material';
import {
  Alert,
  AppBar,
  Box,
  Breadcrumbs,
  Button,
  IconButton,
  Link,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { usePathname } from 'next/navigation';

import ClientProvider from '../client/AppProvider';
import { AppBreadcrumbs } from '../client/breadcrumbs';

import EthgateLogo from './EthgateLogo';

export default async function ExplorerLayout({
  themeOptions,
  children,
  nav,
}: {
  themeOptions?: ThemeOptions;
  children: React.ReactNode;
  nav?: React.ReactNode;
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
            {nav ?? <AppBreadcrumbs />}
            <Box flex={1} />
            <Stack direction="row" spacing={2} alignItems="center">
              <Button href="/about">About</Button>
              <Socials />
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
            <Socials />
          </Stack>
        </Paper>
      </Box>
    </ClientProvider>
  );
}

// function Navigation(props: { children: React.ReactNode }) {
//   const path = usePathname().split('/');
//   const matches = path.map((base, i) => ({
//     title: base.length ? base : 'ethgate.io',
//     href: i === 0 ? '/' : path.slice(0, i + 1).join('/'),
//   }));

//   return (
//     <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb">
//       {matches.map((match, i) => (
//         <Link key={i} href={`${match.href as any}` as any}>
//           <Typography variant="h5" color="primary">
//             {match.title}
//           </Typography>
//         </Link>
//       ))}
//       {props.children}
//     </Breadcrumbs>
//   );
// }

function Socials() {
  return (
    <>
      <IconButton href="https://github.com/mantra-oss/" target="_blank" color={'primary'}>
        <GitHub />
      </IconButton>
      <IconButton href="https://t.me/ethgate_io" target="_blank" color={'primary'}>
        <Telegram />
      </IconButton>
      <IconButton href="https://twitter.com/ethgate_io" target="_blank" color={'primary'}>
        <Twitter />
      </IconButton>
    </>
  );
}
