/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNode } from '@/app/helpers/hooks';
import { NavigateNext } from '@mui/icons-material';
import { Box, Breadcrumbs, Link, Stack, Toolbar, Typography } from '@mui/material';
import Image from 'next/image';
import { useSelectedLayoutSegments } from 'next/navigation';
import { Suspense } from 'react';

import type { SolverNode } from '../../solver/data';

import ChangeLanguage from './ChangeLanguage';
import logo from './logo.svg';

export type RouteCrumb = {
  id: string;
  pathname: string;
  isCurrentPage: boolean;
  title?: string;
  nodeId?: string;
};

function AppBarContentBreadcrumbNode({ id }: { id: string }) {
  const node = useNode(id as any);

  return <>{node.meta.name}</>;
}

function AppBreadcrumbs({ node }: { node: SolverNode }) {
  const asd = useSelectedLayoutSegments();
  console.log(asd);
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
      <Link href={'asd'}>
        <Suspense>
          <Typography variant="h5" textAlign="center">
            ethgate.io
          </Typography>
        </Suspense>
      </Link>
      {node.meta.path.map((nodeId) => (
        <Link key={nodeId} href={'asd'}>
          <Suspense>
            <Typography variant="h5" textAlign="center">
              <AppBarContentBreadcrumbNode id={nodeId} />
            </Typography>
          </Suspense>
        </Link>
      ))}
    </Breadcrumbs>
  );
}

export default function AppBarContent({ node }: { node: SolverNode }) {
  return (
    <Toolbar>
      <Image src={logo} alt="ethgate.io logo" width={32} height={32} />
      <AppBreadcrumbs node={node} />
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
