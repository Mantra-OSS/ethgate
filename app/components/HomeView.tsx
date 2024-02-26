'use client';
import { Divider, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import type { Address } from 'viem';
import { useAccount } from 'wagmi';

import { Profile } from '../helpers/profile';

import Posts from './Posts';
import ProfileOverview from './ProfileOverview';
import SendNotice from './SendNotice';

export default function HomeView() {
  const { address } = useAccount();
  const [profile, setProfile] = useState<Profile | null>(null);

  async function initializeProfile() {
    if (address) {
      const newProfile = new Profile(address);
      await newProfile.initialize();
      setProfile(newProfile);
    }
  }

  useEffect(() => {
    initializeProfile();
  }, []);

  return (
    <Paper>
      <ProfileOverview address={address as Address} />
      <Divider />
      <SendNotice profile={profile} />
      <Divider />
      <Posts />
    </Paper>
  );
}
