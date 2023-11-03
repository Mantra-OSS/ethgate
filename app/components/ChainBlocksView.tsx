import type { Chain } from "@ethgate/lib-solver";
import { Divider, Grid, Paper, Stack, Typography } from "@mui/material";

//import NodePageBarContent from '../components/NodePage';
import { FallbackBoundary } from "../components/ui";

import ChainBlockList from "./ChainBlockList";
export default function ChainBlocksView({ node }: { node: Chain }) {
  return (
    <Grid container spacing={1} padding={1}>
      <Grid item xs={12}>
        <Paper>
          <Stack direction="row" padding={2} spacing={2}>
            {/* <NodePageBarContent node={node} /> */}
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper>
          <Stack direction="row">
            <Typography variant="h3" padding={1} textAlign="center">
              Blocks
            </Typography>
          </Stack>
          <Divider />
          <FallbackBoundary>
            <ChainBlockList chainId={node.id} />
          </FallbackBoundary>
        </Paper>
      </Grid>
    </Grid>
  );
}
