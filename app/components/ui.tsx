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
  data,
  children,
}: {
  avatarType: 'chain' | 'block' | 'transaction';
  data: string;
  children: React.ReactNode;
}) {
  // Make route for png or svg file.
  switch (avatarType) {
    case 'chain':
      return (
        <Avatar alt={`Number ${data} chain logo`} src={`/statics/${data}.svg`}>
          {children}
        </Avatar>
      );
    case 'block':
      return (
        <Avatar alt={`Number chain logo`} src={`/statics/1.svg`}>
          {children}
        </Avatar>
      );
    case 'transaction':
      return (
        <Avatar alt={`Number chain logo`} src={`/statics/1.svg`}>
          {children}
        </Avatar>
      );
    default:
      return (
        <Avatar alt={`Number chain logo`} src={`/statics/1.svg`}>
          {children}
        </Avatar>
      );
  }
}
