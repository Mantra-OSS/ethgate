import { Paper, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { formattedRecordValue } from '../helpers/formater';
import { Profile } from '../helpers/profile';

import DescriptionOverview, { DescriptionOverviewSkeleton } from './DescriptionOverview';
import LastNoticeOverview, { LastNoticeOverviewSkeleton } from './LastNoticeOverview';
import ProfileOverview, { ProfileOverviewSkeleton } from './ProfileOverview';
import SocialOverview, { SocialOverviewSkeleton } from './SocialOverview';

export default function ProfileView() {
  const address = '0xAEb9A4587aC3f43c7f96412e08ccd62e32Ed27Fc';
  const [profile, setProfile] = useState<Profile | null>(null);

  async function initializeProfile() {
    if (address) {
      const newProfile = new Profile(address);
      await newProfile.initialize();
      await newProfile.getAllTexts();
      setProfile(newProfile);
    }
  }

  useEffect(() => {
    initializeProfile();
  }, []);

  if (!profile) return <ProfileViewSkeleton />;
  if (!profile.keys) return <div>No keys</div>;

  return (
    <Stack direction="column" gap={1}>
      <Paper>
        <ProfileOverview address={address} profileData={profile} isProfilePage />
      </Paper>
      <Paper>
        <DescriptionOverview
          props={{
            description: formattedRecordValue(profile.keys.description),
            url: formattedRecordValue(profile.keys.url),
            location: formattedRecordValue(profile.keys.location),
            email: formattedRecordValue(profile.keys.email),
          }}
        />
      </Paper>
      <Paper>
        <SocialOverview props={profile.keys} />
      </Paper>
      <Paper>
        <LastNoticeOverview props={formattedRecordValue(profile.keys.notice)} />
      </Paper>
      <Paper>
        <Stack direction="column" padding={2} gap={2}>
          <Typography variant="h4" color="GrayText">
            Posts
          </Typography>
          <Typography variant="subtitle1">No posts yet</Typography>
        </Stack>
      </Paper>
    </Stack>
  );
}

export function ProfileViewSkeleton() {
  return (
    <Stack direction="column" gap={1}>
      <Paper>
        <ProfileOverviewSkeleton />
      </Paper>
      <Paper>
        <DescriptionOverviewSkeleton />
      </Paper>
      <Paper>
        <SocialOverviewSkeleton />
      </Paper>
      <Paper>
        <LastNoticeOverviewSkeleton />
      </Paper>
      <Paper>
        <Stack direction="column" padding={2} gap={2}>
          <Typography variant="h4" color="GrayText">
            Posts
          </Typography>
          <Typography variant="subtitle1">No posts yet</Typography>
        </Stack>
      </Paper>
    </Stack>
  );
}
