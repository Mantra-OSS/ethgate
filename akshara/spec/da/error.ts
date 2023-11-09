import type { AksharaDaCall } from './client';

export abstract class AksharaDaError extends Error {
  abstract readonly name: `AksharaDa${string}Error`;
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options);
  }
}

export class AksharaDaPeerError extends AksharaDaError {
  readonly name = 'AksharaDaPeerError';
  readonly error: unknown;
  constructor(request: unknown, error: unknown, message?: string, options?: ErrorOptions) {
    const errorMessage = `${String(error)}\nRequest:\n  ${JSON.stringify(
      request,
      null,
      '  ',
    ).replaceAll('\n', '\n  ')}}`.replaceAll('\n', '\n  ');
    let message2 = message;
    if (message !== undefined) {
      message2 = `${message}\n  ${errorMessage}`;
      // super(`${message}\n  ${errorMessage}`, options);
    } else {
      message2 = errorMessage;
      // super(errorMessage, options);
    }
    super(message2, options);
    this.error = error;
  }
}

export class AksharaDaCallError extends AksharaDaError {
  readonly name = 'AksharaDaCallError';
  readonly call: AksharaDaCall;
  constructor(call: AksharaDaCall, message: string, options?: ErrorOptions) {
    super(`${message}\n  ${JSON.stringify(call)}`, options);
    this.call = call;
  }
}

export class AksharaDaExecuteError extends AksharaDaError {
  readonly name = 'AksharaDaExecuteError';
  readonly calls: AksharaDaCall[];
  constructor(calls: AksharaDaCall[], message: string, options?: ErrorOptions) {
    super(`${message}\n  ${calls.map((call) => JSON.stringify(call)).join('\n  ')}`, options);
    this.calls = calls;
  }
}
