import { AttachMoney, Download, Paid, Share } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import type { Address } from 'viem';

import { formattedDate } from '../helpers/formater';

import ProfileOverview from './ProfileOverview';

export type PostType = {
  address: Address;
  post: string;
  timestamp: string;
};

export default function Post({ post }: { post: PostType }) {
  return (
    <>
      <ProfileOverview address={post.address} />
      <Typography variant="h3" padding={2}>
        {post.post}
      </Typography>
      <Stack direction="row" justifyContent="space-between" padding={2}>
        <IconButton aria-label="share" size="small">
          <Share fontSize="inherit" />
        </IconButton>
        <IconButton aria-label="download" size="small">
          <Download fontSize="inherit" />
        </IconButton>
        <IconButton aria-label="donate" size="small">
          <AttachMoney fontSize="inherit" />
        </IconButton>
        <Box flexGrow={1} />
        <Typography variant="caption">{formattedDate(post.timestamp)}</Typography>
      </Stack>
    </>
  );
}
