import DataLoader from "dataloader";

export type BatchLoaderConfig<K, V, C = K> = {
  batchLoadFn: DataLoader.BatchLoadFn<K, V>;
  cacheKeyFn?: DataLoader.Options<K, V, C>["cacheKeyFn"];
  batchScheduleFn?: DataLoader.Options<K, V, C>["batchScheduleFn"];
  cacheMap: DataLoader.CacheMap<C, Promise<V>>;
  persistCache: boolean;
};
export class BatchLoader<K, V, C = K> {
  loader: DataLoader<K, V, C>;

  constructor(config: BatchLoaderConfig<K, V, C>) {
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
      }
    );
    this.clearAll = this.loader.clearAll.bind(this.loader);
    this.loadMany = this.loader.loadMany.bind(this.loader);
  }

  loadMany: DataLoader<K, V, C>["loadMany"];
  clearAll: DataLoader<K, V, C>["clearAll"];
}
