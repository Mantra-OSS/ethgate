import { Avatar, CircularProgress } from '@mui/material';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export function FallbackBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary fallbackRender={({ error }) => <div>{error.message}</div>}>
      <Suspense fallback={<CircularProgress />}>{children}</Suspense>
    </ErrorBoundary>
  );
}

export function NodeAvatar({
  chainId,
  chainName,
  children,
}: {
  chainId: string;
  chainName: string;
  children: React.ReactNode;
}) {
  // Make route for png or svg file.
  return (
    <Avatar alt={`${chainName} logo`} src={`/statics/${chainId}.svg`}>
      {children}
    </Avatar>
  );
}
