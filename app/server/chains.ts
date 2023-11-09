import 'server-only';

import { chains } from '@mantra-oss/chains';

const { ANKR_KEY } = process.env;

export const serverChains = {
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
  '324': {
    ...chains['324'],
    rpcs: [
      {
        url: `https://rpc.ankr.com/zksync_era/${ANKR_KEY}`,
        source: 'test',
      },
    ],
  },
  '8453': {
    ...chains['8453'],
    rpcs: [
      {
        url: `https://rpc.ankr.com/base/${ANKR_KEY}`,
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
  '42170': {
    ...chains['42170'],
    rpcs: [
      {
        url: `https://rpc.ankr.com/arbitrumnova/${ANKR_KEY}`,
        source: 'test',
      },
    ],
  },
  '534352': {
    ...chains['534352'],
    rpcs: [
      {
        url: `https://rpc.ankr.com/scroll/${ANKR_KEY}`,
        source: 'test',
      },
    ],
  },
};
