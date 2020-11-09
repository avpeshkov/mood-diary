import {
    OriginalTeam,
    ExpectedTeam,
    originalTeamToExpectedTeam,
    originalArrayToExpectedArray,
    originalTeamToExpectedTeamDeep,
    SomeArray,
} from "./immutability";

// Задание 1
test("team to team", () => {
    const originalTeam: OriginalTeam = Object.freeze({
        size: 15,
        name: "Tampa Bay Roosters",
        league: "Minor",
    });

    const expectedTeam: ExpectedTeam = {
        name: "New York Badgers",
        league: "Minor",
        roster: 25,
    };

    expect(originalTeamToExpectedTeam(originalTeam)).toStrictEqual(expectedTeam);
});

// Задание 2
test("array to array", () => {
    const originalArray = Object.freeze([1, 2, 3, 4]);

    const expectedArray = ["two", 3, 4, 5];

    expect(originalArrayToExpectedArray(originalArray as SomeArray)).toStrictEqual(expectedArray);
});

// Задание 3
test("team to team deep", () => {
    const originalTeam = Object.freeze({
        name: "Tampa Bay Roosters",
        captain: {
            name: "Bryan Downey",
            age: 27,
        },
    });

    const expectedTeam = {
        name: "Tampa Bay Roosters",
        captain: {
            name: "Bryan Downey",
            age: 28,
        },
    };

    expect(originalTeamToExpectedTeamDeep(originalTeam)).toStrictEqual(expectedTeam);
});
