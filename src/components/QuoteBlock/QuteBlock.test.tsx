import * as React from "react";
import { shallow } from "enzyme";
import { QuoteBlock } from "./QuoteBlock";

test("active QuoteBlock", () => {
    jest.useFakeTimers();
    const component = shallow(<QuoteBlock interval={3000} isAutoSwitchEnabled={true} />);
    expect(component.state("quoteIndex")).toBe(0); // Success!
    const previousQuoteIndex = component.state("quoteIndex");
    jest.advanceTimersByTime(3000);
    expect(previousQuoteIndex !== component.state("quoteIndex")).toBeTruthy(); // Success!
});

test("not active QuoteBlock", () => {
    jest.useFakeTimers();
    const component = shallow(<QuoteBlock interval={3000} isAutoSwitchEnabled={false} />);
    expect(component.state("quoteIndex")).toBe(0); // Success!
    const previousQuoteIndex = component.state("quoteIndex");
    jest.advanceTimersByTime(3000);
    expect(previousQuoteIndex === component.state("quoteIndex")).toBeTruthy(); // Success!
});
