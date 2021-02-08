import React from "react";
import { shallow } from "enzyme";

import { getOnClick, MoodScale } from "./MoodScale";
import { MoodItem } from "./components";

describe("MoodScale", () => {
    const onMoodUpdate = jest.fn();
    it("renders component", () => {
        const scale = shallow(<MoodScale currentMood={5} onMoodUpdate={onMoodUpdate} />);
        expect(scale.find(MoodItem).length).toEqual(10);
    });

    it("updates sate through props change", () => {
        const scale = shallow(<MoodScale currentMood={7} onMoodUpdate={onMoodUpdate} />);

        expect(
            scale.find(MoodItem).filterWhere((item) => {
                return item.props().isFilled;
            }).length
        ).toEqual(7);

        scale.setProps({ currentMood: 4 });

        expect(
            scale.find(MoodItem).filterWhere((item) => {
                return item.props().isFilled;
            }).length
        ).toEqual(4);
    });

    it("test getOnClick", () => {
        expect(getOnClick(undefined)).toEqual(undefined);
        expect(getOnClick(onMoodUpdate)).toBeTruthy();
    });
});
