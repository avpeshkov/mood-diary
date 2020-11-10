// Задание 1
export type Team = { name: string; score: number };

export const getTopName = (teams: Team[]): string => {
    return teams.reduce((prev: Team, next: Team) => (prev.score > next.score ? prev : next)).name;
};

// Задание 2
export type QsObj = Record<string, string | number | boolean | object>;

export const createQs = (qsObj: QsObj): string => {
    const objetToString = (objet: QsObj): string[] => {
        const result: string[] = [];
        const objetEntries: Array<[string, string | number | boolean | object]> = Object.entries(objet);
        for (const [index, [key, value]] of objetEntries.entries()) {
            if (typeof value === "object") {
                result.push(objetToString(value as QsObj).join(""));
            } else {
                result.push(`${key}=${String(value)}${index < objetEntries.length - 1 ? "&" : ""}`);
            }
        }
        return result;
    };
    return `?${objetToString(qsObj).join("")}`;
};

// Задание 3

export const parseQs = (qs: string): QsObj => {
    const result: QsObj = {};
    qs.substring(1)
        .split("&")
        .forEach((str: string) => {
            const [key, value] = str.split("=");
            if (key && value) {
                result[key] = value;
            }
        });
    return result;
};
