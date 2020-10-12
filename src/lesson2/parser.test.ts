import { parser } from "./parser";

describe("Parser correct cases", () => {
  it("1 + 32", () => {
    expect(parser("1 + 32")).toEqual([1, "+", 32]);
  });

  it("11 + 3 * 22", () => {
    expect(parser("11 + 3 * 22")).toEqual([11, "+", 3, "*", 22]);
  });

  it("1 + 32 - 2 + 2", () => {
    expect(parser("1 + 32 - 2 + 2")).toEqual([1, "+", 32, "-", 2, "+", 2]);
  });

  it("** 3", () => {
    expect(parser("** 3")).toEqual(["**", 3]);
  });

  it("1 + ** 3", () => {
    expect(parser("1 + ** 3")).toEqual([1, "+", "**", 3]);
  });

  it("** 3 + 1", () => {
    expect(parser("** 3 + 1")).toEqual(["**", 3, "+", 1]);
  });

  it("** ( 3 + 1 )", () => {
    expect(parser("** ( 3 + 1 )")).toEqual(["**", "(", 3, "+", 1, ")"]);
  });

  it("( ** ( 3 + 1 ) * ( 6 ^ 8 ) )", () => {
    expect(parser("( ** ( 3 + 1 ) * ( 6 ^ 8 ) )")).toEqual(["(", "**", "(", 3, "+", 1, ")", "*", "(", 6, "^", 8, ")", ")"]);
  });
});

describe("Parser invalid cases", () => {
  it("1 + + 33 - 2", () => {
    expect(() => parser("1 + + 33 - 2")).toThrow(TypeError("Unexpected string"));
  });

  it("1 F 33 - 2", () => {
    expect(() => parser("1 F 33 - 2")).toThrow(TypeError("Unexpected string"));
  });
  it("( 33 - 2", () => {
    expect(() => parser("( 33 - 2")).toThrow(TypeError("Unexpected string"));
  });
});
