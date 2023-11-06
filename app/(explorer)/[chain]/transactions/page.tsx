import ChainTransactionsView from '@/app/components/ChainTransactionsView';
import { readAksharaNode } from '@/app/helpers/akshara.server';

import type { Props } from '../page';
import { keyFromParams } from '../page';

export default async function BlockHasTransactionsPage({ params }: Props) {
  const node = await readAksharaNode(await keyFromParams(params));
  return <ChainTransactionsView node={node.toObject()} />;
}
