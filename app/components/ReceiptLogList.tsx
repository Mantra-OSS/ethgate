'use client';
import { useNode } from '@/app/helpers/hooks';
import type { Log, Receipt, ReceiptHasLog } from '@/lib-solver';
import {
  Avatar,
  Card,
  CardContent,
  Collapse,
  Link,
  ListItem,
  Stack,
  Typography,
} from '@mui/material';
import { useCallback, useTransition } from 'react';
import { TransitionGroup } from 'react-transition-group';

import InfiniteList from '../components/InfiniteList';
import { useConnection } from '../helpers/hooks';

export default function ReceiptLogList({ receipt }: { receipt: Receipt }) {
  const [, startTransition] = useTransition();
  const [logs, hasNext, loadNext] = useConnection<ReceiptHasLog>('ReceiptHasLog', receipt.id, {
    // TODO: Paginate
    first: 10,
  });

  const onLoadNext = useCallback(() => {
    startTransition(() => {
      loadNext(3);
    });
  }, [loadNext]);

  return (
    <InfiniteList loadNext={hasNext && onLoadNext}>
      <TransitionGroup component={Stack} direction="row" sx={{ overflowX: 'auto' }}>
        {logs.edges.map(({ headId }) => (
          <Collapse key={headId}>
            <ListItem>
              <ReceiptLogListItem logId={headId} />
            </ListItem>
          </Collapse>
        ))}
      </TransitionGroup>
    </InfiniteList>
  );
}

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
          <Avatar alt={node.meta.name}>{node.meta.name}</Avatar>
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
