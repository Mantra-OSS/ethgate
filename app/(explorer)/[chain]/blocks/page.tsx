import NodeConnectionPage from '@/app/components/NodeConnectionPage';
import { readAksharaNode } from '@/app/server/akshara.server';

import { ChainHasBlock } from '../../../../solver/graph';
import type { Props } from '../page';
import { keyFromParams } from '../page';

export default async function ChainHasBlocksPage({ params }: Props) {
  const node = await readAksharaNode(await keyFromParams(params));
  return <NodeConnectionPage node={node.toObject()} edgeTypeName={'ChainHasBlock'} />;
}
