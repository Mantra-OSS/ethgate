import { Receipt, ViewInAr } from '@mui/icons-material';
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
  avatarType,
  chainId,
  children,
}: {
  avatarType: 'chain' | 'block' | 'transaction';
  chainId: string;
  children: React.ReactNode;
}) {
  // Make route for png or svg file.
  switch (avatarType) {
    case 'chain':
      return (
        <Avatar alt={`Number ${chainId} chain logo`} src={`/statics/${chainId}.svg`}>
          {children}
        </Avatar>
      );
    case 'block':
      return (
        <>
          <Avatar alt={`Number ${chainId} chain logo`} src={`/statics/1.svg`}>
            {children}
          </Avatar>
          <Avatar alt="Block Icon">
            <ViewInAr color="primary" />
          </Avatar>
        </>
      );
    case 'transaction':
      return (
        <>
          <Avatar alt={`Number ${chainId} chain logo`} src={`/statics/1.svg`}>
            {children}
          </Avatar>
          <Avatar alt="Transaction Icon">
            <Receipt color="primary" />
          </Avatar>
        </>
      );
    default:
      return (
        <Avatar alt={`Number chain logo`} src={`/statics/1.svg`}>
          {children}
        </Avatar>
      );
  }
}
