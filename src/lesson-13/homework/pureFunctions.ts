// Задание 1
export type Team = { name: string; score: number };

export const getTopName = (teams: Team[]): string => {
    return teams.reduce((prev: Team, next: Team) => {
        if (prev.score > next.score) {
            return prev;
        } else {
            return next;
        }
    }).name;
};

// Задание 2
export type QsObj = Record<string, string | number | boolean | object>;

export const createQs = (qsObj: QsObj): string => {
    const objetToString = (objet: QsObj): string[] => {
        const keysArr: string[] = Object.keys(objet);
        return keysArr.map((key: string, index): string => {
            if (typeof objet[key] === "object") {
                return objetToString(objet[key] as QsObj).join("");
            } else {
                return `${key}=${String(qsObj[key])}${index < keysArr.length - 1 ? "&" : ""}`;
            }
        });
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
