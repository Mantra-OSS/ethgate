'use client';
import { Settings } from '@mui/icons-material';
import {
  Alert,
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Grid,
  Link,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';

import ClientProvider from '../client/AppProvider';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import { FallbackBoundary } from '../components/ui';

import EthgateLogo from './EthgateLogo';
export default function ExplorerLayout({ children }: { children: React.ReactNode }) {
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
            <Typography variant="h5" color="primary">
              <Link href="/">Punker</Link>
            </Typography>
            <Box flex={1} />
            <w3m-button />
            <Button href="/settings">
              <Badge badgeContent={0} color="primary">
                <Settings color="action" />
              </Badge>
            </Button>
          </Toolbar>
          <Alert severity="warning">
            This is a beta! Send feedback here: <Link href="#">#</Link>
          </Alert>
        </AppBar>
        <FallbackBoundary>
          <Container maxWidth="xl">
            <Grid container spacing={1} padding={1}>
              <Grid item xs={3}>
                <Paper>
                  <FallbackBoundary>
                    <LeftSidebar />
                  </FallbackBoundary>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <FallbackBoundary>{children}</FallbackBoundary>
              </Grid>
              <Grid item xs={3}>
                <Paper>
                  <FallbackBoundary>
                    <RightSidebar />
                  </FallbackBoundary>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </FallbackBoundary>
      </Stack>
    </ClientProvider>
  );
}
