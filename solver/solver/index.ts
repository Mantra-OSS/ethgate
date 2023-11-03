import type { AksharaAbstract, AksharaConfig } from "@/akshara";
import { chains } from "@mantra-oss/chains";
import { EthgateSolverDatabase } from "../database";

export type PunkerBackendConfig = {
  node: AksharaAbstract;
  database?: EthgateSolverDatabase;
};

export class EthgateSolver {
  chains: AksharaConfig["chains"];
  database: EthgateSolverDatabase;

  static async create(config: PunkerBackendConfig): Promise<EthgateSolver> {
    const networks = chains as any;
    const database =
      config.database ??
      new EthgateSolverDatabase({
        node: config.node,
      });
    return new EthgateSolver(database, networks);
  }

  private constructor(
    database: EthgateSolverDatabase,
    chains: AksharaConfig["chains"]
  ) {
    this.chains = chains;
    this.database = database;
  }
}
