import type { Block, Chain, ChainHasBlock } from '@ethgate/lib-solver';
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
import { DateTime } from 'luxon';
import { useCallback, useEffect, useTransition } from 'react';
import { FormattedRelativeTime } from 'react-intl';
import { TransitionGroup } from 'react-transition-group';

import InfiniteList from '../components/InfiniteList.js';
import { FallbackBoundary } from '../components/ui.js';
import { serverPromise, useConnection, useNode } from '../helpers/backend.js';
import { useNow } from '../viewer/viewer.js';

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
        <TransitionGroup>
          {blocks.edges.map(({ headId }) => (
            <Collapse key={headId}>
              <ListItem>
                <FallbackBoundary>
                  <ChainBlockListItem blockId={headId} />
                </FallbackBoundary>
              </ListItem>
            </Collapse>
          ))}
        </TransitionGroup>
      </InfiniteList>
    </>
  );
}

export function ChainBlockListItem({ blockId }: { blockId: Block['id'] }) {
  const node = useNode<Block>(blockId);
  const chain = useNode<Chain>(node.chainId);

  const timestamp = DateTime.fromMillis(node.timestamp * 1000);
  const now = useNow();

  return (
    <ListItemButton href={`block/${node.number}`}>
      <ListItemAvatar>
        <Avatar
          alt={chain.meta.name}
          // src={`/static/images/avatar/${value + 1}.jpg`}
        >
          {chain.meta.name
            .split(' ')
            .map((word) => word[0])
            .join('')}
        </Avatar>
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
