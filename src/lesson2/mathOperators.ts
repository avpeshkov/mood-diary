export type ScalarOperationType = (first: number, second: number) => number;
export type SingleOperationType = (num: number) => number;

export const mul: ScalarOperationType = (first: number, second: number): number => first * second;

export const div: ScalarOperationType = (first: number, second: number): number => first / second;

export const add: ScalarOperationType = (first: number, second: number): number => first + second;

export const minus: ScalarOperationType = (first: number, second: number): number => first - second;

export const exponentiation: ScalarOperationType = (first: number, second: number): number => first ** second;

export const squaring: SingleOperationType = (num: number): number => num ** 2;

export const factorial: SingleOperationType = (num: number): number => {
  let number: number = num;
  let result: number = num;
  if (number === 0 || number === 1) {
    return 1;
  }

  while (number > 1) {
    number--;
    result = result * number;
  }
  return result;
};

export const mathOperators: {
  [key: string]: ScalarOperationType | SingleOperationType;
} = {
  "*": mul,
  "/": div,
  "+": add,
  "-": minus,
  "^": exponentiation,
  "!": factorial,
  "**": squaring,
};

export const mathPriorities: number[] = [0, 1, 2, 3];
export const singleOperations: string[] = ["!", "**"];
export const brackets: string[] = ["(", ")"];
const [ZERO, FIRST, SECOND, THIRD] = mathPriorities;

export const mathOperatorsPriorities: { [key: string]: number } = {
  "!": ZERO,
  "**": ZERO,
  "^": FIRST,
  "*": SECOND,
  "/": SECOND,
  "+": THIRD,
  "-": THIRD,
};
