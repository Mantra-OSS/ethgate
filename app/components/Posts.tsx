import { Divider, Stack } from '@mui/material';
import type { Address } from 'viem';

import Post from './Post';

export default function Posts() {
  const fakePosts = [
    {
      address: '0x0A13Fa23A5ccbabB3817cff029b9B8E843d59f72' as Address,
      post: 'I wrote evm with golang.',
      timestamp: '2024-02-14T08:52:54Z',
    },
    {
      address: '0xAEb9A4587aC3f43c7f96412e08ccd62e32Ed27Fc' as Address,
      post: 'This is a test post.',
      timestamp: '2024-02-12T07:42:34Z',
    },
    {
      address: '0x7020D15dD9AC18dc0701f14aE32AD100efbB8Fd6' as Address,
      post: 'I am a blockchain developer.',
      timestamp: '2024-02-04T09:03:14Z',
    },
    {
      address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' as Address,
      post: 'Vitalik is a genius!',
      timestamp: '2024-01-04T06:32:14Z',
    },
  ];
  return (
    <Stack direction="column" divider={<Divider />}>
      {fakePosts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </Stack>
  );
}
