import { useNode } from '@/app/helpers/hooks';
import { NavigateNext } from '@mui/icons-material';
import { Box, Breadcrumbs, Link, Stack, Toolbar, Typography } from '@mui/material';
import Image from 'next/image';
import { Suspense } from 'react';

import ChangeLanguage from './ChangeLanguage';
import logo from './logo.svg';

export type RouteCrumb = {
  id: string;
  pathname: string;
  isCurrentPage: boolean;
  title?: string;
  nodeId?: string;
};

function AppBarContentBreadcrumbNode({ id, crumb }: { id: string; crumb: RouteCrumb }) {
  const node = useNode(id as any);

  return <>{(node as any).meta.name}</>;
}

function AppBreadcrumbs() {
  // const matches = useMatches() as RouteMatch[];
  const matches = [] as any[];
  const crumbs = matches
    .filter((match) => match.handle && match.handle!.crumb(match))
    .map((match, index) => ({
      id: String(index),
      pathname: match.pathname,
      isCurrentPage: index === matches.length - 1,
      ...match.handle!.crumb(match)!,
    })) satisfies RouteCrumb[];

  // TODO: Use this
  // crumb.isCurrentPage

  return (
    <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb">
      {crumbs.map((crumb) => (
        <Link key={crumb.id} href={crumb.pathname}>
          <Suspense>
            {crumb.nodeId ? (
              <AppBarContentBreadcrumbNode id={crumb.nodeId} crumb={crumb} />
            ) : (
              <Typography variant="h5" textAlign="center">
                {crumb.title}
              </Typography>
            )}
          </Suspense>
        </Link>
      ))}
    </Breadcrumbs>
  );
}

export default function AppBarContent() {
  return (
    <Toolbar>
      <Image src={logo} alt="ethgate.io logo" width={32} height={32} />
      <AppBreadcrumbs />
      <Box flex={1} />
      <Stack direction="row" spacing={2}>
        <Link href="https://github.com/mantra-oss/" target="_blank">
          <Typography variant="h5" padding={1} textAlign="center">
            GitHub
          </Typography>
        </Link>
        <ChangeLanguage />
      </Stack>
    </Toolbar>
  );
}
