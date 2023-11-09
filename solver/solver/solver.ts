import type { AksharaAbstract, AksharaConfig, AksharaObjectKey } from '@/lib-node';
import { chains } from '@mantra-oss/chains';

import { EthgateSolverDatabase as SolverDatabase } from '../database';
import type { Block, Chain, Transaction } from '../graph';
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

  getRoot = () => explorerType;
}

export type SolverConfig = {
  node: AksharaAbstract;
  database?: SolverDatabase;
};

export class Solver {
  chains: AksharaConfig['chains'];
  graph: SolverGraph;
  database: SolverDatabase;

  constructor(config: SolverConfig) {
    this.chains = chains as any;
    this.graph = new SolverGraph();
    this.database =
      config.database ??
      new SolverDatabase({
        node: config.node,
        graph: this.graph,
      });
  }

  async getRoot(): Promise<Explorer> {
    const root = await explorerType.get('Explorer:', this.database);
    if (!root) throw new Error('No root');
    return root;
  }

  async resolvePath(
    path: string[],
  ): Promise<['node', SolverNode] | ['connection', SolverNode, EdgeType<any>] | undefined> {
    const root = await this.getRoot();

    let resolved: SolverNode = root;
    for (let i = 0; i < path.length; i += 2) {
      const connectionSlug = path[i];
      const edgeType = this.graph.edgeTypes.find(
        (edgeType) =>
          edgeType.tail.name === resolved.type && edgeType.connectionName === connectionSlug,
      );
      if (!edgeType) {
        return;
      }
      const headSlug = path[i + 1];
      if (headSlug === undefined) {
        return ['connection', resolved, edgeType];
      }
      switch (edgeType.name) {
        case 'ExplorerHasChain': {
          const tail = resolved as Explorer;
          const chain = Object.values(tail.data.chains).find(
            (chain) => chain.chainId === headSlug || chain.meta.slug === headSlug,
          );
          if (!chain) return;
          const key = { type: 'Chain', chainId: chain.chainId } satisfies AksharaObjectKey;
          const object = await this.database.aks.getObject(key);
          if (!object) {
            throw new Error(`Object not found: ${JSON.stringify(key)}`);
          }
          resolved = edgeType.head.create(object);
          break;
        }
        case 'ChainHasBlock': {
          const tail = resolved as Chain;
          const key = {
            type: 'Block',
            chainId: tail.data.chainId,
            number: parseInt(headSlug, 10),
          } satisfies AksharaObjectKey;
          const object = await this.database.aks.getObject(key);
          if (!object) {
            throw new Error(`Object not found: ${JSON.stringify(key)}`);
          }
          resolved = edgeType.head.create(object);
          break;
        }
        case 'BlockHasTransaction': {
          const tail = resolved as Block;
          const key = {
            type: 'Transaction',
            chainId: tail.data.chainId,
            blockNumber: tail.data.number,
            transactionIndex: parseInt(headSlug, 10),
          } satisfies AksharaObjectKey;
          const object = await this.database.aks.getObject(key);
          if (!object) {
            throw new Error(`Object not found: ${JSON.stringify(key)}`);
          }
          resolved = edgeType.head.create(object);
          break;
        }
        case 'TransactionHasLog': {
          const tail = resolved as Transaction;
          const key = {
            type: 'Log',
            chainId: tail.data.chainId,
            blockNumber: tail.data.blockNumber,
            transactionIndex: tail.data.transactionIndex,
            logIndex: parseInt(headSlug, 10),
          } satisfies AksharaObjectKey;
          const object = await this.database.aks.getObject(key);
          if (!object) {
            throw new Error(`Object not found: ${JSON.stringify(key)}`);
          }
          resolved = edgeType.head.create(object);
          break;
        }
        default: {
          throw new Error(`Unknown edge type ${edgeType.name}`);
        }
      }
    }
    return ['node', resolved];
  }
}
