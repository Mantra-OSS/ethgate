import { useNode } from '@/app/helpers/hooks';
import { type Chain } from '@/lib-solver';
import type { ChainHasChain } from '@/lib-solver';
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

export default function ChainChainList({ chain }: { chain: Chain }) {
  const [, startTransition] = useTransition();

  const [chains, loadNext] = useConnection<ChainHasChain>('ChainHasChain', chain.id, {
    first: 10,
  });

  const onLoadNext = useCallback(() => {
    startTransition(() => {
      loadNext();
    });
  }, [loadNext]);

  return (
    <>
      <InfiniteList
        //loadPrevious={hasPrevious && onLoadPrevious}
        loadNext={chains?.pageInfo.hasNextPage && onLoadNext}
      >
        <TransitionGroup component={Stack} direction="row">
          {chains?.edges.map(({ headId }) => (
            <Collapse key={headId}>
              <ListItem>
                <ChainChainListItem chainId={headId} />
              </ListItem>
            </Collapse>
          ))}
        </TransitionGroup>
      </InfiniteList>
    </>
  );
}

export function ChainChainListItem({ chainId }: { chainId: Chain['id'] }) {
  const node = useNode<Chain>(chainId);

  return (
    <Card
      variant="outlined"
      sx={{
        width: '400px',
        margin: { sm: 1, md: 1, lg: 1, xl: 1 },
      }}
    >
      <CardContent>
        <Stack direction="row" gap={1}>
          <Avatar alt={node.meta.name} src={`/statics/${node.data.chainId}.svg`}>
            {node.meta.name
              .split(' ')
              .map((word) => word[0])
              .join('')}
          </Avatar>
          <Link href={`/${node.meta.slug}`}>
            <Typography>{node.meta.name}</Typography>
          </Link>
        </Stack>
        <Stack direction="column">
          <Stack direction="row" justifyContent="space-between" mt={1}>
            <Typography textAlign={'left'} fontWeight={'bold'}>
              Info Url :
            </Typography>
            <Link href={node.data.extra.meta.url}>
              <Typography textAlign={'right'}>{node.data.extra.meta.url}</Typography>
            </Link>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography textAlign={'left'} fontWeight={'bold'}>
              Native Coin :
            </Typography>
            <Typography textAlign={'right'}>{node.data.extra.currency.symbol}</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
