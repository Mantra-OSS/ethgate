import { useNode } from '@/app/helpers/hooks';
import type { Log } from '@/lib-solver';
import { ListItemText, Stack, Typography } from '@mui/material';

export function BlockLogListItem({ logId }: { logId: Log['id'] }) {
  const node = useNode<Log>(logId);
  return (
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
  );
}
