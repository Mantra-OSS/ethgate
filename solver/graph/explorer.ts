import { chains } from '@mantra-oss/chains';

import type { EthgateSolverDatabase } from '../database';
import type { EdgeGenerator } from '../database/abstract';

import type { Block } from './akshara';
import { type Chain, blockType, chainType } from './akshara';
import { EdgeType2, NodeType, SolverEdge } from './graph/abstract';
import type { GraphTypeContext, ProperPageArgs, SolverEdgeTypeMeta } from './graph/abstract';
import type { SolverNode } from './graph/abstract';

export const explorerType = new NodeType<Explorer>(
  'Explorer',
  (id, ctx) => ({
    chains,
  }),
  (data) => ({
    id: 'Explorer:',
    type: 'Explorer',
    meta: {
      name: '',
      slug: '',
      nodePath: [],
    },
    data,
  }),
);
export type Explorer = SolverNode<
  'Explorer',
  {
    chains: typeof chains;
  },
  `Explorer:`
>;

export class ExplorerHasChainType extends EdgeType2<ExplorerHasChain> {
  name = 'ExplorerHasChain' as const;
  tail = explorerType;
  head = chainType;
  meta = { name: 'Chains', slug: 'chains' };
  get = async function* get(
    tailId: ExplorerHasChain['tailId'],
    args: ProperPageArgs<ExplorerHasChain>,
    ctx: GraphTypeContext,
  ): EdgeGenerator<ExplorerHasChain> {
    const tail = (await explorerType.get(tailId, ctx))!;
    for (const chain of Object.values(tail.data.chains)) {
      const edge = new ExplorerHasChain(tailId, `Chain:${chain.chainId}`, {}, 0);
      yield edge;
    }
  };
}

export const explorerHasChainType = new ExplorerHasChainType();

export class ExplorerHasChain extends SolverEdge<
  'ExplorerHasChain',
  Explorer['id'],
  Chain['id'],
  object
> {
  static typeName = explorerHasChainType.name;
  type = 'ExplorerHasChain' as const;
  static tail = explorerHasChainType.tail;
  static head = explorerHasChainType.head;
  static connectionName = explorerHasChainType.connectionName;
  static get = explorerHasChainType.get;
}

export class ExplorerHasBlock extends SolverEdge<
  'ExplorerHasBlock',
  Chain['id'],
  Block['id'],
  {
    blockNumber: number;
  }
> {
  static typeName = 'ExplorerHasBlock' as const;
  type = 'ExplorerHasBlock' as const;
  static tail = chainType;
  static head = blockType;
  static connectionName = 'descendantBlocks';
  static async *get(
    tailId: ExplorerHasBlock['tailId'],
    args: ProperPageArgs<ExplorerHasBlock>,
    ctx: EthgateSolverDatabase,
  ): EdgeGenerator<ExplorerHasBlock> {
    // let assocs;
    // // const tail = await ctx.readNode<Chain>(tailId);
    // if (args.isForward) {
    //   if (args.after) {
    //     const block = await ctx.readNode<Block>(args.after);
    //     assocs = await ctx.provider.getBlockTimeRange({}, block.data.timestamp, args.limit + 1);
    //     assocs.shift();
    //   } else {
    //     assocs = await ctx.provider.getBlockRange({}, 0, args.limit);
    //   }
    // } else {
    //   throw new Error('Not implemented');
    // }
    // const blocks = assocs.map((assoc) => new Block(assoc));
    // const edges = blocks.map(
    //   (block) =>
    //     new ExplorerHasBlock(
    //       tailId,
    //       block.id,
    //       {
    //         blockNumber: block.data.number as any,
    //       },
    //       block.data.timestamp,
    //     ),
    // );
    // yield* edges;
    // return;
  }
}
