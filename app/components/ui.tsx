import type { Chain, SolverNode } from '@/lib-solver';
import { Article, Receipt, ViewInAr } from '@mui/icons-material';
import type { SvgIconTypeMap } from '@mui/material';
import { Avatar, Box, Button, Divider, Paper, Stack } from '@mui/material';
import type { DefaultComponentProps } from '@mui/material/OverridableComponent';
import { Suspense } from 'react';
import type { FallbackProps } from 'react-error-boundary';
import { ErrorBoundary } from 'react-error-boundary';
import { graphql } from 'relay-runtime';

import EthgateLogo from '../(explorer)/EthgateLogo';
import { useNode2, useSolver } from '../client/backend';

export function FallbackContainer({ children }: { children: React.ReactNode }) {
  return (
    <Box alignSelf={'center'} justifySelf={'center'} m="auto">
      {children}
    </Box>
  );
}

export function ErrorFallback(props: FallbackProps) {
  return (
    <FallbackContainer>
      <code>{props.error.message}</code>
      <Button onClick={props.resetErrorBoundary}>Retry</Button>
    </FallbackContainer>
  );
}

export function SuspenseFallback() {
  return (
    <FallbackContainer>
      <Box
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '1rem',
        }}
      >
        <EthgateLogo width={40} height={40} isLoading />
      </Box>
    </FallbackContainer>
  );
}

export function FallbackBoundary({
  suspenseFallback,
  children,
}: {
  suspenseFallback?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={suspenseFallback ?? <SuspenseFallback />}>{children}</Suspense>
    </ErrorBoundary>
  );
}

export function NodeTypeIcon({
  nodeType,
  ...iconProps
}: { nodeType: SolverNode['type'] } & DefaultComponentProps<SvgIconTypeMap<{}, 'svg'>>) {
  switch (nodeType) {
    case 'Chain': {
      return <ViewInAr {...iconProps} />;
    }
    case 'Block': {
      return <ViewInAr {...iconProps} />;
    }
    case 'Transaction': {
      return <Article {...iconProps} />;
    }
    case 'Receipt': {
      return <Article {...iconProps} />;
    }
    case 'Log': {
      return <Receipt {...iconProps} />;
    }
    default: {
      throw new Error(`Unknown node type: ${nodeType}`);
    }
  }
}

/** @deprecated */
export function NodeAvatar2({ nodeId }: { nodeId: SolverNode['id'] }) {
  const solver = useSolver();
  const nodeType = solver.graph.getNodeTypeById(nodeId);
  const node = useNode2(nodeId);
  let imageSrc;
  let body;
  if (node) {
    imageSrc = node.meta.imageUrl;

    if (!imageSrc) {
      // TODO: Add API routes for node images
      switch (node.type) {
        case 'Chain': {
          imageSrc = `/statics/${(node as Chain).data.chainId}.svg`;
          break;
        }
        case 'Block':
        case 'Transaction':
        case 'Receipt':
        case 'Log': {
          body = <NodeTypeIcon nodeType={node.type} color="primary" sx={{ fontSize: 22 }} />;
          break;
        }
      }
    }
  }
  return (
    <Suspense
      fallback={
        <Avatar sx={{ width: 32, height: 32 }}>
          <NodeTypeIcon nodeType={nodeType.name} color="primary" sx={{ fontSize: 22 }} />
        </Avatar>
      }
    >
      {node ? (
        <Avatar sx={{ width: 32, height: 32 }} alt={node.meta.name} src={imageSrc}>
          {body ??
            node.meta.name
              .split(' ')
              .map((word) => word[0])
              .join('')}
        </Avatar>
      ) : (
        <Avatar sx={{ width: 32, height: 32 }}>
          <NodeTypeIcon nodeType={nodeType.name} color="primary" sx={{ fontSize: 22 }} />
        </Avatar>
      )}
    </Suspense>
  );
}

export function FormattedHex({ value }: { value: string }) {
  return (
    <>
      {value.slice(0, 4)}...{value.slice(-4)}
    </>
  );
}

export function Section({
  title,
  actions,
  children,
}: {
  title?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Paper component="section">
      <Stack component="header" direction="row" alignItems="center" p={1} pl={2}>
        {title}
        <Box flex={1} />
        {actions}
      </Stack>
      <Divider />
      <FallbackBoundary>{children}</FallbackBoundary>
    </Paper>
  );
}
