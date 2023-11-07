import { chains } from '@mantra-oss/chains';

import type { EthgateSolverDatabase } from '../database';

import { SolverEdge } from './abstract';
import type { EdgeGenerator } from './abstract';
import type { Block } from './akshara';
import { type Chain, blockType, chainType } from './akshara';
import { NodeType } from './graph/abstract';
import type { GraphTypeContext, ProperPageArgs } from './graph/abstract';
import type { SolverNode } from './graph/abstract';

export const explorerType = new NodeType<Explorer>('Explorer', (id, data) => ({
  id,
  type: 'Explorer',
  meta: {
    name: '',
    slug: '',
    path: [],
  },
  data: {
    chains,
  },
}));
export type Explorer = SolverNode<
  'Explorer',
  {
    chains: typeof chains;
  },
  `Explorer:`
>;

export class ExplorerHasChain extends SolverEdge<
  'ExplorerHasChain',
  Explorer['id'],
  Chain['id'],
  object
> {
  static typeName = 'ExplorerHasChain' as const;
  type = 'ExplorerHasChain' as const;
  static tail = explorerType;
  static head = chainType;
  static connectionName = 'chains';
  static async *get(
    tailId: ExplorerHasChain['tailId'],
    args: ProperPageArgs<ExplorerHasChain>,
    ctx: GraphTypeContext,
  ): EdgeGenerator<ExplorerHasChain> {
    const tail = (await explorerType.get(tailId, ctx))!;
    for (const chain of Object.values(tail.data.chains)) {
      const edge = new ExplorerHasChain(tailId, `Chain:${chain.chainId}`, {}, 0);
      yield edge;
    }
  }
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
