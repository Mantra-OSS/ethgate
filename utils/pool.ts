export class Pool<T> {
  items: T[];
  acquireResolveFns: ((item: T) => void)[] = [];

  constructor(items: T[]) {
    this.items = [...items];
  }

  acquire(): T | Promise<T> {
    const item = this.items.pop();
    if (item) {
      return item;
    }

    return new Promise((resolve) => {
      this.acquireResolveFns.push(resolve);
    });
  }

  release(item: T): void {
    const resolveFn = this.acquireResolveFns.pop();
    if (resolveFn) {
      resolveFn(item);
      return;
    }

    this.items.push(item);
  }
}
