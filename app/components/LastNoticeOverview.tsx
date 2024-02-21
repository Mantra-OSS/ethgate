import { Skeleton, Stack, Typography } from '@mui/material';

export default function LastNoticeOverview({ props }: { props: string }) {
  return (
    <Stack direction="column" padding={2} gap={2}>
      <Typography variant="h4" color="GrayText">
        Last Notice
      </Typography>
      <Typography variant="subtitle1">{props}</Typography>
    </Stack>
  );
}

export function LastNoticeOverviewSkeleton() {
  return (
    <Stack direction="column" padding={2} gap={2}>
      <Skeleton width={150} height={30} />
      <Skeleton width={250} height={20} />
    </Stack>
  );
}
