import { LinkedIn, Twitter } from '@mui/icons-material';
import { Box, Link, Paper, Stack, Typography } from '@mui/material';

export default function AppFooter() {
  return (
    <Box mx={1} mt="auto">
      <Paper>
        <Stack
          width="100%"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          padding={2}
        >
          <Typography>Copyright Mantra</Typography>
          <Stack direction="row" spacing={2}>
            <Link href="#twitter" target="_blank">
              <Twitter />
            </Link>
            <Link href="#linkedin" target="_blank">
              <LinkedIn />
            </Link>
          </Stack>

          <Link href="#terms">Terms of Service</Link>
        </Stack>
      </Paper>
    </Box>
  );
}
