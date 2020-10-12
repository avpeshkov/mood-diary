import { mul, div, add, minus, exponentiation, factorial, squaring } from "./mathOperators";

describe("mathOperators test cases", () => {
  it("mul 1 * 2 to equal 2", () => {
    expect(mul(1, 2)).toBe(2);
  });

  it("mul 2 * 2 to equal 4", () => {
    expect(mul(2, 2)).toBe(4);
  });

  it("div 2 / 2 to equal 1", () => {
    expect(div(2, 2)).toBe(1);
  });

  it("div 4 / 2 to equal 2", () => {
    expect(div(4, 2)).toBe(2);
  });

  it("add 4 + 2 to equal 6", () => {
    expect(add(4, 2)).toBe(6);
  });

  it("minus 4 - 2 to equal 2", () => {
    expect(minus(4, 2)).toBe(2);
  });

  it("exponentiation 2 ^ 2 to equal 4", () => {
    expect(exponentiation(2, 2)).toBe(4);
  });

  it("exponentiation 6 ^ 3 to equal 4", () => {
    expect(exponentiation(6, 3)).toBe(216);
  });
  it("factorial 5 to equal 120", () => {
    expect(factorial(5)).toBe(120);
  });
  it("factorial 8 to equal 40320", () => {
    expect(factorial(8)).toBe(40320);
  });
  it("squaring 2 to equal 4", () => {
    expect(squaring(2)).toBe(4);
  });
  it("squaring 19 to equal 361", () => {
    expect(squaring(19)).toBe(361);
  });
});
