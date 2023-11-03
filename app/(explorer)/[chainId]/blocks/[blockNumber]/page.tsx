'use client';

import { AksharaBlockKey, formatBlockId } from '@/akshara';
import BlockView from '@/app/components/BlockView';
import { useNode } from '@/app/helpers/hooks';
import { Block } from '@/solver';
import { useParams } from 'next/navigation';

export default function BlockPage() {
  const params = useParams<{ chainId: string; blockNumber: string }>();
  const { chainId } = params;

  const key: AksharaBlockKey = {
    chainId,
    number: parseInt(params.blockNumber, 10),
  };
  const node = useNode<Block>(`Block:${formatBlockId(key)}`);
  return <BlockView node={node} />;
}
