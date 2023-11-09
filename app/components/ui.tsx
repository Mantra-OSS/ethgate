import type { Chain, SolverNode } from '@/lib-solver';
import { Article, Receipt, ViewInAr } from '@mui/icons-material';
import { Avatar, Box } from '@mui/material';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import EthgateLogo from '../(explorer)/EthgateLogo';

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
            <EthgateLogo width={40} height={40} isLoading />
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
}
