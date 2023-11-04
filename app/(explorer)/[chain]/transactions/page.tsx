import ChainTransactionsView from '@/app/components/ChainTransactionsView';
import { readObject } from '@/app/helpers/akshara.server';

type Params = { chainId: string };

export default async function BlockHasTransactionsPage({ params }: { params: Params }) {
  const nodeData = await readObject({
    type: 'Chain',
    ...params,
  });
  return <ChainTransactionsView nodeData={nodeData} />;
}
