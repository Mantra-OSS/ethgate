import type { Log } from '@ethgate/lib-solver';
import { useLoaderData } from 'react-router-dom';

import { useNode } from '../helpers/backend.js';
import LogView from '../nodes/LogView.js';

export default function LogPage() {
  const log = useNode<Log>(useLoaderData() as any);

  return <LogView node={log} />;
}
