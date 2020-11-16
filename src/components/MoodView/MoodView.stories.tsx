import React from "react";
import { withKnobs, date, number } from "@storybook/addon-knobs";
import { Mood } from "../MoodScale/components/MoodItem";
import { MoodView } from "./MoodView";

export default {
    title: "MoodView",
    decorators: [withKnobs],
};

export const simpleData = () => (
    <MoodView
        moodObject={{
            date: new Date(date("date", new Date("December 16, 2020 03:24:00"))),
            mood: number("mood", 7) as Mood,
            comment: "Comment about my life",
        }}
    />
);

export const withoutComment = () => (
    <MoodView
        moodObject={{
            date: new Date(date("date", new Date("December 16, 2020 03:24:00"))),
            mood: number("mood", 7) as Mood,
            comment: "",
        }}
    />
);
