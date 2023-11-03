import type { Block } from '@ethgate/lib-solver';
import { Divider, Grid, Paper, Stack, Typography } from '@mui/material';

//import NodePageBarContent from '../components/NodePage.js';
import { FallbackBoundary } from '../components/ui.js';

import BlockLogList from './BlockLogList.js';
import BlockOverview from './BlockOverview.js';
import BlockTransactionList from './BlockTransactionList.js';

export default function BlockView({ node }: { node: Block }) {
  return (
    <>
      <Grid container spacing={1} padding={1}>
        <Grid item xs={12}>
          <Paper>
            <Stack direction="row" padding={2} spacing={2}>
              {/* <NodePageBarContent node={node} /> */}
            </Stack>
            <Divider />
            <FallbackBoundary>
              <BlockOverview node={node} />
            </FallbackBoundary>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <Typography variant="h3" padding={1} textAlign="center">
              Transactions
            </Typography>
            <Divider />
            <FallbackBoundary>
              <BlockTransactionList block={node} />
            </FallbackBoundary>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <Typography variant="h3" padding={1} textAlign="center">
              Logs
            </Typography>
            <Divider />
            <FallbackBoundary>
              <BlockLogList block={node} />
            </FallbackBoundary>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
