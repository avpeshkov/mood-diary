// eslint-disable-next-line @typescript-eslint/no-explicit-any

// по идее нужно вот так,но  так почему-то не работ, не могу понять почему.
// type FIXME = Array<Exclude<OrderState, "buyingSupplies"| "fullfilled">>;
// или вот так
// type FIXME = Array<Extract<OrderState, "initial" | "inWork" | "fullfilled">>;

// вот так работает
type FIXME = Array<Partial<OrderState>>;

const orderStates = ["initial", "inWork", "buyingSupplies", "producing", "fullfilled"] as const;

type OrderState = typeof orderStates[number];

// Hint: type guards
// не очень понял вот эту подсказку, нам же запрещено менять код по заданию, а type guards это всегда про дабавление кода(as, in, typeof, instance)
// то есть мне придеться поменять функциию ниже,я конечно могу просто воткнуть в конце ее "as FIXME" - но это же вообще стыдоба.
export const getUserOrderStates = (orderStates: Array<OrderState>): FIXME => orderStates.filter((state) => state !== "buyingSupplies" && state !== "producing");
