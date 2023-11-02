import type {
  Address,
  AksharaBlockData,
  AksharaChainId,
  AksharaLogData,
  AksharaReceiptData,
  AksharaTransactionData,
  Hash,
  Hex,
  PeerTypes,
} from '@ethgate/spec-node';

export const blockFromEth = (chainId: AksharaChainId, obj: PeerTypes.Block): AksharaBlockData => ({
  chainId,
  hash: obj.hash as Hash,
  number: parseInt(obj.number, 16),
  parentHash: obj.parentHash as Hash,
  gasLimit: parseInt(obj.gasLimit, 16),
  gasUsed: parseInt(obj.gasUsed, 16),
  baseFeePerGas: parseInt(obj.baseFeePerGas, 16),
  logsBloom: obj.logsBloom as Hex,
  miner: obj.miner as Address,
  size: parseInt(obj.size, 16),
  timestamp: parseInt(obj.timestamp, 16),
  transactions: obj.transactions as Hash[],
});

export const transactionFromEth = (
  chainId: AksharaChainId,
  obj: PeerTypes.Transaction,
): AksharaTransactionData => ({
  chainId: chainId,
  blockHash: obj.blockHash as Hash,
  blockNumber: parseInt(obj.blockNumber, 16),
  from: obj.from as Address,
  gas: parseInt(obj.gas, 16),
  gasPrice: parseInt(obj.gasPrice, 16),
  hash: obj.hash as Hash,
  input: obj.input as Hex,
  nonce: obj.nonce as Hex,
  to: obj.to as Address,
  transactionIndex: parseInt(obj.transactionIndex, 16),
  value: obj.value as Hex,
  v: obj.v as Hex,
  r: obj.r as Hex,
  s: obj.s as Hex,
});

export const receiptFromEth = (
  chainId: AksharaChainId,
  obj: PeerTypes.Receipt,
): AksharaReceiptData => ({
  chainId,
  blockHash: obj.blockHash as Hash,
  blockNumber: parseInt(obj.blockNumber, 16),
  contractAddress: obj.contractAddress as Address | undefined,
  cumulativeGasUsed: parseInt(obj.cumulativeGasUsed, 16),
  from: obj.from as Address,
  gasUsed: parseInt(obj.gasUsed, 16),
  logs: obj.logs.map((log) => logFromEth(chainId, log)),
  logsBloom: obj.logsBloom as Hex,
  status: obj.status as Hex,
  to: obj.to as Address,
  transactionHash: obj.transactionHash as Hash,
  transactionIndex: parseInt(obj.transactionIndex, 16),
});

export const logFromEth = (chainId: AksharaChainId, obj: PeerTypes.Log): AksharaLogData => ({
  chainId,
  address: obj.address as Address,
  topics: obj.topics as Array<Hash>,
  data: obj.data as Hex,
  blockNumber: parseInt(obj.blockNumber, 16),
  transactionHash: obj.transactionHash as Hash,
  transactionIndex: parseInt(obj.transactionIndex, 16),
  blockHash: obj.blockHash as Hash,
  logIndex: parseInt(obj.logIndex, 16),
  removed: obj.removed as boolean,
});
