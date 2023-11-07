import { Article, Receipt, ViewInAr } from '@mui/icons-material';
import { Avatar, Box, CircularProgress } from '@mui/material';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import type { Chain, SolverNode } from '../../solver/data';

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

export function NodeAvatar({ node }: { node: SolverNode }) {
  let imageSrc = node.meta.imageUrl;
  let body;
  if (!imageSrc) {
    // TODO: Add API routes for node images
    switch (node.type) {
      case 'Chain': {
        imageSrc = `/statics/${(node as Chain).data.chainId}.svg`;
        break;
      }
      case 'Block': {
        body = <ViewInAr color="primary" />;
        break;
      }
      case 'Transaction': {
        body = <Article color="primary" />;
        break;
      }
      case 'Receipt': {
        body = <Article color="primary" />;
        break;
      }
      case 'Log': {
        body = <Receipt color="primary" />;
        break;
      }
    }
  }
  return (
    <Avatar alt={node.meta.name} src={imageSrc}>
      {body ??
        node.meta.name
          .split(' ')
          .map((word) => word[0])
          .join('')}
    </Avatar>
  );
  // case 'chain-block':
  //   return (
  //     <>
  //       <Avatar alt={`Number ${chainId} chain logo`} src={`/statics/1.svg`}>
  //         {children}
  //       </Avatar>
  //       <Avatar alt="Block Icon">
  //         <ViewInAr color="primary" />
  //       </Avatar>
  //     </>
  //   );
  // case 'chain-transaction':
  //   return (
  //     <>
  //       <Avatar alt={`Number ${chainId} chain logo`} src={`/statics/1.svg`}>
  //         {children}
  //       </Avatar>
  //       <Avatar alt="Transaction Icon">
  //         <Article color="primary" />
  //       </Avatar>
  //     </>
  //   );
  // case 'chain-log':
  //   return (
  //     <>
  //       <Avatar alt={`Number ${chainId} chain logo`} src={`/statics/1.svg`}>
  //         {children}
  //       </Avatar>
  //       <Avatar alt="Log Icon">
  //         <Receipt color="primary" />
  //       </Avatar>
  //     </>
  //   );
  // default:
  //   return (
  //     <Avatar alt={`Number chain logo`} src={`/statics/1.svg`}>
  //       {children}
  //     </Avatar>
  //   );
}
