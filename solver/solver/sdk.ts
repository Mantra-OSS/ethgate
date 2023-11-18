/* eslint-disable @typescript-eslint/naming-convention */
import type { DocumentNode, ExecutionResult } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  JSONObject: { input: any; output: any; }
};

export type Query = {
  __typename?: 'Query';
  node?: Maybe<Node>;
  root: Explorer;
};


export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};

export type Node = {
  id: Scalars['ID']['output'];
  meta: NodeMeta;
  data: Scalars['JSONObject']['output'];
  connection: Connection;
};


export type NodeConnectionArgs = {
  type: Scalars['String']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
};

export type NodeMeta = {
  __typename?: 'NodeMeta';
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  chainId?: Maybe<Scalars['ID']['output']>;
};

export type Connection = {
  edges: Array<Edge>;
  pageInfo: PageInfo;
};

export type Edge = {
  type: Scalars['String']['output'];
  tailId: Scalars['ID']['output'];
  tail: Node;
  headId: Scalars['ID']['output'];
  head: Node;
  node: Node;
  cursor: Scalars['String']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
  endCursor?: Maybe<Scalars['String']['output']>;
};

export type Explorer = Node & {
  __typename?: 'Explorer';
  id: Scalars['ID']['output'];
  meta: NodeMeta;
  data: Scalars['JSONObject']['output'];
  connection: Connection;
  chains: ExplorerHasChainConnection;
};


export type ExplorerConnectionArgs = {
  type: Scalars['String']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
};


export type ExplorerChainsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
};

export type ExplorerHasChainConnection = Connection & {
  __typename?: 'ExplorerHasChainConnection';
  edges: Array<ExplorerHasChainEdge>;
  pageInfo: PageInfo;
};

export type ExplorerHasChainEdge = Edge & {
  __typename?: 'ExplorerHasChainEdge';
  type: Scalars['String']['output'];
  tailId: Scalars['ID']['output'];
  tail: Explorer;
  headId: Scalars['ID']['output'];
  head: Chain;
  node: Chain;
  cursor: Scalars['String']['output'];
};

export type Chain = Node & {
  __typename?: 'Chain';
  id: Scalars['ID']['output'];
  meta: NodeMeta;
  data: Scalars['JSONObject']['output'];
  connection: Connection;
  chains: ChainHasChainConnection;
  blocks: ChainHasBlockConnection;
  transactions: ChainHasTransactionConnection;
};


export type ChainConnectionArgs = {
  type: Scalars['String']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
};


export type ChainChainsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
};


export type ChainBlocksArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
};


export type ChainTransactionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
};

export type ChainHasChainConnection = Connection & {
  __typename?: 'ChainHasChainConnection';
  edges: Array<ChainHasChainEdge>;
  pageInfo: PageInfo;
};

export type ChainHasChainEdge = Edge & {
  __typename?: 'ChainHasChainEdge';
  type: Scalars['String']['output'];
  tailId: Scalars['ID']['output'];
  tail: Chain;
  headId: Scalars['ID']['output'];
  head: Chain;
  node: Chain;
  cursor: Scalars['String']['output'];
};

export type ChainHasBlockConnection = Connection & {
  __typename?: 'ChainHasBlockConnection';
  edges: Array<ChainHasBlockEdge>;
  pageInfo: PageInfo;
};

export type ChainHasBlockEdge = Edge & {
  __typename?: 'ChainHasBlockEdge';
  type: Scalars['String']['output'];
  tailId: Scalars['ID']['output'];
  tail: Chain;
  headId: Scalars['ID']['output'];
  head: Block;
  node: Block;
  cursor: Scalars['String']['output'];
};

export type Block = Node & {
  __typename?: 'Block';
  id: Scalars['ID']['output'];
  meta: NodeMeta;
  data: Scalars['JSONObject']['output'];
  connection: Connection;
  transactions: BlockHasTransactionConnection;
  logs: BlockHasLogConnection;
  receipts: BlockHasReceiptConnection;
};


export type BlockConnectionArgs = {
  type: Scalars['String']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
};


export type BlockTransactionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
};


export type BlockLogsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
};


