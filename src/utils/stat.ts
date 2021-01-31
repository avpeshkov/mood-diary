/**
 * calc LeastSquares
 */
import { range } from "ramda";

export function findLineByLeastSquares(yValues: number[]): number[] {
    let xSum = 0;
    let ySum = 0;
    let xySum = 0;
    let xxSum = 0;
    let count = 0;

    /*
     * The above is just for quick access, makes the program faster
     */
    let x = 0;
    let y = 0;

    const valuesLength = yValues.length;
    const xValues: number[] = range(0, yValues.length);

    /*
     * Above and below cover edge cases
     */
    if (valuesLength === 0) {
        return [];
    }

    /*
     * Calculate the sum for each of the parts necessary.
     */
    for (let i = 0; i < valuesLength; i++) {
        x = xValues[i];
        y = yValues[i];
        xSum += x;
        ySum += y;
        xxSum += x * x;
        xySum += x * y;
        count++;
    }

    /*
     * Calculate m and b for the line equation:
     * y = x * m + b
     */
    const m = (count * xySum - xSum * ySum) / (count * xxSum - xSum * xSum);
    const b = ySum / count - (m * xSum) / count;

    /*
     * We then return the x and y data points according to our fit
     */
    const yResultValues = [];

    for (let i = 0; i < valuesLength; i++) {
        x = xValues[i];
        y = x * m + b;
        yResultValues.push(Math.round((y + Number.EPSILON) * 100) / 100);
    }

    return yResultValues;
}
