import type { AksharaAbstract, AksharaConfig } from '@/lib-node';
import { chains } from '@mantra-oss/chains';

import { EthgateSolverDatabase as SolverDatabase } from '../database';
import {
  BlockHasLog,
  BlockHasReceipt,
  BlockHasTransaction,
  ChainHasBlock,
  ChainHasChain,
  ChainHasDescendantBlock,
  ChainHasTransaction,
  ReceiptHasLog,
  TransactionHasLog,
  blockType,
  chainType,
  logType,
  receiptType,
  transactionType,
} from '../graph';
import { ExplorerHasChain, explorerType } from '../graph/explorer';
import type { EdgeType, NodeType } from '../graph/graph/abstract';
import { SolverGraphAbstract } from '../graph/graph/abstract';

export class SolverGraph extends SolverGraphAbstract {
  nodeTypes: NodeType<any>[] = [
    explorerType,
    chainType,
    blockType,
    transactionType,
    receiptType,
    logType,
  ];
  edgeTypes: EdgeType<any>[] = [
    ExplorerHasChain,
    ChainHasChain,
    ChainHasBlock,
    ChainHasTransaction,
    BlockHasTransaction,
    BlockHasLog,
    BlockHasReceipt,
    TransactionHasLog,
    ReceiptHasLog,
    ChainHasDescendantBlock,
  ];
}

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
