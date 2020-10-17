import { ParsedLineType } from "./parser";
import { isNumber, getDeepestBracketsPair } from "./helpers";
import { mathOperators, mathPriorities, mathOperatorsPriorities, ScalarOperationType, SingleOperationType, singleOperations } from "./mathOperators";

export const processCals = (stack: ParsedLineType): number => {
    let deepestPair: number[] = getDeepestBracketsPair(stack);
    while (deepestPair.length) {
        const [startIndex, endIndex] = deepestPair;
        stack[startIndex] = allPrioritiesCalc(stack.slice(startIndex + 1, endIndex));
        stack.splice(startIndex + 1, endIndex - startIndex);
        deepestPair = getDeepestBracketsPair(stack);
    }
    return allPrioritiesCalc(stack);
};

export const allPrioritiesCalc = (stack: ParsedLineType): number => {
    mathPriorities.forEach((priority: number) => {
        stack = prioritiesCalc(priority, stack);
    });
    return Number(stack.join());
};

export const prioritiesCalc = (priority: number, stack: ParsedLineType): ParsedLineType => {
    let index = stack.findIndex((element) => !isNumber(String(element)) && mathOperatorsPriorities[element] === priority);

    while (index !== -1) {
        const operation: ScalarOperationType | SingleOperationType = mathOperators[stack[index]];
        const isSingleOperation: boolean = singleOperations.includes(String(stack[index]));
        if (isSingleOperation) {
            if (!isNumber(String(stack[index + 1]))) {
                throw new TypeError("Unexpected stack!");
            }
            stack[index] = (operation as SingleOperationType)(Number(stack[index + 1]));
            stack.splice(index + 1, 1);
        } else {
            if (!isNumber(String(stack[index + 1])) || !isNumber(String(stack[index - 1]))) {
                throw new TypeError("Unexpected stack!");
            }
            stack[index] = (operation as ScalarOperationType)(Number(stack[index - 1]), Number(stack[index + 1]));
            stack.splice(index + 1, 1);
            stack.splice(index - 1, 1);
        }
        index = stack.findIndex((element) => !isNumber(String(element)) && mathOperatorsPriorities[element] === priority);
    }

    return stack;
};
