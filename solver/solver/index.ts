import type { AksharaAbstract, AksharaConfig } from '@/lib-node';
import { chains } from '@mantra-oss/chains';

import { EthgateSolverDatabase } from '../database';
import { SolverGraph } from '../graph';

export type PunkerBackendConfig = {
  node: AksharaAbstract;
  database?: EthgateSolverDatabase;
};

export class EthgateSolver {
  chains: AksharaConfig['chains'];
  graph: SolverGraph;
  database: EthgateSolverDatabase;

  static async create(config: PunkerBackendConfig): Promise<EthgateSolver> {
    const networks = chains as any;
    const graph = new SolverGraph();
    const database =
      config.database ??
      new EthgateSolverDatabase({
        node: config.node,
        graph,
      });
    return new EthgateSolver(graph, database, networks);
  }

  private constructor(
    graph: SolverGraph,
    database: EthgateSolverDatabase,
    chains: AksharaConfig['chains'],
  ) {
    this.graph = graph;
    this.chains = chains;
    this.database = database;
  }
}
