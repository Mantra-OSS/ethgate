import { chains } from '@mantra-oss/chains';

const { ANKR_KEY } = process.env;

export const ETHGATE_NODE_TEST_CHAINS = {
  '1': {
    ...chains['1'],
    rpcs: [
      {
        url: `https://rpc.ankr.com/eth/${ANKR_KEY}`,
        source: 'test',
      },
    ],
  },
  '10': {
    ...chains['10'],
    rpcs: [
      {
        url: `https://rpc.ankr.com/optimism/${ANKR_KEY}`,
        source: 'test',
      },
    ],
  },
  '42161': {
    ...chains['42161'],
    rpcs: [
      {
        url: `https://rpc.ankr.com/arbitrum/${ANKR_KEY}`,
        source: 'test',
      },
    ],
  },
};
// ['network.blockpi', '1', 'https://ethereum.blockpi.network/v1/rpc/public'],
// ['network.blockpi', '10', 'https://optimism.blockpi.network/v1/rpc/public'],
// ['network.blockpi', '324', 'https://zksync-era.blockpi.network/v1/rpc/public'],
// ['network.blockpi', '8453', 'https://base.blockpi.network/v1/rpc/public'],
// ['network.blockpi', '42161', 'https://arbitrum.blockpi.network/v1/rpc/public'],
// ['network.blockpi', '42170', 'https://arbitrum-nova.blockpi.network/v1/rpc/public'],
// ['network.blockpi', '534352', 'https://scroll.blockpi.network/v1/rpc/public'],
// ['network.blockpi', '56', 'https://bsc.blockpi.network/v1/rpc/public'],
// ['network.blockpi', '100', 'https://gnosis.blockpi.network/v1/rpc/public'],
// ['network.blockpi', '137', 'https://polygon.blockpi.network/v1/rpc/public'],
