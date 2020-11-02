import React from "react";
import { shallow } from "enzyme";

import { MoodScale } from "./MoodScale";
import { Mood, MoodItem } from ".";

describe("MoodScale", () => {
    it("renders component", () => {
        const scale = shallow(
            <MoodScale
                currentMood={5}
                onMoodUpdate={(mood: number) => {
                    console.log(mood);
                }}
            />
        );
        expect(scale.find(MoodItem).length).toEqual(10);
    });

    it("updates sate through props change", () => {
        const scale = shallow(
            <MoodScale
                currentMood={7}
                onMoodUpdate={(mood: Mood) => {
                    console.log(mood);
                }}
            />
        );

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
});
