import { Apps, GitHub, LinkedIn, Telegram, Twitter } from '@mui/icons-material';
import { Chip, Skeleton, Stack, Tooltip, Typography } from '@mui/material';

import { formattedRecordValue } from '../helpers/formater';
import type { KeysObject, ServiceKeys } from '../helpers/profile';
import { serviceKeys } from '../helpers/profile';

export default function SocialOverview({ props }: { props: KeysObject }) {
  return (
    <Stack direction="column" padding={2} gap={2}>
      <Typography variant="h4" color="GrayText">
        Social
      </Typography>
      <Stack direction="row" justifyContent="center" gap={3} flexWrap={'wrap'}>
        <SocialChips keys={props} />
      </Stack>
    </Stack>
  );
}

function SocialChips({ keys }: { keys: KeysObject }) {
  return (
    <>
      {serviceKeys.map((key) => {
        return <SocialChip key={key} iconKey={key} label={formattedRecordValue(keys[key])} />;
      })}
    </>
  );
}

function SocialChip({ iconKey, label }: { iconKey: ServiceKeys; label: string }) {
  const serviceIcons = {
    'com.github': <GitHub />,
    //'com.peepeth': <Apps />,
    'com.linkedin': <LinkedIn />,
    'com.twitter': <Twitter />,
    //'io.keybase': <Apps />,
    'org.telegram': <Telegram />,
  } as const;

  return (
    <Tooltip title={iconKey} placement="top">
      <Chip
        icon={serviceIcons[iconKey]}
        label={label}
        onClick={() => {
          window.open(label, '_blank');
        }}
      />
    </Tooltip>
  );
}

export function SocialOverviewSkeleton() {
  return (
    <Stack direction="column" padding={2} gap={2}>
      <Skeleton width={150} height={30} />
      <Stack direction="row" justifyContent="center" gap={2} flexWrap={'wrap'}>
        {serviceKeys.map((key) => {
          return <Skeleton key={key} width={100} height={35} />;
        })}
      </Stack>
    </Stack>
  );
}
