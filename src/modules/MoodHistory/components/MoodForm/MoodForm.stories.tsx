import React from "react";
import { MoodForm } from "./MoodForm";
import { withKnobs, date, number } from "@storybook/addon-knobs";
import { Mood, MoodObject } from "modules/MoodHistory/types";

export default {
    title: "MoodForm",
    decorators: [withKnobs],
};

export const simpleData = () => (
    <MoodForm
        moodObject={{
            date: new Date(date("date", new Date("December 16, 2020 03:24:00"))),
            mood: number("mood", 7) as Mood,
            comment: "",
        }}
        createUpdateMoodObject={(value: MoodObject) => console.log(value)}
    />
);
