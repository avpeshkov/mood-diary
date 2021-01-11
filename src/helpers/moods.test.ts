import { sortMoodsByDate } from "helpers/moods";
import { MoodObject } from "types/mood";

describe("mood utils test", () => {
    it("test sortMoodsByDate", () => {
        const unsortedMoodList: MoodObject[] = [
            {
                id: 1,
                comment: "ha ha",
                date: new Date("December 10, 2020 03:24:00"),
                mood: 6,
            },
            {
                id: 2,
                comment: "ha ha",
                date: new Date("December 10, 2021 03:24:00"),
                mood: 6,
            },
            {
                id: 3,
                comment: "ha",
                date: new Date("December 24, 2020 03:24:00"),
                mood: 4,
            },
            {
                id: 4,
                comment: "ha ha",
                date: new Date("December 20, 2020 03:24:00"),
                mood: 1,
            },
        ];
        const sortedMoodList: MoodObject[] = [
            {
                id: 2,
                comment: "ha ha",
                date: new Date("December 10, 2021 03:24:00"),
                mood: 6,
            },
            {
                id: 3,
                comment: "ha",
                date: new Date("December 24, 2020 03:24:00"),
                mood: 4,
            },
            {
                id: 4,
                comment: "ha ha",
                date: new Date("December 20, 2020 03:24:00"),
                mood: 1,
            },
            {
                id: 1,
                comment: "ha ha",
                date: new Date("December 10, 2020 03:24:00"),
                mood: 6,
            },
        ];

        expect(sortMoodsByDate(unsortedMoodList)).toEqual(sortedMoodList);
    });
});
