import type { AksharaAbstract, AksharaConfig } from '@/lib-node';
import { chains } from '@mantra-oss/chains';

import { EthgateSolverDatabase as SolverDatabase } from '../database';
import { SolverGraph } from '../graph/graph';

export type SolverConfig = {
  node: AksharaAbstract;
  database?: SolverDatabase;
};

export class Solver {
  chains: AksharaConfig['chains'];
  graph: SolverGraph;
  database: SolverDatabase;

  static async create(config: SolverConfig): Promise<Solver> {
    const networks = chains as any;
    const graph = new SolverGraph();
    const database =
      config.database ??
      new SolverDatabase({
        node: config.node,
        graph,
      });
    return new Solver(graph, database, networks);
  }

  private constructor(
    graph: SolverGraph,
    database: SolverDatabase,
    chains: AksharaConfig['chains'],
  ) {
    this.graph = graph;
    this.chains = chains;
    this.database = database;
  }

  async resolvePath(path: string): Promise<any> {}
}
