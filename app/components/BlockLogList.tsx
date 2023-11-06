import { useNode } from '@/app/helpers/hooks';
import type { Block, BlockHasLog, Log } from '@/lib-solver';
import {
  Avatar,
  Collapse,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { useCallback, useTransition } from 'react';
import { TransitionGroup } from 'react-transition-group';

import InfiniteList from '../components/InfiniteList';
import { useConnection } from '../helpers/hooks';

import { NodeList, NodeListItem } from './NodeList';

import { NodeAvatar } from './ui';

export default function BlockLogList({ block }: { block: Block }) {
  const [, startTransition] = useTransition();

  const [logs, hasNext, loadNext] = useConnection<BlockHasLog>('BlockHasLog', block.id, {
    // TODO: Paginate
    first: 10,
  });

  const onLoadNext = useCallback(() => {
    startTransition(() => {
      loadNext(3);
    });
  }, [loadNext]);

  return (
    <>
      <InfiniteList
        // loadPrevious={hasPrevious && onLoadPrevious}
        loadNext={hasNext && onLoadNext}
      >
        <NodeList>
          {logs.edges.map(({ headId }) => (
            <Collapse key={headId}>
              <NodeListItem>
                <BlockLogListItem logId={headId} />
              </NodeListItem>
            </Collapse>
          ))}
        </NodeList>
      </InfiniteList>
    </>
  );
}

export function BlockLogListItem({ logId }: { logId: Log['id'] }) {
  const node = useNode<Log>(logId);

  return (
    <ListItemButton
      href={`${node.blockNumber}/transactions/${node.transactionIndex}/logs/${node.logIndex}`}
    >
      <ListItemAvatar>
        {/* <Avatar alt={node.meta.name}>{node.meta.name.slice(0, 1)}</Avatar> */}
        <NodeAvatar avatarType="log" />
      </ListItemAvatar>
      <ListItemText>
        <Stack direction="row" spacing={1} justifyContent="space-between">
          <Stack direction="column">
            <Typography>Tx Index: {node.transactionIndex}</Typography>
            <Typography>
              Tx Hash: {node.transactionHash.slice(0, 6)}...
              {node.transactionHash.slice(-6)}
            </Typography>
          </Stack>
          <Stack direction="column">
            <Typography>
              Address: {node.address.slice(0, 6)}...{node.address.slice(-6)}
            </Typography>
            <Typography>Topics Count: {node.topics.length}</Typography>
          </Stack>
          <Typography>Removed: {node.removed.toString()}</Typography>
        </Stack>
      </ListItemText>
    </ListItemButton>
  );
}
