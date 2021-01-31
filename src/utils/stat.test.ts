import { findLineByLeastSquares } from "utils/stat";

describe("stat utils", () => {
    it("findLineByLeastSquares test", () => {
        expect(findLineByLeastSquares([0, 1])).toEqual([0, 1]);
        expect(findLineByLeastSquares([0, 1, 3, 4, 5])).toEqual([0, 1.3, 2.6, 3.9, 5.2]);
        expect(findLineByLeastSquares([0, 10, 0, 10, 0])).toEqual([4, 4, 4, 4, 4]);
        expect(findLineByLeastSquares([1, 6, 7, 9, 6, 5, 8])).toEqual([4.07, 4.71, 5.36, 6, 6.64, 7.29, 7.93]);
    });
});
