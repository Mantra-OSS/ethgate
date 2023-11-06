'use client';

import {
  Alert,
  AppBar,
  Button,
  CircularProgress,
  Container,
  Link,
  Typography,
} from '@mui/material';
import { Suspense } from 'react';
import type { FallbackProps } from 'react-error-boundary';
import { ErrorBoundary } from 'react-error-boundary';

import type { SolverNode } from '../../solver/data';

import AppBarContent from './AppBarContent';

export default function Blah({ node, children }: { node: SolverNode; children: React.ReactNode }) {
  return (
    <>
      {/* <AppFrameNotifications /> */}
      <AppBar position="sticky">
        <AppBarContent node={node} />
        <Alert severity="warning">
          This is a beta! Send feedback here:{' '}
          <Link href="https://forms.gle/RweA6zGf6LE1hjN49">
            https://forms.gle/RweA6zGf6LE1hjN49
          </Link>
        </Alert>
      </AppBar>
      <ErrorBoundary FallbackComponent={ErrorFallbackView}>
        <Suspense fallback={<SuspenseFallbackView />}>{children}</Suspense>
      </ErrorBoundary>
    </>
  );
}

function ErrorFallbackView({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <AppFrameFallbackContainer>
      <Typography>Error: {error.message}</Typography>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </AppFrameFallbackContainer>
  );
}

function SuspenseFallbackView() {
  return (
    <AppFrameFallbackContainer>
      <CircularProgress />
    </AppFrameFallbackContainer>
  );
}

function AppFrameFallbackContainer({ children }: { children: React.ReactNode }) {
  return (
    <Container style={{ textAlign: 'center', marginTop: 'auto', marginBottom: 'auto' }}>
      {children}
    </Container>
  );
}
