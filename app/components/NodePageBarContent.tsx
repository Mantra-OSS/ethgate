import { MoreVert } from '@mui/icons-material';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import type { SolverNode } from '../../solver/graph';

import { NodeAvatar } from './ui';

export default function NodePageBarContent({ node }: { node: SolverNode }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <NodeAvatar node={node} />
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
