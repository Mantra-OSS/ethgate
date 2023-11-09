'use client';
import { NavigateNext } from '@mui/icons-material';
import { Breadcrumbs, Typography } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { SolverNode } from '../../solver/graph';

import { useNode } from './backend';

export function AppBreadcrumbs() {
  const path = usePathname().split('/');
  const matches = path.map((base, i) => ({
    title: base.length ? base : 'ethgate.io',
    href: i === 0 ? '/' : path.slice(0, i + 1).join('/'),
  }));

  return (
    <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb">
      {matches.map((match, i) => (
        <Link key={i} href={`${match.href as any}` as any}>
          <Typography variant="h5" color="primary">
            {match.title}
          </Typography>
        </Link>
      ))}
    </Breadcrumbs>
  );
}

export function NodeBreadcrumb({ nodeId }: { nodeId: SolverNode['id'] }) {
  const node = useNode(nodeId);

  return (
    <Typography variant="h5" color="primary">
      {node.meta.name}
    </Typography>
  );
}
