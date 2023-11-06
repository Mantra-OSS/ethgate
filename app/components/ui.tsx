import { Receipt, ViewInAr, Article } from '@mui/icons-material';
import { Avatar, Box, CircularProgress } from '@mui/material';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export function FallbackContainer({ children }: { children: React.ReactNode }) {
  return (
    <Box alignSelf={'center'} justifySelf={'center'} m="auto">
      {children}
    </Box>
  );
}

export function FallbackBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      fallbackRender={({ error }) => <FallbackContainer>{error.message}</FallbackContainer>}
    >
      <Suspense
        fallback={
          <FallbackContainer>
            <CircularProgress />
          </FallbackContainer>
        }
      >
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}

export function NodeAvatar({
  avatarType,
  chainId,
  children,
}: {
  avatarType:
    | 'chain'
    | 'chain-block'
    | 'chain-transaction'
    | 'chain-log'
    | 'block'
    | 'transaction'
    | 'log';
  chainId?: string;
  children?: React.ReactNode;
}) {
  // Make route for png or svg file.
  switch (avatarType) {
    case 'block':
      return (
        <Avatar alt="Block Icon">
          <ViewInAr color="primary" />
        </Avatar>
      );
    case 'transaction':
      return (
        <Avatar alt="Transaction Icon">
          <Article color="primary" />
        </Avatar>
      );
    case 'log':
      return (
        <Avatar alt="Log Icon">
          <Receipt color="primary" />
        </Avatar>
      );
    case 'chain':
      return (
        <Avatar alt={`Number ${chainId} chain logo`} src={`/statics/${chainId}.svg`}>
          {children}
        </Avatar>
      );
    case 'chain-block':
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
    case 'chain-transaction':
      return (
        <>
          <Avatar alt={`Number ${chainId} chain logo`} src={`/statics/1.svg`}>
            {children}
          </Avatar>
          <Avatar alt="Transaction Icon">
            <Article color="primary" />
          </Avatar>
        </>
      );
    case 'chain-log':
      return (
        <>
          <Avatar alt={`Number ${chainId} chain logo`} src={`/statics/1.svg`}>
            {children}
          </Avatar>
          <Avatar alt="Log Icon">
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
