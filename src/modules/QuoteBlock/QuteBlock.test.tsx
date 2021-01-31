import * as React from "react";
import { shallow } from "enzyme";
import { QuoteBlock } from "src/modules";

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
];

describe("QuoteBlock", () => {
    test("active QuoteBlock", async () => {
        jest.useFakeTimers();
        const component = await shallow(<QuoteBlock interval={3000} isAutoSwitchEnabled={true} quoteList={data} />);
        expect(component.state("quoteIndex")).toBe(0);
        const previousQuoteIndex = await component.state("quoteIndex");
        jest.advanceTimersByTime(3000);
        expect(previousQuoteIndex !== component.state("quoteIndex")).toBeTruthy();
    });

    test("not active QuoteBlock", async () => {
        jest.useFakeTimers();
        const component = await shallow(<QuoteBlock interval={3000} isAutoSwitchEnabled={false} quoteList={data} />);
        expect(component.state("quoteIndex")).toBe(0);
        const previousQuoteIndex = component.state("quoteIndex");
        jest.advanceTimersByTime(3000);
        expect(previousQuoteIndex === component.state("quoteIndex")).toBeTruthy();
    });
});
