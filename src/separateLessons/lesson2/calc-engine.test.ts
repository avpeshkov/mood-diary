import { prioritiesCalc, processCals } from "./calc-engine";

describe("prioritiesCalc with zero priority", () => {
    it("[**, 6]", () => {
        expect(prioritiesCalc(0, ["**", 6])).toEqual([36]);
    });

    it("[**, 3]", () => {
        expect(prioritiesCalc(0, ["**", 3])).toEqual([9]);
    });

    it("[!, 6]", () => {
        expect(prioritiesCalc(0, ["!", 3])).toEqual([6]);
    });

    it("[!, 14]", () => {
        expect(prioritiesCalc(0, ["!", 14])).toEqual([87178291200]);
    });

    it("[2, +,!, 6]", () => {
        expect(prioritiesCalc(0, [2, "+", "!", 3])).toEqual([2, "+", 6]);
    });
});

describe("prioritiesCalc with 1 priority", () => {
    it("[2, ^, 4]", () => {
        expect(prioritiesCalc(1, [2, "^", 4])).toEqual([16]);
    });

    it("[7, ^, 3]", () => {
        expect(prioritiesCalc(1, [7, "^", 3])).toEqual([343]);
    });

    it("[2, +, 5, ^, 2]", () => {
        expect(prioritiesCalc(1, [2, "+", 5, "^", 2])).toEqual([2, "+", 25]);
    });
});

describe("prioritiesCalc with 2 priority", () => {
    it("[1, * ,32]", () => {
        expect(prioritiesCalc(2, [1, "*", 32])).toEqual([32]);
    });

    it("[32, /, 32]", () => {
        expect(prioritiesCalc(2, [32, "/", 32])).toEqual([1]);
    });

    it("[32, + 32]", () => {
        expect(prioritiesCalc(2, [32, "+", 32])).toEqual([32, "+", 32]);
    });
});

describe("prioritiesCalc with 3 priority", () => {
    it("[32, + 32]", () => {
        expect(prioritiesCalc(3, [32, "+", 32])).toEqual([64]);
    });

    it("[32, - 32]", () => {
        expect(prioritiesCalc(3, [32, "-", 32])).toEqual([0]);
    });

    it("[32, - 32, +, 10]", () => {
        expect(prioritiesCalc(3, [32, "-", 32, "+", 10])).toEqual([10]);
    });
});

describe("processCals test", () => {
    it("[32, /, 32, +, 10, *, 10]", () => {
        expect(processCals([32, "/", 32, "+", 10, "*", 10])).toEqual(101);
    });
    it("[!7, /, 3, -, **, 8 ]", () => {
        expect(processCals(["!", 7, "/", 3, "-", "**", 8])).toEqual(1616);
    });
    it("[7,^,4 , + , 21,-, 3, *, 3, -, **, 8 , +, 6 ]", () => {
        expect(processCals([7, "^", 4, "+", 21, "-", 3, "*", 3, "-", "**", 8, "+", 6])).toEqual(2355);
    });
});

describe("processCals test with brackets", () => {
    it("[(, 10, * , 10, )]", () => {
        expect(processCals(["(", 10, "*", 10, ")"])).toEqual(100);
    });

    it("[(, 10, + , 10, ), *, 2]", () => {
        expect(processCals(["(", 10, "+", 10, ")", "*", 2])).toEqual(40);
    });

    it("[ 2, *, (, 10, + , 10, ) ]", () => {
        expect(processCals([2, "*", "(", 10, "+", 10, ")"])).toEqual(40);
    });

    it("[ 2, *, (, (, 10, -, 5, ), * , 10, ) ]", () => {
        expect(processCals([2, "*", "(", "(", 10, "-", 5, ")", "*", 10, ")"])).toEqual(100);
    });

    it("[ 2, *, (, 10, -, 5, ), ^, 2,  ]", () => {
        expect(processCals([2, "*", "(", 10, "-", 5, ")", "^", 2])).toEqual(50);
    });

    it("[(, 10, * , (, 10,), )]", () => {
        expect(processCals(["(", 10, "*", "(", 10, ")", ")"])).toEqual(100);
    });
    it("[(, 10, * , (, 10,), ), ^, 2]", () => {
        expect(processCals(["(", 10, "*", "(", 10, ")", ")", "^", 2])).toEqual(10000);
    });
    it("[(, 10, * , (, 10,), ), ^, 2 , +, (, 16, -, 8, ),]", () => {
        expect(processCals(["(", 10, "*", "(", 10, ")", ")", "^", 2, "+", "(", 16, "-", 8, ")"])).toEqual(10008);
    });
    it("[ **, (, 2, *, 3, )]", () => {
        expect(processCals(["**", "(", 2, "*", 3, ")"])).toEqual(36);
    });
});
