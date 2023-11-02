import type { EthereumCall } from './peer.js';

export abstract class EthereumPeerError extends Error {
  abstract readonly name: `EthereumPeer${string}Error`;
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options);
  }
}

export class EthereumPeerCallError extends EthereumPeerError {
  readonly name = 'EthereumPeerCallError';
  readonly call: EthereumCall;
  constructor(call: EthereumCall, message: string, options?: ErrorOptions) {
    super(`${message}\n  ${JSON.stringify(call)}`, options);
    this.call = call;
  }
}

export class EthereumPeerExecuteError extends EthereumPeerError {
  readonly name = 'EthereumPeerExecuteError';
  readonly calls: EthereumCall[];
  constructor(calls: EthereumCall[], message: string, options?: ErrorOptions) {
    super(`${message}\n  ${calls.map((call) => JSON.stringify(call)).join('\n  ')}`, options);
    this.calls = calls;
  }
}
