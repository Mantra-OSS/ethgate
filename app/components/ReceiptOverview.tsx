import type { Receipt } from '@/lib-solver';
import { Divider, Stack, Typography } from '@mui/material';
import { FormattedNumber } from 'react-intl';

export default function ReceiptOverview({ receipt: node }: { receipt: Receipt }) {
  return (
    <Stack divider={<Divider />}>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Gas Used</Typography>
        <Typography>{<FormattedNumber value={node.gasUsed} />}</Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Cumulative Gas Used</Typography>
        <Typography>{<FormattedNumber value={node.cumulativeGasUsed} />}</Typography>
      </Stack>
      <Stack width="100%" direction="row" padding={2} justifyContent="space-between">
        <Typography>Logs Bloom</Typography>
        <Typography>{node.logsBloom}</Typography>
      </Stack>
    </Stack>
  );
}
