import { createPublicClient, createWalletClient, custom, http } from 'viem';
import { mainnet, sepolia } from 'viem/chains';

const ankrKey = process.env.NEXT_PUBLIC_ANKR_KEY;

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(`https://rpc.ankr.com/eth_sepolia/${ankrKey}`),
});

export const walletClient = createWalletClient({
  chain: sepolia,
  transport: custom(window.ethereum),
});
