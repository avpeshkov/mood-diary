import React from "react";
import { withKnobs, date, number } from "@storybook/addon-knobs";
import { MoodView } from "./MoodView";
import { Mood } from "modules/MoodHistory/types";

export default {
    title: "MoodView",
    decorators: [withKnobs],
};

export const simpleData = () => (
    <MoodView
        moodObject={{
            date: new Date(date("date", new Date("December 16, 2020 03:24:00"))).toString(),
            mood: number("mood", 7) as Mood,
            comment: "Comment about my life",
        }}
    />
);

export const withoutComment = () => (
    <MoodView
        moodObject={{
            date: new Date(date("date", new Date("December 16, 2020 03:24:00"))).toString(),
            mood: number("mood", 7) as Mood,
            comment: "",
        }}
    />
);
