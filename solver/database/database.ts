import type {
  Akshara,
  AksharaAbstract,
  AksharaBlockData,
  AksharaChainId,
} from "@/akshara/index.js";
import { parseGlobalId } from "@ethgate/spec-solver";

import type {
  Chain,
  ConnectionGenerator,
  EdgeAbstract,
  NodeAbstract,
  PageArgs,
  PageInfo,
} from "../data/index.js";
import {
  Block,
  ChainHasBlock,
  Connection,
  DatabaseAbstract,
} from "../data/index.js";
import { SolverGraph } from "../graph/index.js";

const graph = new SolverGraph();

export type EthgateSolverDatabaseConfig = {
  node: AksharaAbstract;
};

export class EthgateSolverDatabase extends DatabaseAbstract<
  NodeAbstract,
  EdgeAbstract
> {
  node: AksharaAbstract;

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
  }

  async *getBlocksByTag(
    chainId: AksharaChainId
  ): AsyncGenerator<AksharaBlockData, never, void> {
    while (true) {
      const block = await this.node.execute("GetLatestBlock", [{ chainId }]);
      if (!block) continue;
      yield block;
    }
  }

  async *networkUpdates(networkId: Chain["id"]): AsyncGenerator<ChainHasBlock> {
    const [, chainId] = parseGlobalId(networkId);
    const latestBlocks = this.getBlocksByTag(chainId);
    let last;
    for await (const providerBlock of latestBlocks) {
      const block = new Block(providerBlock);
      if (last && last.id === block.id) continue;
      last = block;
      const edge = new ChainHasBlock(
        networkId,
        block.id,
        {},
        block.data.timestamp
      );
      yield edge;
    }
  }

  async getNode<Node extends NodeAbstract>(
    id: Node["id"]
  ): Promise<Node | undefined> {
    const [type] = parseGlobalId(id);
    const nodeType = graph.nodeTypes.find(
      (nodeType) => nodeType.schema.aksharaType === type
    )!;
    return nodeType.get(id, this);
  }
  async *_getConnection<Edge extends EdgeAbstract>(
    type: Edge["type"],
    tailId: Edge["tailId"],
    args: PageArgs<Edge>
  ): ConnectionGenerator<Edge> {
    if (args.first && args.last) {
      throw new Error("Cannot specify both first and last");
    }
    const isForward = !args.last;
    const limit = isForward ? args.first! : args.last!;

    const edgeType = graph.edgeTypes.find(
      (edgeType) => edgeType.name === type
    )!;
    const edges = edgeType.get(
      tailId,
      {
        after: args.after,
        before: args.before,
        isForward,
        limit: limit + 1,
      },
      this
    );

    const pageInfo: PageInfo<Edge> = {
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
  getConnection<Edge extends EdgeAbstract>(
    type: Edge["type"],
    tailId_: Edge["tailId"],
    args_: PageArgs<Edge>
  ): Connection<Edge> {
    const connection = new Connection<Edge>(
      this._getConnection(type, tailId_, args_)
    );
    return connection;
  }
}
