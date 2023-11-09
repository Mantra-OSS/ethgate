export type AksharaAssocs = {
  ChainHasBlock: { Data: { chainId: string; number: number } };
  BlockHasTransaction: { Data: { chainId: string; transactionIndex: number } };
  ReceiptHasLog: { Data: { chainId: string } };
};

export type AksharaAssocData = AksharaAssocs[keyof AksharaAssocs]['Data'];

export type AksharaChainHasBlockData = { chainId: string; number: number };
