import { chains } from '@mantra-oss/chains';

import { SolverEdge } from './abstract';
import type { EdgeGenerator } from './abstract';
import { type Chain, chainType } from './akshara';
import { NodeType } from './graph/abstract';
import type { ProperPageArgs } from './graph/abstract';
import type { SolverNode } from './graph/abstract';

export const explorerType = new NodeType<Explorer>('Explorer', (id, data) => ({
  id,
  type: 'Explorer',
  meta: {
    name: '',
    slug: '',
    path: [],
  },
  data,
}));
export type Explorer = SolverNode<'Explorer', object, `Explorer:`>;

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
    ctx: unknown,
  ): EdgeGenerator<ExplorerHasChain> {
    for (const chain of Object.values(chains)) {
      const edge = new ExplorerHasChain(tailId, `Chain:${chain.chainId}`, {}, 0);
      yield edge;
    }
  }
}
