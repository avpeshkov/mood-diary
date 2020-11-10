import React from "react";
import { MoodForm } from "./MoodForm";
import { withKnobs, boolean, object, date, number } from "@storybook/addon-knobs";
import { Mood } from "../MoodScale/components/MoodItem";

export default {
    title: "MoodForm",
    decorators: [withKnobs],
};

export const withRealField = () => (
    <MoodForm
        isViewMode={boolean("isViewMode", true)}
        moodObject={{
            date: new Date(date("date", new Date("December 16, 2020 03:24:00"))),
            mood: number("mood", 7) as Mood,
        }}
    />
);
