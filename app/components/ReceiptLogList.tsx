'use client';
import { useNode } from '@/app/helpers/hooks';
import type { Log } from '@/lib-solver';
import { Card, CardContent, Link, Stack, Typography } from '@mui/material';

import { NodeAvatar } from './ui';

export function ReceiptLogListItem({ logId }: { logId: Log['id'] }) {
  const node = useNode<Log>(logId);

  return (
    <Card
      variant="outlined"
      sx={{
        width: '300px',
        margin: { sm: 1, md: 1, lg: 1, xl: 1 },
      }}
    >
      <CardContent>
        <Stack direction="row" gap={1}>
          <NodeAvatar node={node} />
          <Link href={`${node.transactionIndex}/logs/${node.logIndex}`}>
            <Typography>Log Id: {node.meta.name}</Typography>
          </Link>
        </Stack>
        <Stack direction="column" width="100%">
          <Stack direction="row" justifyContent="space-between" mt={1}>
            <Typography textAlign={'left'} fontWeight={'bold'}>
              Address :
            </Typography>
            <Typography textAlign={'right'}>
              {node.address.slice(0, 6)}...{node.address.slice(-6)}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography textAlign={'left'} fontWeight={'bold'}>
              Topics Count :
            </Typography>
            <Typography textAlign={'right'}>{node.topics.length}</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
