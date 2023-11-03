import {
  buffer,
  collect,
  filter,
  flatMap,
  flow,
  fromRange,
  map,
  pipe,
  pool,
  skipUntil,
  take,
  takeUntil,
  tap,
} from './async-iter.js';

describe('async-iter', () => {
  describe('range', () => {
    it('should work forward', async () => {
      const iter = fromRange(0, 5);
      const result = await collect(iter);
      expect(result).toEqual([0, 1, 2, 3, 4, 5]);
    });
    it('should work backward', async () => {
      const iter = fromRange(5, 0);
      const result = await collect(iter);
      expect(result).toEqual([5, 4, 3, 2, 1, 0]);
    });
    it('should work with zeroes', async () => {
      const iter = fromRange(0, 0);
      const result = await collect(iter);
      expect(result).toEqual([0]);
    });
  });
  describe('buffer', () => {
    it('should buffer 3', async () => {
      const operator = buffer(3);
      const iter = operator(fromRange(0, 6));
      const result = await collect(iter);
      expect(result).toEqual([[0, 1, 2], [3, 4, 5], [6]]);
    });
    it('should buffer 1', async () => {
      const operator = buffer(1);
      const iter = operator(fromRange(0, 3));
      const result = await collect(iter);
      expect(result).toEqual([[0], [1], [2], [3]]);
    });
    it('should buffer 0', async () => {
      const operator = buffer(0);
      const iter = operator(fromRange(0, 3));
      const result = await collect(iter);
      expect(result).toEqual([[0], [1], [2], [3]]);
    });
  });
  describe('filter', () => {
    it('should filter out odds', async () => {
      const operator = filter<number>((i) => i % 2 === 0);
      const iter = operator(fromRange(0, 6));
      const result = await collect(iter);
      expect(result).toEqual([0, 2, 4, 6]);
    });
  });
  describe('map', () => {
    it('should multiply values by 2', async () => {
      const operator = map<number, number>((i) => i * 2);
      const iter = operator(fromRange(0, 2));
      const result = await collect(iter);
      expect(result).toEqual([0, 2, 4]);
    });
  });
  describe('flatMap', () => {
    it('should work', async () => {
      const operator = flatMap<number, number>((i) => [i * 2, i ** 2]);
      const iter = operator(fromRange(0, 2));
      const result = await collect(iter);
      expect(result).toEqual([0, 0, 2, 1, 4, 4]);
    });
  });
  describe('skipUntil', () => {
    it('should work', async () => {
      const operator = skipUntil<number>((i): i is number => i > 2);
      const iter = operator(fromRange(0, 5));
      const result = await collect(iter);
      expect(result).toEqual([3, 4, 5]);
    });
  });
  describe('takeUntil', () => {
    it('should work', async () => {
      const operator = takeUntil<number>((i) => i > 2);
      const iter = operator(fromRange(0, 5));
      const result = await collect(iter);
      expect(result).toEqual([0, 1, 2]);
    });
    it('should work with skipUntil', async () => {
      const operators = [skipUntil<number>((i) => i > 1), takeUntil<number>((i) => i > 4)] as const;
      const iter = flow(...operators)(fromRange(0, 5));
      const result = await collect(iter);
      expect(result).toEqual([2, 3, 4]);
    });
  });
  describe('take', () => {
    it('should take 2', async () => {
      const operator = take(2);
      const iter = operator(fromRange(0, 5));
      const result = await collect(iter);
      expect(result).toEqual([0, 1]);
    });
    it('should take 1', async () => {
      const operator = take(1);
      const iter = operator(fromRange(0, 5));
      const result = await collect(iter);
      expect(result).toEqual([0]);
    });
    it('should take 0', async () => {
      const operator = take(0);
      const iter = operator(fromRange(0, 5));
      const result = await collect(iter);
      expect(result).toEqual([]);
    });
  });
  describe('tap', () => {
    it('should work', async () => {
      const items: number[] = [];
      const operator = tap<number>((item) => items.push(item));
      const iter = operator(fromRange(0, 2));
      const result = await collect(iter);
      expect(result).toEqual([0, 1, 2]);
      expect(items).toEqual([0, 1, 2]);
    });
  });
  describe('flow', () => {
    it('should work', async () => {
      const operator = flow(
        filter<number>((i) => i % 2 === 0),
        map((i) => i * 2),
      );
      const iter = operator(fromRange(0, 5));
      const result = await collect(iter);
      expect(result).toEqual([0, 4, 8]);
    });
  });
  describe('pipe', () => {
    it('should work', async () => {
      const iter = pipe(
        fromRange(0, 5),
        filter((i) => i % 2 === 0),
        map((i) => i * 2),
      );
      const result = await collect(iter);
      expect(result).toEqual([0, 4, 8]);
    });
  });
  describe('pool', () => {
    it('should work', async () => {
      const operator = flow(
        pool(),
        take(6),
        buffer(3),
        flatMap((withItems) => withItems.map((withItem) => withItem((item) => item))),
      );
      const iter = operator(fromRange(0, 2));
      const result = await collect(iter);
      expect(result).toEqual([0, 1, 2, 2, 1, 0]);
    });
  });
});
