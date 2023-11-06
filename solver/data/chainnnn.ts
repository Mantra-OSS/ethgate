/* eslint-disable @typescript-eslint/no-unused-vars */
import type { EthgateSolverDatabase } from '../database/database';
import type { ProperPageArgs } from '../graph';

import type { Chain } from './akshara';
import { chainType } from './akshara';
import { Block } from './akshara';
import type { EdgeGenerator } from './database/abstract';
import { SolverEdge } from './database/abstract';

export class ChainHasDescendantBlock extends SolverEdge<
  'ChainHasDescendantBlock',
  Chain['id'],
  Block['id'],
  {
    blockNumber: number;
  }
> {
  static typeName = 'ChainHasDescendantBlock' as const;
  type = 'ChainHasDescendantBlock' as const;
  static tail = chainType;
  static head = Block.type;
  static connectionName = 'descendantBlocks';
  static async *get(
    tailId: ChainHasDescendantBlock['tailId'],
    args: ProperPageArgs<ChainHasDescendantBlock>,
    ctx: EthgateSolverDatabase,
  ): EdgeGenerator<ChainHasDescendantBlock> {
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
    //     new ChainHasDescendantBlock(
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
