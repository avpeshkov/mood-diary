import React from "react";
import { shallow } from "enzyme";

import { MoodScale } from "./MoodScale";
import { MoodItem } from ".";

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

    it("updates sate through click", () => {
        const scale = shallow(
            <MoodScale
                currentMood={7}
                onMoodUpdate={(mood: number) => {
                    console.log(mood);
                }}
            />
        );
        expect(scale.state()).toEqual({ currentMood: 7 });
        scale.find(MoodItem).last().props().onClick();
        expect(scale.state()).toEqual({ currentMood: 10 });
    });
});
