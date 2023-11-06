import {
  Block,
  BlockHasReceipt,
  BlockHasTransaction,
  Chain,
  ChainHasBlock,
  ChainHasChain,
  Log,
  Receipt,
  ReceiptHasLog,
  Transaction,
} from '../data/akshara';
import { BlockHasLog, ChainHasTransaction } from '../data/chainnn';
import { ChainHasDescendantBlock } from '../data/chainnnn';

import type { NodeType } from '.';
import type { EdgeType } from './abstract';
import { SolverGraphAbstract } from './abstract';

export class SolverGraph extends SolverGraphAbstract {
  nodeTypes: NodeType<any>[] = [Chain.type, Block.type, Transaction.type, Receipt.type, Log.type];
  edgeTypes: EdgeType<any>[] = [
    ChainHasChain,
    ChainHasBlock,
    ChainHasTransaction,
    BlockHasTransaction,
    BlockHasLog,
    BlockHasReceipt,
    ReceiptHasLog,
    ChainHasDescendantBlock,
  ];
}
