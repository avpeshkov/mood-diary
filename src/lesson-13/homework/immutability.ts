// Задание 1
export type OriginalTeam = {
    size: number;
    name: string;
    league: string;
};

export type ExpectedTeam = {
    name: string;
    league: string;
    roster: number;
};

export const originalTeamToExpectedTeam = (originalTeam: OriginalTeam): ExpectedTeam => {
    const result: {
        size?: number;
        roster?: number;
        name: string;
        league: string;
    } = { ...originalTeam };
    delete result["size"];
    result["name"] = "New York Badgers";
    result["roster"] = 25;
    return result as ExpectedTeam;
};

// Задание 2
export type SomeArray = Array<number | string>;

export const originalArrayToExpectedArray = (originalArray: SomeArray): SomeArray => {
    const [first, second, ...restArr] = originalArray;
    return ["two", ...restArr, 5];
};

// Задание 3

export type Team = {
    name: string;
    captain: {
        name: string;
        age: number;
    };
};

export const originalTeamToExpectedTeamDeep = (originalTeam: Team): Team => {
    const result: Team = {
        ...originalTeam,
    };
    result.captain.age = 28;
    return result;
};
