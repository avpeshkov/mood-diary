import React from "react";
import { number, withKnobs, boolean } from "@storybook/addon-knobs";
import { QuoteBlock } from "./QuoteBlock";
import { QUOTE_BLOCK_DEFAULT_INTERVAL } from "./consts";

export default {
    title: "QuoteBlock",
    decorators: [withKnobs],
};

export const simpleData = () => <QuoteBlock interval={number("interval", QUOTE_BLOCK_DEFAULT_INTERVAL)} isAutoSwitchEnabled={boolean("isActive", true)} />;
