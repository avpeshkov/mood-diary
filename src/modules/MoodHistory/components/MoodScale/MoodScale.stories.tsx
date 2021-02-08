import React from "react";
import { withKnobs, number } from "@storybook/addon-knobs";
import { MoodScale } from "./MoodScale";
import { action } from "@storybook/addon-actions";
import { Mood } from "modules/MoodHistory/types";

export default {
    title: "MoodScale",
    decorators: [withKnobs],
};

const MoodButtonClicked = action("MoodButton clicked (element)");

export const simpleDataWithOnMoodUpdate = () => <MoodScale currentMood={number("current_mood", 5) as Mood} onMoodUpdate={MoodButtonClicked} />;
export const simpleDataWithoutMoodUpdate = () => <MoodScale currentMood={number("current_mood", 5) as Mood} />;
