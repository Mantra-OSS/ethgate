import { useNode } from '@/app/helpers/hooks';
import type { Log } from '@ethgate/lib-solver';
import { useLoaderData } from 'react-router-dom';

import LogView from '../components/LogView';

export default function LogPage() {
  const log = useNode<Log>(useLoaderData() as any);

  return <LogView node={log} />;
}
