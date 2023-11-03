import ChainBlocksView from '@/app/components/ChainBlocksView';
import { readObject } from '@/app/helpers/akshara.server';

type Params = { chainId: string };

export default async function ChainHasBlocksPage({ params }: { params: Params }) {
  const nodeData = await readObject({
    type: 'Chain',
    ...params,
  });
  return <ChainBlocksView nodeData={nodeData} />;
}
