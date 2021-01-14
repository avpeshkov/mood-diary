import { getRandomIndex } from "./utils";

describe("Test components utils", () => {
    describe("Get getRandomIndex for work with array", () => {
        it("test for correct id range 1-1000", () => {
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
    });
});
