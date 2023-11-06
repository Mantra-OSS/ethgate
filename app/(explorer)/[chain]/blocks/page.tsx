import ChainBlocksView from '@/app/components/ChainBlocksView';
import { readAksharaNode } from '@/app/helpers/akshara.server';

import type { Props } from '../page';
import { keyFromParams } from '../page';

export default async function ChainHasBlocksPage({ params }: Props) {
  const node = await readAksharaNode(await keyFromParams(params));
  return <ChainBlocksView node={node.toObject()} />;
}
