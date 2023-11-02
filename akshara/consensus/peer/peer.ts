import { Result } from '@ethgate/lib-utils';
import type { EthereumCall, EthereumResult } from '@ethgate/spec-node';
import { EthereumPeerAbstract, EthereumPeerExecuteError } from '@ethgate/spec-node';

import {
  EthereumPeerFetchError,
  EthereumPeerJsonRpc2Error,
  EthereumPeerResponseError,
} from './error.js';

export type Fetch = any;

export type EthereumPeerConfig = {
  url: string;
  fetch: Fetch;
};

export class EthereumPeer extends EthereumPeerAbstract {
  readonly url: string;
  readonly #fetch: Fetch;

  constructor(config: EthereumPeerConfig) {
    super();
    this.url = config.url;
    this.#fetch = config.fetch;
  }

  async post(message: unknown): Promise<unknown> {
    const request = {
      url: this.url,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
      // mode: 'no-cors',
    };

    const response = await this.#fetch(request.url, request).catch((error: unknown) => {
      throw new EthereumPeerFetchError(error, request);
    });

    const received = await response.json().catch((error: unknown) => {
      throw new EthereumPeerResponseError(error, request, response);
    });

    return received;
  }

  async executeBatch(calls: EthereumCall[]): Promise<EthereumResult[]> {
    const rpcRequests = calls.map((call, i) => ({
      jsonrpc: '2.0' as const,
      id: i,
      method: call[0],
      params: call[1],
    })) satisfies ReadonlyArray<any>;

    const rpcResponses = (await this.post(rpcRequests)) as Array<{
      jsonrpc: '2.0';
      id: number;
      result: any;
      error: any;
    }>;

    if (!Array.isArray(rpcResponses)) {
      const response = rpcResponses as unknown;
      const error = new EthereumPeerExecuteError(
        calls,
        `Expected array, got ${typeof response} from ${this.url}: ${JSON.stringify(response)}`,
      );

      throw error;
    }

    rpcResponses.sort((a, b) => {
      return a.id - b.id;
    });

    const responses = rpcResponses.map((rpcResponse) => {
      if (rpcResponse.error) {
        return Result.err(
          new EthereumPeerJsonRpc2Error(rpcResponse.error.code, rpcResponse.error.message),
        );
      }
      return Result.ok(rpcResponse.result);
    });

    return responses;
  }
}
