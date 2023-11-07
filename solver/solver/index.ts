import type { AksharaAbstract, AksharaConfig, AksharaObjectKey } from '@/lib-node';
import { chains } from '@mantra-oss/chains';

import { EthgateSolverDatabase as SolverDatabase } from '../database';
import type { Chain } from '../graph';
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
import type { Explorer } from '../graph/explorer';
import { ExplorerHasChain, explorerType } from '../graph/explorer';
import type { EdgeType, NodeType, SolverNode } from '../graph/graph/abstract';
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

  async resolvePath(parts: string[]): Promise<SolverNode> {
    // if (!path.startsWith('/')) {
    //   throw new Error('Path must start with /');
    // }
    // const parts = path.split('/').slice(1);

    const root = await explorerType.get('Explorer:', this.database);
    if (!root) throw new Error('No root');

    let resolved: SolverNode = root;
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
      switch (edgeType.name) {
        case 'ExplorerHasChain': {
          const explorer = resolved as Explorer;
          const chain = Object.values(explorer.data.chains).find(
            (chain) => chain.chainId === headSlug || chain.meta.slug === headSlug,
          );
          if (!chain) throw new Error(`No such chain ${headSlug}`);
          const key = { type: 'Chain', chainId: chain.chainId } satisfies AksharaObjectKey;
          const object = await this.database.aks.getObject(key);
          if (!object) {
            throw new Error(`Object not found: ${JSON.stringify(key)}`);
          }
          resolved = chainType.create(object);
          break;
        }
        case 'ChainHasBlock': {
          const chain = resolved as Chain;
          const key = {
            type: 'Block',
            chainId: chain.data.chainId,
            number: parseInt(headSlug, 10),
          } satisfies AksharaObjectKey;
          const object = await this.database.aks.getObject(key);
          if (!object) {
            throw new Error(`Object not found: ${JSON.stringify(key)}`);
          }
          resolved = blockType.create(object);
          break;
        }
        default: {
          throw new Error(`Unknown edge type ${edgeType.name}`);
        }
      }
    }
    return resolved;
  }
}
