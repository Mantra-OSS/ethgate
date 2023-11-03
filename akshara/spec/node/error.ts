import type { AksharaCall } from "./node.js";

export abstract class AksharaError extends Error {
  abstract readonly name: `Akshara${string}Error`;
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options);
  }
}

export class AksharaPeerError extends AksharaError {
  readonly name = "AksharaPeerError";
  readonly error: unknown;
  constructor(
    request: unknown,
    error: unknown,
    message?: string,
    options?: ErrorOptions
  ) {
    const errorMessage = `${String(error)}\nRequest:\n  ${JSON.stringify(
      request,
      null,
      "  "
    ).replaceAll("\n", "\n  ")}}`.replaceAll("\n", "\n  ");
    let message_;
    if (message !== undefined) {
      // super(`${message}\n  ${errorMessage}`, options);
      message = `${message}\n  ${errorMessage}`;
    } else {
      // super(errorMessage, options);
      message = errorMessage;
    }
    super(message, options);
    this.error = error;
  }
}

export class AksharaCallError extends AksharaError {
  readonly name = "AksharaCallError";
  readonly call: AksharaCall;
  constructor(call: AksharaCall, message: string, options?: ErrorOptions) {
    super(`${message}\n  ${JSON.stringify(call)}`, options);
    this.call = call;
  }
}

export class AksharaExecuteError extends AksharaError {
  readonly name = "AksharaExecuteError";
  readonly calls: AksharaCall[];
  constructor(calls: AksharaCall[], message: string, options?: ErrorOptions) {
    super(
      `${message}\n  ${calls.map((call) => JSON.stringify(call)).join("\n  ")}`,
      options
    );
    this.calls = calls;
  }
}
