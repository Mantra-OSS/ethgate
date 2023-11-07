import NodeConnectionPage from '@/app/components/NodeConnectionPage';
import { readAksharaNode } from '@/app/server/akshara.server';

import type { Props } from '../page';
import { keyFromParams } from '../page';

export default async function BlockHasTransactionsPage({ params }: Props) {
  const node = await readAksharaNode(await keyFromParams(params));
  return <NodeConnectionPage node={node.toObject()} edgeTypeName="BlockHasTransaction" />;
}
