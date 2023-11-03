import type { Log } from '@ethgate/lib-solver';
import { Divider, Grid, Paper, Stack } from '@mui/material';

//import NodePageBarContent from '../components/NodePage.js';
import { FallbackBoundary } from '../components/ui.js';

import LogOverview from './LogOverview.js';

export default function LogView({ node }: { node: Log }) {
  return (
    <Grid container spacing={1} padding={1}>
      <Grid item xs={12}>
        <Paper>
          <Stack direction="row" padding={2} spacing={2}>
            {/* <NodePageBarContent node={node} /> */}
          </Stack>
          <Divider />
          <FallbackBoundary>
            <LogOverview node={node} />
          </FallbackBoundary>
        </Paper>
      </Grid>
    </Grid>
  );
}
