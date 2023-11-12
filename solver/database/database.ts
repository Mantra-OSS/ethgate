import type { Akshara, AksharaAbstract, AksharaBlockData, AksharaChainId } from '@/lib-node';
import type { ConnectionGenerator, PageArgs, PageInfo } from '@/spec-solver';
import { Connection } from '@/spec-solver';
import { DatabaseAbstract, parseGlobalId } from '@/spec-solver';

import type { Chain, SolverEdge } from '../graph';
import { ChainHasBlock, blockType } from '../graph';
import type { SolverNode } from '../graph/graph/abstract';
import type { SolverGraph } from '../solver';

export type EthgateSolverDatabaseConfig = {
  node: AksharaAbstract;
  graph: SolverGraph;
};

export class EthgateSolverDatabase extends DatabaseAbstract<SolverNode, SolverEdge> {
  node: AksharaAbstract;
  graph: SolverGraph;

  /**
   * @deprecated
   */
  get provider(): AksharaAbstract {
    return this.node;
  }
  get aks(): Akshara {
    return this.node as any;
  }

  constructor(config: EthgateSolverDatabaseConfig) {
    super();
    this.node = config.node;
    this.graph = config.graph;
  }

  async *getBlocksByTag(chainId: AksharaChainId): AsyncGenerator<AksharaBlockData, never, void> {
    while (true) {
      const block = await this.node.execute('GetLatestBlock', [{ chainId }]);
      if (!block) continue;
      yield block;
    }
  }

  async *networkUpdates(networkId: Chain['id']): AsyncGenerator<ChainHasBlock> {
    const [, chainId] = parseGlobalId(networkId);
    const latestBlocks = this.getBlocksByTag(chainId);
    let last;
    for await (const providerBlock of latestBlocks) {
      const block = blockType.create(providerBlock);
      if (last && last.id === block.id) continue;
      last = block;
      const edge = new ChainHasBlock(networkId, block.id, {}, block.data.timestamp);
      yield edge;
    }
  }

  async getNode<TNode extends SolverNode>(id: TNode['id']): Promise<TNode | undefined> {
    const [type] = parseGlobalId(id);
    const nodeType = this.graph.nodeTypes.find((nodeType) => nodeType.name === type)!;
    return nodeType.get(id, this);
  }
  async *_getConnection<TEdge extends SolverEdge>(
    type: TEdge['type'],
    tailId: TEdge['tailId'],
    args: PageArgs<TEdge>,
  ): ConnectionGenerator<TEdge> {
    if (args.first && args.last) {
      throw new Error('Cannot specify both first and last');
    }
    const isForward = !args.last;
    const limit = isForward ? args.first! : args.last!;

    const edgeType = this.graph.edgeTypes.find((edgeType) => edgeType.typeName === type);
    if (!edgeType) throw new Error(`edge type not found: ${type}`);
    const edges = edgeType.get(
      tailId,
      {
        after: args.after,
        before: args.before,
        isForward,
        limit: limit + 1,
      },
      this,
    );

    const pageInfo: PageInfo<TEdge> = {
      hasNextPage: false,
      hasPreviousPage: false,
    };

    let foundAfter = false;
    let yieldedEdgeCount = 0;
    for await (const edge of edges) {
      if (args.after && !foundAfter) {
        if (edge.cursor === args.after) {
          foundAfter = true;
          continue;
        }
        continue;
      }
      if (args.before) {
        if (edge.cursor === args.before) {
          break;
        }
      }
      if (yieldedEdgeCount >= limit) {
        pageInfo.hasNextPage = true;
        break;
      }
      if (!pageInfo.startCursor) pageInfo.startCursor = edge.cursor;
      pageInfo.endCursor = edge.cursor;
      yieldedEdgeCount += 1;
      yield edge;
    }

    return pageInfo;
  }
  getConnection<TEdge extends SolverEdge>(
    type: TEdge['type'],
    tailId_: TEdge['tailId'],
    args_: PageArgs<TEdge>,
  ): Connection<TEdge> {
    const connection = new Connection<TEdge>(this._getConnection(type, tailId_, args_));
    return connection;
  }
}
