import { parser } from "./parser";

import { processCals } from "./calc-engine";

export const runner = (line: string): number => {
    const stack = parser(line);

    if (stack === null) {
        throw new TypeError("Unexpected string");
    }

    return processCals(stack);
};
