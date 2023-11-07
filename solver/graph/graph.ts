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
import {
  BlockHasLog,
  ChainHasDescendantBlock,
  ChainHasTransaction,
  TransactionHasLog,
} from '../data/derived';
import { ExplorerHasChain, explorerType } from '../data/explorer';

import type { NodeType } from '.';
import type { EdgeType } from './abstract';
import { SolverGraphAbstract } from './abstract';

export class SolverGraph extends SolverGraphAbstract {
  nodeTypes: NodeType<any>[] = [
    explorerType,
    chainType,
    blockType,
    transactionType,
    receiptType,
    logType,
  ];
  edgeTypes: EdgeType<any>[] = [
    ExplorerHasChain,
    ChainHasChain,
    ChainHasBlock,
    ChainHasTransaction,
    BlockHasTransaction,
    BlockHasLog,
    BlockHasReceipt,
    TransactionHasLog,
    ReceiptHasLog,
    ChainHasDescendantBlock,
  ];
}
