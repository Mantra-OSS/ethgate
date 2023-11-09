export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function identity<T>(value: T): T {
  return value;
}

export function noop(): void {
  // noop
}
