import { isNumber } from "./helpers";
import { brackets, mathOperators, mathOperatorsPriorities, mathPriorities } from "./mathOperators";

export type ParsedLineType = (number | string)[];

const [ZERO] = mathPriorities;
export const parser = (line: string): ParsedLineType | null => {
  const stack = line.split(" ");
  if (stack.filter((x) => x === "(").length !== stack.filter((x) => x === ")").length) {
    throw new TypeError("Unexpected string");
  }
  return stack.reduce<ParsedLineType>((result, item, key) => {
    const nextItem = stack[key + 1];

    const isValidNumberPush = !isNumber(nextItem) && isNumber(item);
    const isValidOperatorPush =
      !isNumber(item) &&
      mathOperators.hasOwnProperty(item) &&
      (isNumber(nextItem) || brackets.includes(nextItem) || (mathOperators.hasOwnProperty(nextItem) && mathOperatorsPriorities[nextItem] == ZERO));

    if (isValidNumberPush) {
      result.push(Number(item));
    } else if (isValidOperatorPush) {
      result.push(item);
    } else if (brackets.includes(item)) {
      result.push(item);
    } else {
      throw new TypeError("Unexpected string");
    }
    return result;
  }, []);
};
