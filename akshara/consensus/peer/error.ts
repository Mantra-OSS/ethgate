import { EthereumPeerError } from '@/spec-node';

export class EthereumPeerFetchError extends EthereumPeerError {
  readonly name = `EthereumPeerFetchError`;
  constructor(error: unknown, request: unknown, options?: ErrorOptions) {
    super(`${error}\n  ${JSON.stringify(request)}`, options);
  }
}

export class EthereumPeerResponseError extends EthereumPeerError {
  readonly name = `EthereumPeerResponseError`;
  constructor(error: unknown, request: unknown, response: unknown, options?: ErrorOptions) {
    super(`${error}\n  ${JSON.stringify(request)}\n${JSON.stringify(response)}`, options);
  }
}

export class EthereumPeerJsonRpc2Error extends EthereumPeerError {
  readonly name = 'EthereumPeerJsonRpc2Error';
  readonly code: number;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}
