import React from "react";
import { withKnobs, number } from "@storybook/addon-knobs";
import { MoodScale } from "./MoodScale";

export default {
    title: "MoodScale",
    decorators: [withKnobs],
};

export const withRealField = () => <MoodScale currentMood={number("current_mood", 5)} onMoodUpdate={(mood: number) => console.log(mood)} />;
