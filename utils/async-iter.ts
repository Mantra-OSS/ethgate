/* eslint-disable @typescript-eslint/naming-convention */
export { flow, pipe } from 'fp-ts/lib/function';

export async function* fromRange(start: number, end: number) {
  if (start === end) {
    yield start;
  } else if (start < end) {
    for (let i = start; i <= end; i++) {
      yield i;
    }
  } else {
    for (let i = start; i >= end; i--) {
      yield i;
    }
  }
}

export async function collect<T>(iter: AsyncGenerator<T>) {
  const result: T[] = [];
  for await (const item of iter) {
    result.push(item);
  }
  return result;
}

export type Operator<T, U> = (iter: AsyncGenerator<T>) => AsyncGenerator<U>;

export function buffer<C>(size: number) {
  return async function* buffer<T extends C>(iter: AsyncGenerator<T>) {
    let items: T[] = [];
    for await (const item of iter) {
      items.push(item);
      if (items.length >= size) {
        yield items;
        items = [];
      }
    }
    if (items.length) {
      yield items;
    }
  };
}

type SyncPredicate<T> = (item: T) => boolean;
// type AsyncPredicate<T> = (item: T) => Promise<boolean>;
type Predicate<T> = SyncPredicate<T>; // | AsyncPredicate<T>;

type SyncMap<T, U> = (item: T) => U;
type AsyncMap<T, U> = (item: T) => Promise<U>;
type Map<T, U> = SyncMap<T, U> | AsyncMap<T, U>;

export function filter<T, S extends T>(filterFn: (item: T) => item is S): Operator<T, S>;
export function filter<T>(filterFn: Predicate<T>): Operator<T, T>;
export function filter<T>(filterFn: Predicate<T>) {
  return async function* filter(iter: AsyncGenerator<T>) {
    for await (const item of iter) {
      if (!filterFn(item)) {
        continue;
      }
      yield item;
    }
  };
}

export function map<T, U>(mapFn: Map<T, U>) {
  return async function* map(iter: AsyncGenerator<T>) {
    for await (const item of iter) {
      const mappedItem = await mapFn(item);
      yield mappedItem;
    }
  };
}

export function flatMap<T, U>(mapFn: Map<T, U[]>) {
  const mapToArray = map(mapFn);
  return async function* flatMap(iter: AsyncGenerator<T>) {
    const mappedIter = mapToArray(iter);
    for await (const items of mappedIter) {
      for (const item of items) {
        yield item;
      }
    }
  };
}

export function skipUntil<T>(fn: Predicate<T>) {
  return async function* skipUntil(iter: AsyncGenerator<T>) {
    let found = false;
    for await (const item of iter) {
      if (found) {
        yield item;
      } else if (fn(item)) {
        found = true;
        yield item;
      }
    }
  };
}

export function takeUntil<T>(fn: Predicate<T>) {
  return async function* takeUntil(iter: AsyncGenerator<T>) {
    for await (const item of iter) {
      if (fn(item)) {
        break;
      }
      yield item;
    }
  };
}

export function take<C>(count: number) {
  return async function* take<T extends C>(iter: AsyncGenerator<T>) {
    for await (const item of iter) {
      if (count <= 0) {
        break;
      }
      yield item;
      count--;
    }
  };
}

export function tap<T>(nextFn: (value: T) => void) {
  return async function* tap(iter: AsyncGenerator<T>) {
    for await (const item of iter) {
      nextFn(item);
      yield item;
    }
  };
}

type WithItem<T> = <R>(fn: Map<T, R>) => Promise<R>;

export function pool<C>() {
  return async function* pool<T extends C>(iter: AsyncGenerator<T>): AsyncGenerator<WithItem<T>> {
    const items: T[] = [];
    const waiting: ((item: T) => void)[] = [];

    async function acquire() {
      if (items.length > 0) {
        return items.pop()!;
      }
      const { done, value } = await iter.next();
      if (!done) {
        return value;
      }
      return new Promise<T>((resolve) => {
        waiting.push(resolve);
      });
    }

    function release(item: T) {
      if (waiting.length > 0) {
        const resolve = waiting.shift()!;
        resolve(item);
      } else {
        items.push(item);
      }
    }

    while (true) {
      const item = await acquire();
      yield async function withItem<R>(fn: Map<T, R>) {
        try {
          return await fn(item);
        } finally {
          release(item);
        }
      };
    }
  };
}
