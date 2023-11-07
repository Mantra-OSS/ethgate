'use client';
import { ArrowOutward } from '@mui/icons-material';
import { Box, Divider, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material';

import type { SolverNode } from '../../solver/data';

import { FallbackBoundary } from './ui';
import { FormattedMessage } from 'react-intl';

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
          <Tooltip title={<FormattedMessage id="Connection.viewAll" defaultMessage="View All" />}>
            <IconButton href={href} size="small" color="primary">
              <ArrowOutward />
            </IconButton>
          </Tooltip>
        </>
      }
    >
      <Stack
        minHeight={300}
        maxHeight={500}
        style={{
          overflowY: 'auto',
        }}
      >
        <FallbackBoundary>{children}</FallbackBoundary>
      </Stack>
      <Divider />
      <Box pt={1} />
    </NodePageSection>
  );
}
