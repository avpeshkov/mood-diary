import React from "react";
import { number, boolean } from "@storybook/addon-knobs";
import { QuoteBlock } from "./QuoteBlock";
import { QUOTE_BLOCK_DEFAULT_INTERVAL } from "./consts";
import { storiesOf } from "@storybook/react";

const data = [
    {
        quote: "Есть только два способа прожить свою жизнь. Первый — так, будто никаких чудес не бывает. Второй — так, будто всё на свете является чудом",
        author: "Альберт Эйнштейн",
        id: 1,
    },
    {
        quote: "Никогда не поздно стать тем, кем тебе хочется быть.",
        author: "Джордж Элиот",
        id: 2,
    },
    {
        quote: "Если ты способен выдумать что-то, ты можешь и сделать это.",
        author: "Уолт Дисней",
        id: 3,
    },
];

storiesOf("QuoteBlock", module).add("with mocked get", () => {
    return <QuoteBlock interval={number("interval", QUOTE_BLOCK_DEFAULT_INTERVAL)} isAutoSwitchEnabled={boolean("isActive", true)} quoteList={data} />;
});
