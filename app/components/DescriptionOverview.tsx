import { Email, Language, LocationOn } from '@mui/icons-material';
import { Chip, Skeleton, Stack, Typography } from '@mui/material';

export type DescriptionOverviewProps = {
  description: string;
  url: string;
  location: string;
  email: string;
};

export default function DescriptionOverview({ props }: { props: DescriptionOverviewProps }) {
  return (
    <Stack direction="column" padding={2}>
      <Typography variant="h4" color="GrayText">
        Description
      </Typography>
      <Typography variant="subtitle1">{props.description}</Typography>
      <Stack direction="row" justifyContent="center" paddingTop={2} gap={3} flexWrap={'wrap'}>
        <Chip color="primary" icon={<Language />} label={props.url} />
        <Chip icon={<LocationOn />} label={props.location} />
        <Chip icon={<Email />} label={props.email} />
      </Stack>
    </Stack>
  );
}

export function DescriptionOverviewSkeleton() {
  return (
    <Stack direction="column" padding={2}>
      <Skeleton width={150} height={30} />
      <Skeleton width={250} height={20} />
      <Stack direction="row" justifyContent="space-between" paddingTop={2}>
        <Skeleton width={100} height={35} />
        <Skeleton width={100} height={35} />
        <Skeleton width={100} height={35} />
      </Stack>
    </Stack>
  );
}