export type BlockReceiptsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
};

export type BlockHasTransactionConnection = Connection & {
  __typename?: 'BlockHasTransactionConnection';
  edges: Array<BlockHasTransactionEdge>;
  pageInfo: PageInfo;
};

export type BlockHasTransactionEdge = Edge & {
  __typename?: 'BlockHasTransactionEdge';
  type: Scalars['String']['output'];
  tailId: Scalars['ID']['output'];
  tail: Block;
  headId: Scalars['ID']['output'];
  head: Transaction;
  node: Transaction;
  cursor: Scalars['String']['output'];
};

export type Transaction = Node & {
  __typename?: 'Transaction';
  id: Scalars['ID']['output'];
  meta: NodeMeta;
  data: Scalars['JSONObject']['output'];
  connection: Connection;
  logs: TransactionHasLogConnection;
};


export type TransactionConnectionArgs = {
  type: Scalars['String']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
};


export type TransactionLogsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
};

export type TransactionHasLogConnection = Connection & {
  __typename?: 'TransactionHasLogConnection';
  edges: Array<TransactionHasLogEdge>;
  pageInfo: PageInfo;
};

export type TransactionHasLogEdge = Edge & {
  __typename?: 'TransactionHasLogEdge';
  type: Scalars['String']['output'];
  tailId: Scalars['ID']['output'];
  tail: Transaction;
  headId: Scalars['ID']['output'];
  head: Log;
  node: Log;
  cursor: Scalars['String']['output'];
};

export type Log = Node & {
  __typename?: 'Log';
  id: Scalars['ID']['output'];
  meta: NodeMeta;
  data: Scalars['JSONObject']['output'];
  connection: Connection;
};


export type LogConnectionArgs = {
  type: Scalars['String']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
};

export type BlockHasLogConnection = Connection & {
  __typename?: 'BlockHasLogConnection';
  edges: Array<BlockHasLogEdge>;
  pageInfo: PageInfo;
};

export type BlockHasLogEdge = Edge & {
  __typename?: 'BlockHasLogEdge';
  type: Scalars['String']['output'];
  tailId: Scalars['ID']['output'];
  tail: Block;
  headId: Scalars['ID']['output'];
  head: Log;
  node: Log;
  cursor: Scalars['String']['output'];
};

export type BlockHasReceiptConnection = Connection & {
  __typename?: 'BlockHasReceiptConnection';
  edges: Array<BlockHasReceiptEdge>;
  pageInfo: PageInfo;
};

export type BlockHasReceiptEdge = Edge & {
  __typename?: 'BlockHasReceiptEdge';
  type: Scalars['String']['output'];
  tailId: Scalars['ID']['output'];
  tail: Block;
  headId: Scalars['ID']['output'];
  head: Receipt;
  node: Receipt;
  cursor: Scalars['String']['output'];
};

export type Receipt = Node & {
  __typename?: 'Receipt';
  id: Scalars['ID']['output'];
  meta: NodeMeta;
  data: Scalars['JSONObject']['output'];
  connection: Connection;
  logs: ReceiptHasLogConnection;
};


export type ReceiptConnectionArgs = {
  type: Scalars['String']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
};


export type ReceiptLogsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
};

export type ReceiptHasLogConnection = Connection & {
  __typename?: 'ReceiptHasLogConnection';
  edges: Array<ReceiptHasLogEdge>;
  pageInfo: PageInfo;
};

export type ReceiptHasLogEdge = Edge & {
  __typename?: 'ReceiptHasLogEdge';
  type: Scalars['String']['output'];
  tailId: Scalars['ID']['output'];
  tail: Receipt;
  headId: Scalars['ID']['output'];
  head: Log;
  node: Log;
  cursor: Scalars['String']['output'];
};

export type ChainHasTransactionConnection = Connection & {
  __typename?: 'ChainHasTransactionConnection';
  edges: Array<ChainHasTransactionEdge>;
  pageInfo: PageInfo;
};

