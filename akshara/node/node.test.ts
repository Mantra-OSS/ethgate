import type { AksharaBlockData, AksharaChainId } from '@ethgate/spec-node';
import { describe, expect, it, jest, beforeAll, beforeEach } from '@jest/globals';
import { IDBFactory, IDBKeyRange } from 'fake-indexeddb';
import { type Mock } from 'jest-mock';

import { AksharaDatabase } from '../database';
import { ETHGATE_NODE_TEST_CHAINS } from '../testing';

import { Akshara } from '.';

describe('Akshara', () => {
  let fetchFn: Mock<typeof fetch>;
  let node: Akshara;
  let chainIds: AksharaChainId[];
  let latestBlocks: Map<AksharaChainId, AksharaBlockData>;
  beforeAll(async () => {
    const database = new AksharaDatabase({
      name: 'setup',
      indexedDB: new IDBFactory(),
      IDBKeyRange,
    });
    const fetchFn = fetch;
    const node = new Akshara({
      chains: ETHGATE_NODE_TEST_CHAINS,
      fetchFn,
      database,
    });
    chainIds = ['1', ...(await node.execute('GetChains', [{ chainId: '1' }]))];
    latestBlocks = new Map(
      await Promise.all(
        chainIds.map(async (chainId) => {
          const client = node.getDaClient(chainId);
          const block = await client.execute('GetLatestBlock', [{ chainId }]);
          return [chainId, block] satisfies [AksharaChainId, AksharaBlockData];
        }),
      ),
    );
  });
  beforeEach(async () => {
    const database = new AksharaDatabase({
      name: 'test',
      indexedDB: new IDBFactory(),
      IDBKeyRange,
    });
    fetchFn = jest.fn(fetch);
    node = new Akshara({ chains: ETHGATE_NODE_TEST_CHAINS, fetchFn, database });
    chainIds.forEach((chainId) => {
      const client = node.getDaClient(chainId);
      client.latestBlocks = latestBlocks;
    });
    await node.database.putBlocks([...latestBlocks.values()]);
  });

  it('can fetch latest 3', async () => {
    const latest = latestBlocks.get('1')!;
    const result = await node.execute('GetBlockRange', [{ chainId: '1' }, 0, 3]);
    expect(result).toMatchObject([
      latest,
      { chainId: '1', number: latest.number - 1 },
      { chainId: '1', number: latest.number - 2 },
    ]);
    // expect(fetchFn).toBeCalledTimes(1);
  });
  it('can fetch latest 3 (multichain)', async () => {
    const blockRange = (
      await Promise.all(
        chainIds.map(async (chainId) => {
          const blocks = await node.execute('GetBlockRange', [{ chainId }, 0, 3]);
          return blocks;
        }),
      )
    ).flat();
    blockRange.sort(
      (a, b) =>
        b.timestamp - a.timestamp ||
        // parseInt(b.chainId, 10) - parseInt(a.chainId, 10) ||
        b.chainId.localeCompare(a.chainId) ||
        b.number - a.number,
    );
    // expect(fetchFn).toBeCalledTimes(chainIds.length);
    fetchFn.mockClear();
    const result = await node.execute('GetBlockRange', [{}, 0, 3]);
    expect(result).toMatchObject(
      blockRange.slice(0, 3).map((block) => ({
        timestamp: block.timestamp,
        chainId: block.chainId,
        number: block.number,
      })),
    );
    // expect(fetchFn).toBeCalledTimes(chainIds.length);
  });
});
