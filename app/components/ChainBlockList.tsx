'use client';
import type { Block, Chain, ChainHasBlock } from '@/lib-solver';
import {
  Collapse,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { DateTime } from 'luxon';
import { useCallback, useEffect, useTransition } from 'react';
import { FormattedRelativeTime } from 'react-intl';

import InfiniteList from '../components/InfiniteList';
import { serverPromise } from '../helpers/backend';
import { useConnection, useNode } from '../helpers/hooks';
import { useNow } from '../viewer/viewer';

import { NodeList, NodeListItem } from './NodeList';
import { NodeAvatar } from './ui';

export default function ChainBlockList({ chainId }: { chainId: Chain['id'] }) {
  const [, startTransition] = useTransition();
  const [blocks, hasNext, loadNext, refetch] = useConnection<ChainHasBlock>(
    'ChainHasBlock',
    chainId,
    {
      // TODO: Paginate
      first: 10,
    },
  );
  const onLoadNext = useCallback(() => {
    startTransition(() => {
      loadNext(3);
    });
  }, [loadNext]);

  useEffect(() => {
    let abort = false;

    (async () => {
      const database = (await serverPromise).solver.database;
      const update = await database.networkUpdates(chainId).next();
      if (update.done) return;
      if (abort) return;
      startTransition(() => {
        refetch();
      });
      // const { headId } = update.value;
    })();

    return () => {
      abort = true;
    };
  });

  return (
    <>
      <InfiniteList
        // startSubscriptionConfig={subscriptionConfig}
        // loadPrevious={hasPrevious && onLoadPrevious}
        loadNext={hasNext && onLoadNext}
      >
        <NodeList>
          {blocks.edges.map(({ headId }) => (
            <Collapse key={headId}>
              <NodeListItem>
                <ChainBlockListItem blockId={headId} />
              </NodeListItem>
            </Collapse>
          ))}
        </NodeList>
      </InfiniteList>
    </>
  );
}

export function ChainBlockListItem({ blockId }: { blockId: Block['id'] }) {
  const node = useNode<Block>(blockId);
  const chain = useNode<Chain>(node.chainId);

  const timestamp = DateTime.fromMillis(node.timestamp * 1000);
  const now = useNow();

  // throw new Promise(() => {});

  return (
    <ListItemButton href={`${node.data.chainId}/blocks/${node.number}`}>
      <ListItemAvatar>
        <NodeAvatar avatarType="block" />
      </ListItemAvatar>
      <ListItemText>
        <Stack direction="row" spacing={1} justifyContent="space-between">
          <Stack direction="column">
            <Typography>{node.number}</Typography>
          </Stack>
          <Stack direction="column">
            <Typography>
              Block Hash: {node.hash.slice(0, 6)} ... {node.hash.slice(-6)}
            </Typography>
            <Typography>
              Miner: {node.miner.slice(0, 6)} ... {node.miner.slice(-6)}
            </Typography>
          </Stack>
          <Stack direction="column">
            <Typography>123 txns</Typography>
            <Typography variant="caption">
              <FormattedRelativeTime
                value={timestamp.diff(now).as('seconds')}
                unit="second"
                style="narrow"
              />
            </Typography>
          </Stack>
        </Stack>
      </ListItemText>
    </ListItemButton>
  );
}
