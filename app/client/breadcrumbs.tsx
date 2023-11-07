'use client';
import { Breadcrumbs, Typography } from '@mui/material';

import type { SolverNode } from '../../solver/data';
import { useNode } from '../helpers/hooks';
import Link from 'next/link';
import { NavigateNext } from '@mui/icons-material';
import { Suspense } from 'react';
import { usePathname } from 'next/navigation';

export function AppBreadcrumbs() {
  const path = usePathname().split('/');
  let matches = path.map((base, i) => ({
    title: base.length ? base : 'ethgate.io',
    href: path.slice(0, i + 1).join('/'),
  }));

  return (
    <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb">
      {matches.map((match, i) => (
        <Link key={i} href={match.href as any}>
          <Typography variant="h5" color="primary">
            {match.title}
          </Typography>
        </Link>
      ))}
    </Breadcrumbs>
  );
}