export type ChainHasTransactionEdge = Edge & {
  __typename?: 'ChainHasTransactionEdge';
  type: Scalars['String']['output'];
  tailId: Scalars['ID']['output'];
  tail: Chain;
  headId: Scalars['ID']['output'];
  head: Transaction;
  node: Transaction;
  cursor: Scalars['String']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  node_connection?: Maybe<NodeConnectionSubscription>;
};


export type SubscriptionNode_ConnectionArgs = {
  id: Scalars['ID']['input'];
  type: Scalars['String']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
};

export type NodeConnectionSubscription = {
  __typename?: 'NodeConnectionSubscription';
  edges: Array<Edge>;
};

type NodeFragment_Explorer_Fragment = { __typename?: 'Explorer', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } };

type NodeFragment_Chain_Fragment = { __typename?: 'Chain', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } };

type NodeFragment_Block_Fragment = { __typename?: 'Block', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } };

type NodeFragment_Transaction_Fragment = { __typename?: 'Transaction', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } };

type NodeFragment_Log_Fragment = { __typename?: 'Log', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } };

type NodeFragment_Receipt_Fragment = { __typename?: 'Receipt', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } };

export type NodeFragmentFragment = NodeFragment_Explorer_Fragment | NodeFragment_Chain_Fragment | NodeFragment_Block_Fragment | NodeFragment_Transaction_Fragment | NodeFragment_Log_Fragment | NodeFragment_Receipt_Fragment;

