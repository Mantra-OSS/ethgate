import { ContentCopy } from '@mui/icons-material';
import { Avatar, Button, IconButton, Skeleton, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { type Address } from 'viem';

import { formattedAddress } from '../helpers/formater';
import { Profile } from '../helpers/profile';

export default function ProfileOverview({
  address,
  profileData,
  isProfilePage,
}: {
  address: Address;
  profileData?: Profile;
  isProfilePage?: boolean;
}) {
  // TODO: We should check profileData. If has no data, we should send a request.
  const [profile, setProfile] = useState<Profile | null>(null);

  async function initializeProfile() {
    if (address) {
      const newProfile = new Profile(address);
      await newProfile.initialize();
      setProfile(newProfile);
    }
  }

  useEffect(() => {
    if (profileData) {
      setProfile(profileData);
    } else {
      initializeProfile();
    }
  }, []);

  if (!profile) return <ProfileOverviewSkeleton />;

  return (
    <Stack direction="column">
      <Stack direction="row" justifyContent="space-between" padding={2}>
        <Avatar
          alt="Profile photo"
          src={profile?.avatar ? profile.avatar : undefined}
          sx={{
            width: 50,
            height: 50,
          }}
        >
          {profile?.name ? profile?.name[0] : 'Unk'}
        </Avatar>
        <Stack direction="column" justifyContent="space-between" textAlign="center">
          <Typography variant="h5" fontWeight="bold">
            {profile?.name}
          </Typography>
          <Stack direction="row">
            <Typography variant="h5">{formattedAddress(profile.address)}</Typography>
            <IconButton
              aria-label="copy address"
              size="small"
              onClick={() => {
                navigator.clipboard.writeText(profile.address);
              }}
            >
              <ContentCopy fontSize="inherit" />
            </IconButton>
          </Stack>
        </Stack>
        {isProfilePage ? <Button href="/edit">Edit</Button> : <Button href="/profile">View</Button>}
      </Stack>
    </Stack>
  );
}

export function ProfileOverviewSkeleton() {
  return (
    <Stack direction="column">
      <Stack direction="row" justifyContent="space-between" padding={2}>
        <Avatar
          alt="Skeleton Avatar"
          sx={{
            width: 50,
            height: 50,
          }}
        />
        <Stack direction="column" justifyContent="space-between" textAlign="center">
          <Skeleton width={120} />
          <Skeleton width={120} />
        </Stack>
        <Skeleton width={70} />
      </Stack>
    </Stack>
  );
}
