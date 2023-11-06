import {
  BlockHasReceipt,
  BlockHasTransaction,
  ChainHasBlock,
  ChainHasChain,
  ReceiptHasLog,
  blockType,
  chainType,
  logType,
  receiptType,
  transactionType,
} from '../data/akshara';
import { BlockHasLog, ChainHasTransaction } from '../data/chainnn';
import { ChainHasDescendantBlock } from '../data/chainnnn';

import type { NodeType } from '.';
import type { EdgeType } from './abstract';
import { SolverGraphAbstract } from './abstract';

export class SolverGraph extends SolverGraphAbstract {
  nodeTypes: NodeType<any>[] = [chainType, blockType, transactionType, receiptType, logType];
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
