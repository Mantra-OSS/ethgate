'use client';

import { chains } from '@mantra-oss/chains';
import { NavigateNext } from '@mui/icons-material';
import { Breadcrumbs, Button, Menu, MenuItem, Typography, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import type { SolverNode } from '../../solver/graph';

import { useNode } from './backend';

export function AppBreadcrumbs() {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const pathName = usePathname();
  const path = pathName === '/' ? [''] : pathName.split('/');
  /*   const matches = path.map((base, i) => ({
    title: base.length ? base : 'ethgate.io',
    href: i === 0 ? '/' : path.slice(0, i + 1).join('/'),
  })); */

  const matches = path.map((base, i) => {
    if (i === 1) {
      const foundObject = Object.values(chains).find(
        (item) => item.meta && item.meta.slug === base,
      );
      if (foundObject) {
        return {
          title: foundObject.meta.name,
          href: path.slice(0, i + 1).join('/'),
        };
      } else {
        return {
          title: base.length ? base : 'ethgate.io',
          href: path.slice(0, i + 1).join('/'),
        };
      }
    } else {
      return {
        title: base.length ? base : 'ethgate.io',
        href: i === 0 ? '/' : path.slice(0, i + 1).join('/'),
      };
    }
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isMobile ? (
        <>
          {matches.length > 1 ? (
            <>
              <Button
                variant="outlined"
                id="menu-button"
                aria-controls={open ? 'menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                Menu
              </Button>
              <Menu
                id="menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'menu-button',
                }}
              >
                {matches.map((match, i) => (
                  <MenuItem key={i} onClick={handleClose}>
                    <Link href={`${match.href as any}` as any}>
                      <Typography
                        variant="h5"
                        color={match.title === 'ethgate.io' ? 'secondary' : 'primary'}
                      >
                        {match.title}
                      </Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            'ethgate.io'
          )}
        </>
      ) : (
        <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb">
          {matches.map((match, i) => (
            <Link key={i} href={`${match.href as any}` as any}>
              <Typography
                variant="h5"
                color={match.title === 'ethgate.io' ? 'secondary' : 'primary'}
              >
                {match.title}
              </Typography>
            </Link>
          ))}
        </Breadcrumbs>
      )}
    </>
  );
}

// export function NodeBreadcrumb({ nodeId }: { nodeId: SolverNode['id'] }) {
//   const node = useNode(nodeId);

//   return (
//     <Typography variant="h5" color="primary">
//       {node.meta.name}
//     </Typography>
//   );
// }
