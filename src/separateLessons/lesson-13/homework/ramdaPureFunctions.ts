import { compose, head, sort, comparator, prop, keys, map, join, concat, replace, split, mergeAll } from "ramda";

// Задание 1
export type Team = { name: string; score: number };

export const getTopName = (teamList: Team[]): string => {
    // @ts-ignore
    return compose(prop("name"), head, sort(comparator((a: Team, b: Team) => a.score > b.score)))(teamList);
};

// Задание 2
export type QsObj = Record<string, string | number | boolean | object>;

export const createQs = (qsObj: QsObj): string =>
    compose(
        concat("?"),
        join("&"),
        map((key: string) => `${key}=${qsObj[key]}`),
        keys
    )(qsObj);

// Задание 3

const arrToObj = (arr: string[]): object => {
    const [key, value] = arr;
    return { [key]: value };
};
export const parseQs = (qs: string): QsObj => compose(mergeAll, map(arrToObj), map(split("=")), split("&"), replace("?", ""))(qs);
