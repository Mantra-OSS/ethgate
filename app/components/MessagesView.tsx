import { Paper, Stack, Typography } from '@mui/material';

export default function MessagesView() {
  return (
    <Paper>
      <Stack direction="column" padding={2} spacing={2}>
        <Typography variant="h4" textAlign="center">
          Messages
        </Typography>
        <Typography variant="body1" textAlign="center">
          Here you will talk to other punkers with peer-to-peer technology.
        </Typography>
        <Typography variant="h2" fontWeight="bold" textAlign="center">
          Coming Soon...
        </Typography>
      </Stack>
    </Paper>
  );
}
