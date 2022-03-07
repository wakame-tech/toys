export type Ordering = -1 | 0 | 1;

export interface Compare<T> {
  left: T;
  leftIndex: number;
  right: T;
  rightIndex: number;
}

export type AsyncCompare<T> = (a: T, b: T) => Promise<Ordering>;

export type CompareGenerator<T> = (items: T[]) => Generator<Compare<T>>;

export const prepareCompares = <T>(
  items: T[],
  generator: CompareGenerator<T>
): Array<Compare<T>> => {
  return Array.from(generator(items));
};

export const sortByCache = <T>(
  items: T[],
  orderings: Ordering[],
  generator: CompareGenerator<T>
): T[] => {
  const sorted = items.slice();
  for (let compare of generator(items)) {
    if (orderings.pop()! > 0) {
      [sorted[compare.rightIndex], sorted[compare.leftIndex]] = [
        sorted[compare.leftIndex],
        sorted[compare.rightIndex],
      ];
    }
  }
  return items;
};
