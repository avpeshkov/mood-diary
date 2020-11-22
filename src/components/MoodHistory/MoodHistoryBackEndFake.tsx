// тут у нас будет дата получаемая с бекенда, которая пока не понятно что где и как
import { MoodObject } from "types/mood";

export const moodHistoryBackEndFake: { moodList: MoodObject[] } = {
    moodList: [
        { id: 1, mood: 1, date: new Date("December 13, 2020 03:24:00"), comment: "Slept all day" },
        { id: 2, mood: 5, date: new Date("December 14, 2020 03:24:00"), comment: "" },
        { id: 3, mood: 8, date: new Date("December 15, 2020 03:24:00"), comment: "" },
        { id: 4, mood: 10, date: new Date("December 16, 2020 03:24:00"), comment: "" },
    ],
};
