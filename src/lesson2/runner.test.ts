import { runner } from "./runner";

describe("Runner simple cases", () => {
    it("1 * 32", () => {
        expect(runner("1 * 32")).toEqual(32);
    });

    it("2 * 32", () => {
        expect(runner("2 * 32")).toEqual(64);
    });

    it("2 + 32", () => {
        expect(runner("2 + 32")).toEqual(34);
    });

    it("! 3", () => {
        expect(runner("! 3")).toEqual(6);
    });

    it("** 3", () => {
        expect(runner("** 3")).toEqual(9);
    });

    it("2 ^ 6", () => {
        expect(runner("2 ^ 6")).toEqual(64);
    });
});

describe("Runner tripled/mixed cases", () => {
    it("2 * 2 * 3", () => {
        expect(runner("2 * 2 * 3")).toEqual(12);
    });

    it("2 * 2 + 3", () => {
        expect(runner("2 * 2 + 3")).toEqual(7);
    });

    it("2 + 2 * 3", () => {
        expect(runner("2 + 2 * 3")).toEqual(8);
    });
});

describe("Runner long cases", () => {
    it("20 + 1 * 10 - 5 * 3", () => {
        expect(runner("20 + 1 * 10 - 5 * 3")).toEqual(15);
    });

    it("20 - 10 * 10 / 5 - 3", () => {
        expect(runner("20 - 10 * 10 / 5 - 3")).toEqual(-3);
    });

    it("** 9 - 5 * 3 - ! 2", () => {
        expect(runner("** 9 - 5 * 3 - ! 2")).toEqual(64);
    });
});

describe("Runner long cases with brackets", () => {
    it("( ** 9 ) - ( 5 * 3 ) - ( ! 2 )", () => {
        expect(runner("( ** 9 ) - ( 5 * 3 ) - ( ! 2 )")).toEqual(64);
    });

    it("20 - ( 10 * 10 ) / 5 - ( 3 )", () => {
        expect(runner("20 - ( 10 * 10 ) / 5 - ( 3 )")).toEqual(-3);
    });
    it("( ( 25 - 5 ) / ( 1 * 2 ) ) + 10", () => {
        expect(runner("( ( 25 - 5 ) / ( 1 * 2 ) ) + 10")).toEqual(20);
    });

    it("( ( 25 - 5 ) * 2 ) + 10", () => {
        expect(runner("( ( 25 - 5 ) * 2 ) + 10")).toEqual(50);
    });
});
