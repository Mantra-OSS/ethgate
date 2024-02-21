'use client';
import { Divider, Paper } from '@mui/material';
import type { Address } from 'viem';
import { useAccount } from 'wagmi';

import Posts from './Posts';
import ProfileOverview from './ProfileOverview';
import SendNotice from './SendNotice';

export default function HomeView() {
  const { address } = useAccount();
  return (
    <Paper>
      <ProfileOverview address={address as Address} />
      <Divider />
      <SendNotice />
      <Divider />
      <Posts />
    </Paper>
  );
}
