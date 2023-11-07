import type { AksharaAbstract, AksharaConfig } from '@/lib-node';
import { chains } from '@mantra-oss/chains';

import { EthgateSolverDatabase as SolverDatabase } from '../database';
import {
  BlockHasLog,
  BlockHasReceipt,
  BlockHasTransaction,
  ChainHasBlock,
  ChainHasChain,
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

  async resolvePath(path: string): Promise<any> {
    if (!path.startsWith('/')) {
      throw new Error('Path must start with /');
    }
    const parts = path.split('/').slice(1);

    const root = await explorerType.get('Explorer:', this.database);

    const resolved = root;
    for (let i = 0; i < parts.length; i += 2) {
      const connectionSlug = parts[i];
      const edgeType = this.graph.edgeTypes.find(
        (edgeType) => edgeType.connectionName === connectionSlug,
      );
      if (!edgeType) {
        throw new Error(`No such connection ${connectionSlug}`);
      }
      const headSlug = parts[i + 1];
      if (headSlug === undefined) {
        // TODO: Resolve edges instead of throwing
        throw new Error(`No head slug for ${connectionSlug}`);
      }
      throw new Error(`Not yet implemented`);
    }
    return resolved;
  }
}
