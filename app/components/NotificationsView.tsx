import { Paper, Stack, Typography } from '@mui/material';

export default function NotificationsView() {
  return (
    <Paper>
      <Stack direction="column" padding={2} spacing={2}>
        <Typography variant="h4" textAlign="center">
          Notifications
        </Typography>
        <Typography variant="body1" textAlign="center">
          Here you will see notifications.
        </Typography>
        <Typography variant="h2" fontWeight="bold" textAlign="center">
          Coming Soon...
        </Typography>
      </Stack>
    </Paper>
  );
}
