import { useState } from "react";
import { bubbleSortGenerator } from "./asyncSort/bubbleSort";
import {
  Compare,
  Ordering,
  prepareCompares,
  sortByCache,
} from "./asyncSort/model";

const copyToClipboard = async (text: string): Promise<boolean> => {
  if (!navigator.clipboard) {
    alert("Clip Board API not supported");
    return false;
  }
  await navigator.clipboard.writeText(text);
  return true;
};

export const useAsyncSorter = () => {
  const [input, setInput] = useState("");
  const [items, setItems] = useState<string[]>([]);
  const [result, setResult] = useState<string[]>([]);
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");

  const [index, setIndex] = useState(0);
  const [compares, setCompares] = useState<Compare<string>[]>([]);
  const [orderings, setOrderings] = useState<Ordering[]>([]);
  const total = compares.length;

  const select = (ordering: Ordering) => {
    if (index >= compares.length) {
      return;
    }

    const newOrderings = [...orderings, ordering];
    setOrderings(newOrderings);
    setIndex(index + 1);
    const c = compares[index];
    console.log(`${index + 1} / ${compares.length}`);
    console.log(`${c.left} <> ${c.right} => ${ordering}`);

    if (index === compares.length - 1) {
      const sorted = sortByCache(items, newOrderings, bubbleSortGenerator);
      console.log(sorted);
      setResult(sorted);
      setLeft("");
      setRight("");
    } else {
      setLeft(compares[index].left);
      setRight(compares[index].right);
    }
  };

  const start = async () => {
    const items = input.split("\n");
    console.log(items);
    const compares = prepareCompares(items, bubbleSortGenerator);

    console.log(compares);

    setCompares(compares);
    setItems(items);
    setResult([]);
    setIndex(0);
    setOrderings([]);
    setLeft(compares[orderings.length].left);
    setRight(compares[orderings.length].right);
  };

  const onClickCopy = () => {
    copyToClipboard(result.join("\n"));
    alert("Copied to clipboard");
  };

  return {
    index,
    total,
    setInput,
    select,
    start,
    left,
    right,
    onClickCopy,
    result,
  };
};
