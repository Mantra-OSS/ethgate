'use client';

import { GitHub, Telegram, Twitter } from '@mui/icons-material';
import {
  Alert,
  AppBar,
  Box,
  Button,
  IconButton,
  Link,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';

import ClientProvider from '../client/AppProvider';
import { AppBreadcrumbs } from '../client/breadcrumbs';
import { FallbackBoundary } from '../components/ui';

import EthgateLogo from './EthgateLogo';
import Loading from './loading';

export default function ExplorerLayout({
  children,
  nav,
}: {
  children: React.ReactNode;
  nav?: React.ReactNode;
}) {
  const isMobile = useMediaQuery('(max-width: 600px)');

  return (
    <ClientProvider>
      <Stack role="banner" style={{ minHeight: '100vh' }}>
        <AppBar position="sticky">
          <Toolbar>
            <Box pr={2}>
              <Typography color="primary">
                <Link href="/">
                  <EthgateLogo width={32} height={32} color="#FFC107" />
                </Link>
              </Typography>
            </Box>
            {nav ?? <AppBreadcrumbs />}
            <Box flex={1} />
            <Stack direction="row" spacing={{ md: 2, xs: 0 }} alignItems="center">
              {/* {isMobile ? null : <Button href="/about">About</Button>} */}
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
        <FallbackBoundary>{children}</FallbackBoundary>
      </Stack>
      <Box p={1} pt={4} mt="auto">
        {/* <Paper> */}
        <Stack width="100%" direction="row" justifyContent="flex-end" padding={1}>
          <Socials />
        </Stack>
        {/* </Paper> */}
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
      <IconButton href="https://github.com/mantra-oss/" target="_blank" color="secondary">
        <GitHub />
      </IconButton>
      <IconButton href="https://t.me/ethgate_io" target="_blank" color="secondary">
        <Telegram />
      </IconButton>
      <IconButton href="https://twitter.com/ethgate_io" target="_blank" color="secondary">
        <Twitter />
      </IconButton>
    </>
  );
}
