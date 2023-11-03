"use client";

import type {
  Block,
  Chain,
  ChainHasTransaction,
  Transaction,
} from "@ethgate/lib-solver";
import {
  Avatar,
  Collapse,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { DateTime } from "luxon";
import { useCallback, useTransition } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { FormattedRelativeTime } from "react-intl";
import { TransitionGroup } from "react-transition-group";

import InfiniteList from "../components/InfiniteList";
import { useNode } from "@/app/helpers/hooks";
import { useConnection } from "../helpers/hooks";
import { useNow } from "../viewer/viewer";

export default function ChainTransactionList({
  chainId,
}: {
  chainId: Chain["id"];
}) {
  const [, startTransition] = useTransition();

  const [transactions, hasNext, loadNext] = useConnection<ChainHasTransaction>(
    "ChainHasTransaction",
    chainId,
    {
      // TODO: Paginate
      first: 10,
    }
  );
  const onLoadNext = useCallback(() => {
    startTransition(() => {
      loadNext(3);
    });
  }, [loadNext]);

  return (
    <>
      <InfiniteList
        // startSubscriptionConfig={subscriptionConfig}
        // loadPrevious={hasPrevious && onLoadPrevious}
        loadNext={hasNext && onLoadNext}
      >
        <TransitionGroup>
          {transactions.edges.map(({ headId }) => (
            <Collapse key={headId}>
              <ListItem>
                <ErrorBoundary fallback={<div>Could not load transaction</div>}>
                  <ChainTransactionListItem transactionId={headId} />
                </ErrorBoundary>
              </ListItem>
            </Collapse>
          ))}
        </TransitionGroup>
      </InfiniteList>
    </>
  );
}

export function ChainTransactionListItem({
  transactionId,
}: {
  transactionId: Transaction["id"];
}) {
  const node = useNode<Transaction>(transactionId);
  const block = useNode<Block>(node.blockId);
  const chain = useNode<Chain>(node.chainId);

  const timestamp = DateTime.fromMillis(block.timestamp * 1000);
  const now = useNow();

  return (
    <ListItemButton
      href={`${node.chainId}/blocks/${node.blockNumber}/transactions/${node.transactionIndex}`}
    >
      <ListItemAvatar>
        <Avatar
          alt={chain.meta.name}
          // src={`/static/images/avatar/${value + 1}.jpg`}
        >
          {chain.meta.name
            .split(" ")
            .map((word) => word[0])
            .join("")}
        </Avatar>
      </ListItemAvatar>
      <ListItemText>
        <Stack direction="row" spacing={1} justifyContent="space-between">
          <Stack direction="column">
            <Typography>
              {node.hash.slice(0, 4)}...{node.hash.slice(-4)}
            </Typography>
            <Typography>{node.blockNumber}</Typography>
          </Stack>
          <Stack direction="column">
            <Typography>
              From: {node.from.slice(0, 4)}...{node.from.slice(-4)}
            </Typography>
            <Typography>
              To: {node.to.slice(0, 4)}...{node.from.slice(-4)}
            </Typography>
          </Stack>
          <Stack direction="column">
            <Typography>
              {(parseInt(node.value, 16) / 10 ** 18).toFixed(2)} ETH
            </Typography>
            <Typography variant="caption">
              <FormattedRelativeTime
                value={timestamp.diff(now).as("seconds")}
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
