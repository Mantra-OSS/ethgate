import DataLoader from 'dataloader';

export type BatchLoaderConfig<TKey, TValue, TCacheKey = TKey> = {
  batchLoadFn: DataLoader.BatchLoadFn<TKey, TValue>;
  cacheKeyFn?: DataLoader.Options<TKey, TValue, TCacheKey>['cacheKeyFn'];
  batchScheduleFn?: DataLoader.Options<TKey, TValue, TCacheKey>['batchScheduleFn'];
  cacheMap: DataLoader.CacheMap<TCacheKey, Promise<TValue>>;
  persistCache: boolean;
};
export class BatchLoader<TKey, TValue, TCacheKey = TKey> {
  loader: DataLoader<TKey, TValue, TCacheKey>;

  constructor(config: BatchLoaderConfig<TKey, TValue, TCacheKey>) {
    this.loader = new DataLoader(
      (keys) => {
        if (!config.persistCache) {
          this.loader.clearAll();
        }
        return config.batchLoadFn(keys);
      },
      {
        cacheKeyFn: config.cacheKeyFn,
        batchScheduleFn: config.batchScheduleFn,
        cacheMap: config.cacheMap,
      },
    );
    this.clearAll = this.loader.clearAll.bind(this.loader);
    this.loadMany = this.loader.loadMany.bind(this.loader);
  }

  loadMany: DataLoader<TKey, TValue, TCacheKey>['loadMany'];
  clearAll: DataLoader<TKey, TValue, TCacheKey>['clearAll'];
}
