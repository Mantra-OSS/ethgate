import { MoreVert } from '@mui/icons-material';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import type { SolverNode } from '../../solver/data';

import { NodeAvatar } from './ui';

export default function NodePageBarContent({ node }: { node: SolverNode }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const pathname = usePathname();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <NodeAvatar
        avatarType={
          pathname.includes('logs')
            ? 'chain-log'
            : 'transactions'
            ? 'chain-transaction'
            : pathname.includes('blocks')
            ? 'chain-block'
            : 'chain'
        }
        chainId={node.data.chainId}
      >
        {node.meta.name
          .split(' ')
          .map((word: any) => word[0])
          .join('')}
      </NodeAvatar>
      <Typography variant="h4" flex={1}>
        {node.meta.name}
      </Typography>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <FormattedMessage id="NodePage.InspectQuery" defaultMessage="Inspect query" />
        </MenuItem>
      </Menu>
    </>
  );
}
