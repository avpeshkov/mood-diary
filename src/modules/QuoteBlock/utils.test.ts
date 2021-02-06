import { getNewQuoteId, getRandomIndex } from "./utils";
import { Steps } from "modules/QuoteBlock/types";

describe("Test components utils", () => {
    test("getRandomIndex test", () => {
        let value: number = getRandomIndex(1);
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(1);
        expect(Number.isInteger(value)).toBeTruthy();

        value = getRandomIndex(10);
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(10);
        expect(Number.isInteger(value)).toBeTruthy();

        value = getRandomIndex(100);
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(100);
        expect(Number.isInteger(value)).toBeTruthy();

        value = getRandomIndex(1000);
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(1000);
        expect(Number.isInteger(value)).toBeTruthy();
    });

    test("getNewQuoteId test", () => {
        expect(getNewQuoteId(0, 10, Steps.NEXT)).toBe(1);
        expect(getNewQuoteId(1, 10, Steps.NEXT)).toBe(2);
        expect(getNewQuoteId(9, 10, Steps.NEXT)).toBe(0);
        expect(getNewQuoteId(1, 10, Steps.PREVIOUS)).toBe(0);
        expect(getNewQuoteId(0, 10, Steps.PREVIOUS)).toBe(9);
    });
});
