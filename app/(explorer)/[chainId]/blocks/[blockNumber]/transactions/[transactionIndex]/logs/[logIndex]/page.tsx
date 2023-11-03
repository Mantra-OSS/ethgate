'use client';

import type { AksharaLogKey } from '@/akshara';
import { formatLogId } from '@/akshara';
import LogView from '@/app/components/LogView';
import { useNode } from '@/app/helpers/hooks';
import type { Log } from '@/solver';

export default function LogPage({
  params,
}: {
  params: { chainId: string; blockNumber: string; transactionIndex: string; logIndex: string };
}) {
  const { chainId, blockNumber, transactionIndex, logIndex } = params;

  const key: AksharaLogKey = {
    chainId,
    blockNumber: parseInt(blockNumber, 10),
    transactionIndex: Number(transactionIndex),
    logIndex: Number(logIndex),
  };
  const node = useNode<Log>(`Log:${formatLogId(key)}`);
  return <LogView node={node} />;
}
