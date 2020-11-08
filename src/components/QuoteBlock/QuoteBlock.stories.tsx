import React from "react";
import { number, withKnobs, boolean } from "@storybook/addon-knobs";
import { QuoteBlock } from "./QuoteBlock";

export default {
    title: "QuoteBlock",
    decorators: [withKnobs],
};

export const withRealField = () => <QuoteBlock interval={number("interval", 10000)} isAutoSwitchEnabled={boolean("isActive", true)} />;
