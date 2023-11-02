export type Hex = string;
export const zeroHex: Hex = '0x';
export type Hash = string;
export const zeroHash: Hash = '0x0000000000000000000000000000000000000000000000000000000000000000';

// `earliest`: The lowest numbered block the client has available;
// `finalized`: The most recent crypto-economically secure block, cannot be re-orged outside of manual intervention driven by community coordination;
// `safe`: The most recent block that is safe from re-orgs under honest majority and certain synchronicity assumptions;
// `latest`: The most recent block in the canonical chain observed by the client, this block may be re-orged out of the canonical chain even under healthy/normal conditions;
// `pending`: A sample next block built by the client on top of `latest` and containing the set of transactions usually taken from local mempool.
export type BlockTag = 'earliest' | 'finalized' | 'safe' | 'latest' | 'pending';

export type ChainId = string;

export type Address = string;

export type Eip2930AccessListEntry = {
  address: Address;
  storageKeys: Array<Hash>;
};

export type Eip2930AccessList = Array<Eip2930AccessListEntry>;

export type TransactionRequest = {
  type?: Hex;
  nonce?: Hex;
  to?: Address;
  from?: Address;
  gas?: Hex;
  value?: Hex;
  data?: Hex;
  gasPrice?: Hex;
  maxPriorityFeePerGas?: Hex;
  maxFeePerGas?: Hex;
  accessList?: Eip2930AccessList;
  chainId?: Hex;
};

export type Withdrawal = {
  address: Address;
  amount: Hex;
  index: Hex;
  validatorIndex: Hex;
};

export type Block = {
  difficulty: Hex;
  extraData: Hex;
  gasLimit: Hex;
  gasUsed: Hex;
  hash: Hash;
  logsBloom: Hex;
  miner: Address;
  mixHash: Hash;
  nonce: Hex;
  number: Hex;
  parentHash: Hash;
  receiptsRoot: Hash;
  sha3Uncles: Hash;
  size: Hex;
  stateRoot: Hash;
  timestamp: Hex;
  totalDifficulty: Hex;
  transactions: Array<Hash>;
  transactionsRoot: Hash;
  uncles: Array<Hash>;
  baseFeePerGas: Hex;
  withdrawals: Array<Withdrawal>;
  withdrawalsRoot: Hash;
};

export type BlockWithTransactions = Omit<Block, 'transactions'> & {
  transactions: Array<Transaction>;
};

export type LegacyTransaction = {
  type: '0x0';
  chainId?: Hex;
  blockHash: Hash;
  blockNumber: Hex;
  from: Address;
  gas: Hex;
  gasPrice: Hex;
  hash: Hash;
  input: Hex;
  nonce: Hex;
  to: Address;
  transactionIndex: Hex;
  value: Hex;
  v: Hex;
  r: Hex;
  s: Hex;
};

// https://eips.ethereum.org/EIPS/eip-2930
export type Eip2930Transaction = LegacyTransaction & {
  type: '0x1';
  accessList: Eip2930AccessList;
  chainId: Hex;
};

// https://eips.ethereum.org/EIPS/eip-1559
export type EthereumEip1559Transaction = LegacyTransaction & {
  type: '0x2';
  maxPriorityFeePerGas: Hex;
  maxFeePerGas: Hex;
  accessList: Eip2930AccessList;
  chainId: Hex;
};

export type Transaction = LegacyTransaction | Eip2930Transaction | EthereumEip1559Transaction;

export type Receipt = {
  blockHash: Hash;
  blockNumber: Hex;
  contractAddress: Address | null;
  cumulativeGasUsed: Hex;
  from: Address;
  gasUsed: Hex;
  logs: Array<Log>;
  logsBloom: Hex;
  status: Hex;
  to: Address;
  transactionHash: Hash;
  transactionIndex: Hex;
  effectiveGasPrice: Hex;
  type: Hex;
};

export type Log = {
  address: Address;
  topics: Array<Hash>;
  data: Hex;
  blockNumber: Hex;
  transactionHash: Hash;
  transactionIndex: Hex;
  blockHash: Hash;
  logIndex: Hex;
  removed: boolean;
};
