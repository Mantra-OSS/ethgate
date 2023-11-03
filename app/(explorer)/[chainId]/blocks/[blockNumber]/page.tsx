'use client';

import type { AksharaBlockKey } from '@/akshara';
import { formatBlockId } from '@/akshara';
import BlockView from '@/app/components/BlockView';
import { useNode } from '@/app/helpers/hooks';
import type { Block } from '@/solver';

export default function BlockPage({
  params,
}: {
  params: { chainId: string; blockNumber: string };
}) {
  const { chainId } = params;

  const key: AksharaBlockKey = {
    chainId,
    number: parseInt(params.blockNumber, 10),
  };
  const node = useNode<Block>(`Block:${formatBlockId(key)}`);
  return <BlockView node={node} />;
}
