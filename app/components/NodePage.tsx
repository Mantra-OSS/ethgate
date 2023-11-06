import { ArrowOutward } from '@mui/icons-material';
import { Divider, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material';

import type { SolverNode } from '../../solver/data';

import { FallbackBoundary } from './ui';

export function NodePage({ node, children }: { node: SolverNode; children: React.ReactNode }) {
  return <>{children}</>;
}

export function NodePageSection({
  title,
  actions,
  children,
}: {
  title: React.ReactNode;
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

export function NodePageConnectionSection({
  title,
  href,
  children,
}: {
  title: React.ReactNode;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <NodePageSection
      title={title}
      actions={
        <>
          <Tooltip title="View All">
            <IconButton href={href} size="small" aria-label="view all" color="primary">
              <ArrowOutward />
            </IconButton>
          </Tooltip>
        </>
      }
    >
      {children}
    </NodePageSection>
  );
}
