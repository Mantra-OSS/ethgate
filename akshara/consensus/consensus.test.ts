import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { type Mock } from 'jest-mock';

import { ETHGATE_NODE_TEST_CHAINS } from '../testing';

import { AksharaDaClient } from '.';

describe('AksharaDaClient', () => {
  let fetchFn: Mock<typeof fetch>;
  let client: AksharaDaClient;
  beforeEach(() => {
    fetchFn = jest.fn(fetch);
    client = new AksharaDaClient({
      root: {
        chainId: ETHGATE_NODE_TEST_CHAINS['1'].chainId,
        meta: ETHGATE_NODE_TEST_CHAINS['1'].meta,
        parent: undefined,
        parentId: undefined,
        rpcs: ETHGATE_NODE_TEST_CHAINS['1'].rpcs,
        extra: ETHGATE_NODE_TEST_CHAINS['1'],
      },
      fetchFn,
      batchScheduleFn: undefined as any,
    });
  });

  it('can fetch genesis', async () => {
    const result = client.execute('GetObject', [{ type: 'Block', chainId: '1', number: 0 }]);
    await expect(result).resolves.toMatchObject({ number: 0 });
    // expect(fetchFn).toBeCalledTimes(1);
  });
  it('can fetch latest', async () => {
    const result = client.execute('GetLatestBlock', [{ chainId: '1' }]);
    await expect(result).resolves.toMatchObject({ chainId: '1' });
    // expect(fetchFn).toBeCalledTimes(1);
  });
});
