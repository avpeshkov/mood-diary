import { ParsedLineType } from "./parser";

export const isNumber = (item: string): boolean => !isNaN(Number(item));

export const getDeepestBracketsPair = (stack: ParsedLineType): number[] => {
  let indices: number[] = [];
  let max = 0;
  let count = 0;
  let last: number;

  stack.forEach((c, i) => {
    if (c === "(") {
      last = i;
      count++;
      return;
    }
    if (c === ")") {
      if (count > max) {
        indices = [last, i];
        max = count;
      }
      count--;
    }
  });
  return indices;
};
