import { sortMoodsByDate } from "./utils";
import { Mood, MoodObject } from "./types";
import { date, lorem, random } from "faker";

describe("mood utils test", () => {
    it("test sortMoodsByDate", () => {
        const unsortedMoodList: MoodObject[] = [
            {
                id: random.uuid(),
                mood: random.number(10) as Mood,
                date: date.past().toString(),
                comment: lorem.sentence(),
            },
            {
                id: random.uuid(),
                mood: random.number(10) as Mood,
                date: date.soon().toString(),
                comment: lorem.sentence(),
            },
            {
                id: random.uuid(),
                mood: random.number(10) as Mood,
                date: date.future(4).toString(),
                comment: lorem.sentence(),
            },
            {
                id: random.uuid(),
                mood: random.number(10) as Mood,
                date: date.recent().toString().toString(),
                comment: lorem.sentence(),
            },
        ];
        const sortedMoodList: MoodObject[] = [unsortedMoodList[2], unsortedMoodList[1], unsortedMoodList[3], unsortedMoodList[0]];

        expect(sortMoodsByDate(unsortedMoodList)).toEqual(sortedMoodList);
    });
});
