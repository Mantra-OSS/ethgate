import { chains } from '@mantra-oss/chains';

export const ETHGATE_NODE_TEST_CHAINS = {
  '1': {
    ...chains['1'],
    rpcs: [{ url: 'https://ethereum.blockpi.network/v1/rpc/public', source: 'test' }],
  },
  '10': {
    ...chains['10'],
    rpcs: [{ url: 'https://optimism.blockpi.network/v1/rpc/public', source: 'test' }],
  },
  '42161': {
    ...chains['42161'],
    rpcs: [{ url: 'https://arbitrum.blockpi.network/v1/rpc/public', source: 'test' }],
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
