import { Typography } from '@mui/material';

import type { NodeAbstract } from '../../solver/data';

export function NodeBreadcrumb({ node }: { node: NodeAbstract }) {
  return (
    <Typography variant="h5" textAlign="center">
      {node.meta.name}
    </Typography>
  );
}
