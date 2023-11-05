import { Typography } from '@mui/material';

import type { SolverNode } from '../../solver/data';

export function NodeBreadcrumb({ node }: { node: SolverNode }) {
  return (
    <Typography variant="h5" textAlign="center">
      {node.meta.name}
    </Typography>
  );
}
