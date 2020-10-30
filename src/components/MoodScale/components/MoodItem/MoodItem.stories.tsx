import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, number } from "@storybook/addon-knobs";
import { MoodItem } from "./MoodItem";
export default {
    title: "MoodItem",
    decorators: [withKnobs],
};

export const nonFilled = () => [
    <MoodItem key="1" onClick={action("MoodItem clicked")} mood={number("mood", 1)} isFilled={false} />,
    <MoodItem key="2" onClick={action("MoodItem clicked")} mood={number("mood2", 7)} isFilled={false} />,
];

export const Filled = () => [
    <MoodItem key="1" onClick={action("MoodItem clicked")} mood={number("mood", 1)} isFilled={true} />,
    <MoodItem key="2" onClick={action("MoodItem clicked")} mood={number("mood2", 6)} isFilled={true} />,
];
