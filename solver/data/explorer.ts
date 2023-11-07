import type * as Ethgate from '@/lib-node';
import {
  formatBlockId,
  formatChainId,
  formatLogId,
  formatReceiptId,
  formatTransactionId,
  maxTime,
  minTime,
  parseObjectId,
} from '@/lib-node';
import { blockSchema, chainSchema, logSchema, receiptSchema, transactionSchema } from '@/spec-node';
import { parseGlobalId } from '@/spec-solver';
import { chains } from '@mantra-oss/chains';

import type { ProperPageArgs } from '../graph';
import { NodeType } from '../graph';

import { type Chain, chainType } from './akshara';
import { SolverEdge, SolverNode } from './database/abstract';
import type { EdgeGenerator, ObjectId } from './database/abstract';

export const explorerType = new NodeType<Explorer>(
  'Explorer',
  (id, data) => new Explorer(`Explorer:`, data),
);
export class Explorer extends SolverNode<'Explorer', object, `Explorer:`> {
  type = 'Explorer' as const;
  meta = {
    name: '',
    slug: '',
    path: [],
  };
}

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
