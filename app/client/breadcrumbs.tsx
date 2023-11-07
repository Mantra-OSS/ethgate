'use client';
import { NavigateNext } from '@mui/icons-material';
import { Breadcrumbs, Typography } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AppBreadcrumbs() {
  const path = usePathname().split('/');
  const matches = path.map((base, i) => ({
    title: base.length ? base : 'ethgate.io',
    href: path.slice(0, i + 1).join('/'),
  }));
  console.log(matches);

  return (
    <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb">
      {matches.map((match, i) => (
        <Link key={i} href={`${match.href as any}`}>
          <Typography variant="h5" color="primary">
            {match.title}
          </Typography>
        </Link>
      ))}
    </Breadcrumbs>
  );
}
