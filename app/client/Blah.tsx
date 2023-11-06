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

import type { SolverNode } from '../../solver/data';

import AppBarContent from './AppBarContent';
import { FallbackBoundary } from '../components/ui';

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
      <FallbackBoundary>{children}</FallbackBoundary>
    </>
  );
}
