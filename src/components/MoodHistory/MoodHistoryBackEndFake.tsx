// тут у нас будет дата получаемая с бекенда, которая пока не понятно что где и как
import { MoodObject } from "types/mood";

export const moodHistoryBackEndFake: { moodList: MoodObject[] } = {
    moodList: [
        { id: 1, mood: 1, date: new Date("December 10, 2020 03:24:00"), comment: "Slept all day" },
        { id: 2, mood: 5, date: new Date("December 11, 2020 03:24:00"), comment: "" },
        { id: 3, mood: 8, date: new Date("December 12, 2020 03:24:00"), comment: "Very sad" },
        { id: 4, mood: 10, date: new Date("December 13, 2020 03:24:00"), comment: "" },
        { id: 5, mood: 10, date: new Date("December 14, 2020 03:24:00"), comment: "" },
        { id: 6, mood: 2, date: new Date("December 15, 2020 03:24:00"), comment: "Dad was rude" },
        { id: 7, mood: 7, date: new Date("December 16, 2020 03:24:00"), comment: "" },
        { id: 8, mood: 5, date: new Date("December 17, 2020 03:24:00"), comment: "" },
        { id: 9, mood: 6, date: new Date("December 18, 2020 03:24:00"), comment: "" },
        { id: 10, mood: 7, date: new Date("December 19, 2020 03:24:00"), comment: "" },
        { id: 11, mood: 2, date: new Date("December 20, 2020 03:24:00"), comment: "" },
        { id: 12, mood: 4, date: new Date("December 21, 2020 03:24:00"), comment: "" },
        { id: 13, mood: 5, date: new Date("December 22, 2020 03:24:00"), comment: "" },
        { id: 14, mood: 6, date: new Date("December 23, 2020 03:24:00"), comment: "" },
        { id: 15, mood: 7, date: new Date("December 24, 2020 03:24:00"), comment: "" },
    ],
};
