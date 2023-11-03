import type { QueryResponse, Variables } from '@ethgate/lib-solver';
import { EthgateSolver } from '@ethgate/lib-solver';
import { AksharaDom } from '@ethgate/node-worker/node';
import type { Observable } from 'rxjs';

// import { AksharaWorkerClient } from './node.js';

export interface EthgateSolverServer {
  query(request: string, variables: Variables): Promise<QueryResponse>;
  subscribe(request: string, variables: Variables): Promise<Observable<QueryResponse>>;
}

const ENABLE_SHARED_WORKER = false;

export class EthgateSolverMainThread implements EthgateSolverServer {
  #solver: EthgateSolver;

  get solver(): EthgateSolver {
    return this.#solver;
  }

  static async create() {
    let node;
    if (ENABLE_SHARED_WORKER) {
      throw new Error('Shared worker not implemented');
      // node = new AksharaWorkerClient();
    } else {
      node = new AksharaDom();
    }
    const solver = await EthgateSolver.create({ node });
    return new EthgateSolverMainThread(solver);
  }

  private constructor(solver: EthgateSolver) {
    this.#solver = solver;
  }

  async query(request: string, variables: Variables): Promise<QueryResponse> {
    return this.#solver.query(request, variables);
  }
  async subscribe(request: string, variables: Variables): Promise<Observable<QueryResponse>> {
    return this.#solver.subscribe(request, variables);
  }
}
