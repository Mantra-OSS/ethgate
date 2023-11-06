import { Divider, Paper, Stack, Typography } from '@mui/material';

import type { SolverNode } from '../../solver/data';

import { FallbackBoundary } from './ui';

export function NodePage({ node, children }: { node: SolverNode; children: React.ReactNode }) {
  return <>{children}</>;
}

export function NodePageSection({
  node,
  title,
  actions,
  children,
}: {
  node: SolverNode;
  title: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Paper>
      {children}
    </Paper>
  );
}


export function NodePageConnectionSection({
  node,
  title,
  actions,
  children,
}: {
  node: SolverNode;
  title: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Paper>
      <Stack direction="row" alignItems="center" px={1} py={0.5}>
        <Typography variant="h3" pl={1} flex={1}>
          {title}
        </Typography>
        {actions}
      </Stack>
      <Divider />
      <FallbackBoundary>{children}</FallbackBoundary>
    </Paper>
  );
}
