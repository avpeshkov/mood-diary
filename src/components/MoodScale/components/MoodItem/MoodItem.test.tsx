import React from "react";
import renderer from "react-test-renderer";

import { MoodItem } from "./MoodItem";

describe("MoodItem", () => {
    it("renders not filled button", () => {
        expect(renderer.create(<MoodItem onClick={jest.fn()} mood={1} isFilled={false} />).toJSON()).toMatchSnapshot();
    });
    it("renders not filled button 2", () => {
        expect(renderer.create(<MoodItem onClick={jest.fn()} mood={5} isFilled={false} />).toJSON()).toMatchSnapshot();
    });
    it("renders filled button", () => {
        expect(renderer.create(<MoodItem onClick={jest.fn()} mood={1} isFilled={true} />).toJSON()).toMatchSnapshot();
    });
    it("renders filled button 2", () => {
        expect(renderer.create(<MoodItem onClick={jest.fn()} mood={5} isFilled={true} />).toJSON()).toMatchSnapshot();
    });
});
