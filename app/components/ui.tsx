import { CircularProgress } from '@mui/material';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export function FallbackBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary fallbackRender={({ error }) => <div>{error.message}</div>}>
      <Suspense fallback={<CircularProgress />}>{children}</Suspense>
    </ErrorBoundary>
  );
}