type NodeConnectionFragment_Explorer_Fragment = { __typename?: 'Explorer', connection: { __typename?: 'ExplorerHasChainConnection', edges: Array<{ __typename?: 'ExplorerHasChainEdge', node: { __typename?: 'Chain', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ChainHasChainConnection', edges: Array<{ __typename?: 'ChainHasChainEdge', node: { __typename?: 'Chain', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ChainHasBlockConnection', edges: Array<{ __typename?: 'ChainHasBlockEdge', node: { __typename?: 'Block', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'BlockHasTransactionConnection', edges: Array<{ __typename?: 'BlockHasTransactionEdge', node: { __typename?: 'Transaction', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'TransactionHasLogConnection', edges: Array<{ __typename?: 'TransactionHasLogEdge', node: { __typename?: 'Log', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'BlockHasLogConnection', edges: Array<{ __typename?: 'BlockHasLogEdge', node: { __typename?: 'Log', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'BlockHasReceiptConnection', edges: Array<{ __typename?: 'BlockHasReceiptEdge', node: { __typename?: 'Receipt', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ReceiptHasLogConnection', edges: Array<{ __typename?: 'ReceiptHasLogEdge', node: { __typename?: 'Log', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ChainHasTransactionConnection', edges: Array<{ __typename?: 'ChainHasTransactionEdge', node: { __typename?: 'Transaction', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } };

type NodeConnectionFragment_Chain_Fragment = { __typename?: 'Chain', connection: { __typename?: 'ExplorerHasChainConnection', edges: Array<{ __typename?: 'ExplorerHasChainEdge', node: { __typename?: 'Chain', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ChainHasChainConnection', edges: Array<{ __typename?: 'ChainHasChainEdge', node: { __typename?: 'Chain', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ChainHasBlockConnection', edges: Array<{ __typename?: 'ChainHasBlockEdge', node: { __typename?: 'Block', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'BlockHasTransactionConnection', edges: Array<{ __typename?: 'BlockHasTransactionEdge', node: { __typename?: 'Transaction', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'TransactionHasLogConnection', edges: Array<{ __typename?: 'TransactionHasLogEdge', node: { __typename?: 'Log', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'BlockHasLogConnection', edges: Array<{ __typename?: 'BlockHasLogEdge', node: { __typename?: 'Log', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'BlockHasReceiptConnection', edges: Array<{ __typename?: 'BlockHasReceiptEdge', node: { __typename?: 'Receipt', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ReceiptHasLogConnection', edges: Array<{ __typename?: 'ReceiptHasLogEdge', node: { __typename?: 'Log', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ChainHasTransactionConnection', edges: Array<{ __typename?: 'ChainHasTransactionEdge', node: { __typename?: 'Transaction', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } };

type NodeConnectionFragment_Block_Fragment = { __typename?: 'Block', connection: { __typename?: 'ExplorerHasChainConnection', edges: Array<{ __typename?: 'ExplorerHasChainEdge', node: { __typename?: 'Chain', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ChainHasChainConnection', edges: Array<{ __typename?: 'ChainHasChainEdge', node: { __typename?: 'Chain', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ChainHasBlockConnection', edges: Array<{ __typename?: 'ChainHasBlockEdge', node: { __typename?: 'Block', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'BlockHasTransactionConnection', edges: Array<{ __typename?: 'BlockHasTransactionEdge', node: { __typename?: 'Transaction', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'TransactionHasLogConnection', edges: Array<{ __typename?: 'TransactionHasLogEdge', node: { __typename?: 'Log', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'BlockHasLogConnection', edges: Array<{ __typename?: 'BlockHasLogEdge', node: { __typename?: 'Log', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'BlockHasReceiptConnection', edges: Array<{ __typename?: 'BlockHasReceiptEdge', node: { __typename?: 'Receipt', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ReceiptHasLogConnection', edges: Array<{ __typename?: 'ReceiptHasLogEdge', node: { __typename?: 'Log', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ChainHasTransactionConnection', edges: Array<{ __typename?: 'ChainHasTransactionEdge', node: { __typename?: 'Transaction', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } };

type NodeConnectionFragment_Transaction_Fragment = { __typename?: 'Transaction', connection: { __typename?: 'ExplorerHasChainConnection', edges: Array<{ __typename?: 'ExplorerHasChainEdge', node: { __typename?: 'Chain', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ChainHasChainConnection', edges: Array<{ __typename?: 'ChainHasChainEdge', node: { __typename?: 'Chain', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ChainHasBlockConnection', edges: Array<{ __typename?: 'ChainHasBlockEdge', node: { __typename?: 'Block', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'BlockHasTransactionConnection', edges: Array<{ __typename?: 'BlockHasTransactionEdge', node: { __typename?: 'Transaction', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'TransactionHasLogConnection', edges: Array<{ __typename?: 'TransactionHasLogEdge', node: { __typename?: 'Log', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'BlockHasLogConnection', edges: Array<{ __typename?: 'BlockHasLogEdge', node: { __typename?: 'Log', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'BlockHasReceiptConnection', edges: Array<{ __typename?: 'BlockHasReceiptEdge', node: { __typename?: 'Receipt', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ReceiptHasLogConnection', edges: Array<{ __typename?: 'ReceiptHasLogEdge', node: { __typename?: 'Log', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ChainHasTransactionConnection', edges: Array<{ __typename?: 'ChainHasTransactionEdge', node: { __typename?: 'Transaction', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } };

type NodeConnectionFragment_Log_Fragment = { __typename?: 'Log', connection: { __typename?: 'ExplorerHasChainConnection', edges: Array<{ __typename?: 'ExplorerHasChainEdge', node: { __typename?: 'Chain', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ChainHasChainConnection', edges: Array<{ __typename?: 'ChainHasChainEdge', node: { __typename?: 'Chain', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ChainHasBlockConnection', edges: Array<{ __typename?: 'ChainHasBlockEdge', node: { __typename?: 'Block', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'BlockHasTransactionConnection', edges: Array<{ __typename?: 'BlockHasTransactionEdge', node: { __typename?: 'Transaction', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'TransactionHasLogConnection', edges: Array<{ __typename?: 'TransactionHasLogEdge', node: { __typename?: 'Log', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'BlockHasLogConnection', edges: Array<{ __typename?: 'BlockHasLogEdge', node: { __typename?: 'Log', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'BlockHasReceiptConnection', edges: Array<{ __typename?: 'BlockHasReceiptEdge', node: { __typename?: 'Receipt', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ReceiptHasLogConnection', edges: Array<{ __typename?: 'ReceiptHasLogEdge', node: { __typename?: 'Log', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ChainHasTransactionConnection', edges: Array<{ __typename?: 'ChainHasTransactionEdge', node: { __typename?: 'Transaction', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } };

type NodeConnectionFragment_Receipt_Fragment = { __typename?: 'Receipt', connection: { __typename?: 'ExplorerHasChainConnection', edges: Array<{ __typename?: 'ExplorerHasChainEdge', node: { __typename?: 'Chain', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ChainHasChainConnection', edges: Array<{ __typename?: 'ChainHasChainEdge', node: { __typename?: 'Chain', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ChainHasBlockConnection', edges: Array<{ __typename?: 'ChainHasBlockEdge', node: { __typename?: 'Block', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'BlockHasTransactionConnection', edges: Array<{ __typename?: 'BlockHasTransactionEdge', node: { __typename?: 'Transaction', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'TransactionHasLogConnection', edges: Array<{ __typename?: 'TransactionHasLogEdge', node: { __typename?: 'Log', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'BlockHasLogConnection', edges: Array<{ __typename?: 'BlockHasLogEdge', node: { __typename?: 'Log', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'BlockHasReceiptConnection', edges: Array<{ __typename?: 'BlockHasReceiptEdge', node: { __typename?: 'Receipt', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ReceiptHasLogConnection', edges: Array<{ __typename?: 'ReceiptHasLogEdge', node: { __typename?: 'Log', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ChainHasTransactionConnection', edges: Array<{ __typename?: 'ChainHasTransactionEdge', node: { __typename?: 'Transaction', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } };

export type NodeConnectionFragmentFragment = NodeConnectionFragment_Explorer_Fragment | NodeConnectionFragment_Chain_Fragment | NodeConnectionFragment_Block_Fragment | NodeConnectionFragment_Transaction_Fragment | NodeConnectionFragment_Log_Fragment | NodeConnectionFragment_Receipt_Fragment;

export type NodeQueryQueryVariables = Exact<{
  nodeId: Scalars['ID']['input'];
}>;


export type NodeQueryQuery = { __typename?: 'Query', node?: { __typename?: 'Explorer', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } | { __typename?: 'Chain', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } | { __typename?: 'Block', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } | { __typename?: 'Transaction', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } | { __typename?: 'Log', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } | { __typename?: 'Receipt', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } | null };

export type ConnectionQueryQueryVariables = Exact<{
  nodeId: Scalars['ID']['input'];
  edgeTypeName: Scalars['String']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type ConnectionQueryQuery = { __typename?: 'Query', node?: { __typename?: 'Explorer', connection: { __typename?: 'ExplorerHasChainConnection', edges: Array<{ __typename?: 'ExplorerHasChainEdge', node: { __typename?: 'Chain', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ChainHasChainConnection', edges: Array<{ __typename?: 'ChainHasChainEdge', node: { __typename?: 'Chain', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ChainHasBlockConnection', edges: Array<{ __typename?: 'ChainHasBlockEdge', node: { __typename?: 'Block', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'BlockHasTransactionConnection', edges: Array<{ __typename?: 'BlockHasTransactionEdge', node: { __typename?: 'Transaction', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'TransactionHasLogConnection', edges: Array<{ __typename?: 'TransactionHasLogEdge', node: { __typename?: 'Log', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'BlockHasLogConnection', edges: Array<{ __typename?: 'BlockHasLogEdge', node: { __typename?: 'Log', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'BlockHasReceiptConnection', edges: Array<{ __typename?: 'BlockHasReceiptEdge', node: { __typename?: 'Receipt', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ReceiptHasLogConnection', edges: Array<{ __typename?: 'ReceiptHasLogEdge', node: { __typename?: 'Log', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ChainHasTransactionConnection', edges: Array<{ __typename?: 'ChainHasTransactionEdge', node: { __typename?: 'Transaction', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } } | { __typename?: 'Chain', connection: { __typename?: 'ExplorerHasChainConnection', edges: Array<{ __typename?: 'ExplorerHasChainEdge', node: { __typename?: 'Chain', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ChainHasChainConnection', edges: Array<{ __typename?: 'ChainHasChainEdge', node: { __typename?: 'Chain', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ChainHasBlockConnection', edges: Array<{ __typename?: 'ChainHasBlockEdge', node: { __typename?: 'Block', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'BlockHasTransactionConnection', edges: Array<{ __typename?: 'BlockHasTransactionEdge', node: { __typename?: 'Transaction', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'TransactionHasLogConnection', edges: Array<{ __typename?: 'TransactionHasLogEdge', node: { __typename?: 'Log', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'BlockHasLogConnection', edges: Array<{ __typename?: 'BlockHasLogEdge', node: { __typename?: 'Log', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'BlockHasReceiptConnection', edges: Array<{ __typename?: 'BlockHasReceiptEdge', node: { __typename?: 'Receipt', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ReceiptHasLogConnection', edges: Array<{ __typename?: 'ReceiptHasLogEdge', node: { __typename?: 'Log', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ChainHasTransactionConnection', edges: Array<{ __typename?: 'ChainHasTransactionEdge', node: { __typename?: 'Transaction', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } } | { __typename?: 'Block', connection: { __typename?: 'ExplorerHasChainConnection', edges: Array<{ __typename?: 'ExplorerHasChainEdge', node: { __typename?: 'Chain', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ChainHasChainConnection', edges: Array<{ __typename?: 'ChainHasChainEdge', node: { __typename?: 'Chain', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ChainHasBlockConnection', edges: Array<{ __typename?: 'ChainHasBlockEdge', node: { __typename?: 'Block', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'BlockHasTransactionConnection', edges: Array<{ __typename?: 'BlockHasTransactionEdge', node: { __typename?: 'Transaction', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'TransactionHasLogConnection', edges: Array<{ __typename?: 'TransactionHasLogEdge', node: { __typename?: 'Log', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'BlockHasLogConnection', edges: Array<{ __typename?: 'BlockHasLogEdge', node: { __typename?: 'Log', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'BlockHasReceiptConnection', edges: Array<{ __typename?: 'BlockHasReceiptEdge', node: { __typename?: 'Receipt', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ReceiptHasLogConnection', edges: Array<{ __typename?: 'ReceiptHasLogEdge', node: { __typename?: 'Log', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ChainHasTransactionConnection', edges: Array<{ __typename?: 'ChainHasTransactionEdge', node: { __typename?: 'Transaction', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } } | { __typename?: 'Transaction', connection: { __typename?: 'ExplorerHasChainConnection', edges: Array<{ __typename?: 'ExplorerHasChainEdge', node: { __typename?: 'Chain', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ChainHasChainConnection', edges: Array<{ __typename?: 'ChainHasChainEdge', node: { __typename?: 'Chain', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ChainHasBlockConnection', edges: Array<{ __typename?: 'ChainHasBlockEdge', node: { __typename?: 'Block', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'BlockHasTransactionConnection', edges: Array<{ __typename?: 'BlockHasTransactionEdge', node: { __typename?: 'Transaction', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'TransactionHasLogConnection', edges: Array<{ __typename?: 'TransactionHasLogEdge', node: { __typename?: 'Log', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'BlockHasLogConnection', edges: Array<{ __typename?: 'BlockHasLogEdge', node: { __typename?: 'Log', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'BlockHasReceiptConnection', edges: Array<{ __typename?: 'BlockHasReceiptEdge', node: { __typename?: 'Receipt', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ReceiptHasLogConnection', edges: Array<{ __typename?: 'ReceiptHasLogEdge', node: { __typename?: 'Log', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ChainHasTransactionConnection', edges: Array<{ __typename?: 'ChainHasTransactionEdge', node: { __typename?: 'Transaction', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } } | { __typename?: 'Log', connection: { __typename?: 'ExplorerHasChainConnection', edges: Array<{ __typename?: 'ExplorerHasChainEdge', node: { __typename?: 'Chain', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ChainHasChainConnection', edges: Array<{ __typename?: 'ChainHasChainEdge', node: { __typename?: 'Chain', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ChainHasBlockConnection', edges: Array<{ __typename?: 'ChainHasBlockEdge', node: { __typename?: 'Block', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'BlockHasTransactionConnection', edges: Array<{ __typename?: 'BlockHasTransactionEdge', node: { __typename?: 'Transaction', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'TransactionHasLogConnection', edges: Array<{ __typename?: 'TransactionHasLogEdge', node: { __typename?: 'Log', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'BlockHasLogConnection', edges: Array<{ __typename?: 'BlockHasLogEdge', node: { __typename?: 'Log', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'BlockHasReceiptConnection', edges: Array<{ __typename?: 'BlockHasReceiptEdge', node: { __typename?: 'Receipt', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ReceiptHasLogConnection', edges: Array<{ __typename?: 'ReceiptHasLogEdge', node: { __typename?: 'Log', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ChainHasTransactionConnection', edges: Array<{ __typename?: 'ChainHasTransactionEdge', node: { __typename?: 'Transaction', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } } | { __typename?: 'Receipt', connection: { __typename?: 'ExplorerHasChainConnection', edges: Array<{ __typename?: 'ExplorerHasChainEdge', node: { __typename?: 'Chain', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ChainHasChainConnection', edges: Array<{ __typename?: 'ChainHasChainEdge', node: { __typename?: 'Chain', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ChainHasBlockConnection', edges: Array<{ __typename?: 'ChainHasBlockEdge', node: { __typename?: 'Block', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'BlockHasTransactionConnection', edges: Array<{ __typename?: 'BlockHasTransactionEdge', node: { __typename?: 'Transaction', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'TransactionHasLogConnection', edges: Array<{ __typename?: 'TransactionHasLogEdge', node: { __typename?: 'Log', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'BlockHasLogConnection', edges: Array<{ __typename?: 'BlockHasLogEdge', node: { __typename?: 'Log', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'BlockHasReceiptConnection', edges: Array<{ __typename?: 'BlockHasReceiptEdge', node: { __typename?: 'Receipt', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ReceiptHasLogConnection', edges: Array<{ __typename?: 'ReceiptHasLogEdge', node: { __typename?: 'Log', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } | { __typename?: 'ChainHasTransactionConnection', edges: Array<{ __typename?: 'ChainHasTransactionEdge', node: { __typename?: 'Transaction', id: string, data: any, meta: { __typename?: 'NodeMeta', name: string, slug: string } } }> } } | null };

export const NodeFragmentFragmentDoc = gql`
    fragment NodeFragment on Node {
  id
  meta {
    name
    slug
  }
  data
}
    `;
export const NodeConnectionFragmentFragmentDoc = gql`
    fragment NodeConnectionFragment on Node @argumentDefinitions(nodeId: {type: "ID!"}, edgeTypeName: {type: "String!"}, first: {type: "Int"}, after: {type: "String"}) @refetchable(queryName: "NodeConnectionPaginationQuery") {
  connection(type: $edgeTypeName, first: $first, after: $after) @connection(key: "ConnectionQuery_connection") {
    edges {
      node {
        ...NodeFragment @inline
      }
    }
  }
}
    ${NodeFragmentFragmentDoc}`;
export const NodeQueryDocument = gql`
    query NodeQuery($nodeId: ID!) {
  node(id: $nodeId) {
    ...NodeFragment @inline
  }
}
    ${NodeFragmentFragmentDoc}`;
export const ConnectionQueryDocument = gql`
    query ConnectionQuery($nodeId: ID!, $edgeTypeName: String!, $first: Int, $after: String) {
  node(id: $nodeId) {
    ...NodeConnectionFragment @arguments(nodeId: $nodeId, edgeTypeName: $edgeTypeName, first: $first, after: $after)
  }
}
    ${NodeConnectionFragmentFragmentDoc}`;
export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<ExecutionResult<R, E>> | AsyncIterable<ExecutionResult<R, E>>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    NodeQuery(variables: NodeQueryQueryVariables, options?: C): Promise<ExecutionResult<NodeQueryQuery, E>> {
      return requester<NodeQueryQuery, NodeQueryQueryVariables>(NodeQueryDocument, variables, options) as Promise<ExecutionResult<NodeQueryQuery, E>>;
    },
    ConnectionQuery(variables: ConnectionQueryQueryVariables, options?: C): Promise<ExecutionResult<ConnectionQueryQuery, E>> {
      return requester<ConnectionQueryQuery, ConnectionQueryQueryVariables>(ConnectionQueryDocument, variables, options) as Promise<ExecutionResult<ConnectionQueryQuery, E>>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
