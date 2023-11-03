import type { AksharaCall, AksharaResult } from '@ethgate/lib-node';
import { AksharaAbstract } from '@ethgate/lib-node';

import NodeWorker from './node.worker.js?sharedworker';

export class AksharaWorkerClient extends AksharaAbstract {
  id: number = 0;
  nodeWorker: SharedWorker;
  get port() {
    return this.nodeWorker.port;
  }

  constructor() {
    super();
    this.nodeWorker = new NodeWorker();
    this.nodeWorker.port.start();
  }

  async executeBatch(calls: AksharaCall[]): Promise<AksharaResult[]> {
    const id = this.id++;

    return new Promise((resolve, reject) => {
      const onMessage = (event: MessageEvent) => {
        const { id: responseId, results } = event.data;
        if (id !== responseId) return;
        this.port.removeEventListener('message', onMessage);
        resolve(results);
      };

      this.port.addEventListener('message', onMessage);
      this.port.addEventListener('error', reject, { once: true });

      this.port.postMessage({ id, calls });
    });
  }
}
