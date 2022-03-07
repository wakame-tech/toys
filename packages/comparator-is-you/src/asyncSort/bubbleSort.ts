import { Compare } from "./model";

export function* bubbleSortGenerator<T>(items: T[]): Generator<Compare<T>> {
  for (let i = 0; i < items.length; i++) {
    for (let j = items.length - 1; j > i; j--) {
      yield {
        left: items[j - 1],
        leftIndex: j - 1,
        right: items[j],
        rightIndex: j,
      };
    }
  }
}
