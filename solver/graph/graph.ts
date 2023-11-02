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
} from '../data/akshara.js';
import { BlockHasLog, ChainHasTransaction } from '../data/chainnn.js';
import { ChainHasDescendantBlock } from '../data/chainnnn.js';

import type { EdgeType } from './abstract.js';
import { SolverGraphAbstract } from './abstract.js';
import type { NodeType } from './index.js';

export class SolverGraph extends SolverGraphAbstract {
  nodeTypes: NodeType<any>[] = [Chain.type, Block, Transaction, Receipt, Log];
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
