import type { EthgateSolverDatabase } from '../database/database';
import type { ProperPageArgs } from '../graph';

import { Chain } from './akshara';
import { Block } from './akshara';
import type { EdgeGenerator } from './database/abstract';
import { EdgeAbstract } from './database/abstract';

export class ChainHasDescendantBlock extends EdgeAbstract<
  'ChainHasDescendantBlock',
  Chain['id'],
  Block['id'],
  {
    blockNumber: number;
  }
> {
  static typeName = 'ChainHasDescendantBlock' as const;
  type = 'ChainHasDescendantBlock' as const;
  static tail = Chain.type;
  static head = Block;
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
