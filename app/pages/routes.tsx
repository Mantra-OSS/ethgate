import { formatLogId, formatTransactionId } from '@ethgate/lib-node';
import type { AksharaBlockKey, AksharaLogKey, AksharaTransactionKey } from '@ethgate/spec-node';
import { lazy } from 'react';

import type { PunkerRouteObject, RouteMatch } from '../app/routes.js';

const HomePage = lazy(() => import('./HomePage.js'));
const ChainPage = lazy(() => import('./ChainPage.js'));
const ChainBlocksPage = lazy(() => import('./ChainBlocksPage.js'));
const BlockPage = lazy(() => import('./BlockPage.js'));
const TransactionPage = lazy(() => import('./TransactionPage.js'));
const LogPage = lazy(() => import('./LogPage.js'));

// TODO: Add 3091 compat: https://eips.ethereum.org/EIPS/eip-3091
const chainRoutes = [
  {
    index: true,
    element: <ChainPage />,
    loader: ({ params }) => {
      const { chainId = '1' } = params;

      return {
        chainId,
      };
    },
  },
  {
    path: 'blocks',
    handle: { crumb: ({ params }: RouteMatch) => ({ title: `Blocks` }) },
    element: <ChainBlocksPage />,
    loader: ({ params }) => {
      const { chainId = '1' } = params;

      const key = {
        chainId,
      };
      return key;

      // return `Chain:${formatChainId(key)}`;
    },
  },

  {
    path: 'block/:blockNumberOrHash',
    handle: { crumb: ({ params }: RouteMatch) => ({ title: `Block ${params.blockNumberOrHash}` }) },
    children: [
      {
        index: true,
        element: <BlockPage />,
        loader: ({ params, ...rest }) => {
          const { chainId = '1', blockNumberOrHash } = params;

          if (!blockNumberOrHash) {
            throw new Error('Missing block number or hash');
          }

          let key: AksharaBlockKey;
          if (blockNumberOrHash.startsWith('0x')) {
            key = { chainId, hash: blockNumberOrHash };
          } else {
            key = { chainId, number: parseInt(blockNumberOrHash, 10) };
          }

          return key;

          // return `Block:${formatBlockId(key)}`;
        },
      },
      {
        path: 'tx/:transactionIndexOrHash',
        handle: {
          crumb: ({ params }: RouteMatch) => ({
            title: `Transaction ${params.transactionIndexOrHash}`,
          }),
        },
        children: [
          {
            index: true,
            element: <TransactionPage />,
            loader: ({ params }) => {
              const { chainId = '1', blockNumberOrHash, transactionIndexOrHash } = params;

              if (!blockNumberOrHash) {
                throw new Error('Missing block number or hash');
              }

              let blockKey: AksharaBlockKey;
              if (blockNumberOrHash.startsWith('0x')) {
                blockKey = { chainId, hash: blockNumberOrHash };
              } else {
                blockKey = { chainId, number: parseInt(blockNumberOrHash, 10) };
              }

              if (!transactionIndexOrHash) {
                throw new Error('Missing transaction index or hash');
              }

              let key: AksharaTransactionKey;
              if (transactionIndexOrHash.startsWith('0x')) {
                if ('number' in blockKey) {
                  key = {
                    chainId: blockKey.chainId,
                    blockNumber: blockKey.number,
                    hash: transactionIndexOrHash,
                  };
                } else if ('hash' in blockKey) {
                  key = {
                    chainId: blockKey.chainId,
                    blockHash: blockKey.hash,
                    hash: transactionIndexOrHash,
                  };
                } else {
                  throw new Error('Missing block number or hash');
                }
              } else {
                if ('number' in blockKey) {
                  key = {
                    chainId: blockKey.chainId,
                    blockNumber: blockKey.number,
                    transactionIndex: parseInt(transactionIndexOrHash, 10),
                  };
                } else if ('hash' in blockKey) {
                  key = {
                    chainId: blockKey.chainId,
                    blockHash: blockKey.hash,
                    transactionIndex: parseInt(transactionIndexOrHash, 10),
                  };
                } else {
                  throw new Error('Missing block number or hash');
                }
              }

              return `Transaction:${formatTransactionId(key)}`;
            },
          },
          {
            path: 'log/:logIndex',
            element: <LogPage />,
            handle: { crumb: ({ params }: RouteMatch) => ({ title: `Log ${params.logIndex}` }) },
            loader: ({ params }) => {
              const { chainId = '1', blockNumberOrHash, transactionIndexOrHash, logIndex } = params;

              if (!blockNumberOrHash) {
                throw new Error('Missing block number or hash');
              }

              let blockKey: AksharaBlockKey;
              if (blockNumberOrHash.startsWith('0x')) {
                blockKey = { chainId, hash: blockNumberOrHash };
              } else {
                blockKey = { chainId, number: parseInt(blockNumberOrHash, 10) };
              }

              if (!transactionIndexOrHash) {
                throw new Error('Missing transaction index or hash');
              }

              let transactionKey: AksharaTransactionKey;
              if (transactionIndexOrHash.startsWith('0x')) {
                if ('number' in blockKey) {
                  transactionKey = {
                    chainId: blockKey.chainId,
                    blockNumber: blockKey.number,
                    hash: transactionIndexOrHash,
                  };
                } else if ('hash' in blockKey) {
                  transactionKey = {
                    chainId: blockKey.chainId,
                    blockHash: blockKey.hash,
                    hash: transactionIndexOrHash,
                  };
                } else {
                  throw new Error('Missing block number or hash');
                }
              } else {
                if ('number' in blockKey) {
                  transactionKey = {
                    chainId: blockKey.chainId,
                    blockNumber: blockKey.number,
                    transactionIndex: parseInt(transactionIndexOrHash, 10),
                  };
                } else if ('hash' in blockKey) {
                  transactionKey = {
                    chainId: blockKey.chainId,
                    blockHash: blockKey.hash,
                    transactionIndex: parseInt(transactionIndexOrHash, 10),
                  };
                } else {
                  throw new Error('Missing block number or hash');
                }
              }

              if (!logIndex) {
                throw new Error('Missing log index');
              }

              const key: AksharaLogKey = {
                ...(transactionKey as any),
                logIndex: parseInt(logIndex, 10),
              };

              return `Log:${formatLogId(key)}`;
            },
          },
        ],
      },
    ],
  },
] satisfies PunkerRouteObject[];

const explorerRoutes = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: ':chainId',
    loader: ({ params }) => {
      return {
        chainId: params.chainId,
      };
    },
    handle: { crumb: ({ params }: RouteMatch) => ({ title: `Chain ${params.chainId}` }) },
    children: [...chainRoutes],
  },
  ...chainRoutes,
] satisfies PunkerRouteObject[];

export default explorerRoutes;
