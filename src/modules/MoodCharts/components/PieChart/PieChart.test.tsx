import { shallow } from "enzyme";
import React from "react";
import { Mood, MoodObject } from "modules/MoodHistory/types";
import { range } from "ramda";
import { date, lorem, random } from "faker";
import { PieChart } from "./PieChart";

const moods: MoodObject[] = range(1, 20).map((index: number) => {
    return {
        id: random.uuid(),
        mood: random.number(10) as Mood,
        date: date.soon(index).toString(),
        comment: lorem.sentence(),
    };
});

describe("PieChart", () => {
    it("should contain chart", () => {
        const wrapper = shallow(<PieChart moodList={moods} />, { lifecycleExperimental: true });

        expect(wrapper.html()).toContain("canvas");
        expect(wrapper.html()).not.toContain("<h2>Their is not enough history for chart</h2>");
    });

    it("should not contain chart", () => {
        const wrapper = shallow(<PieChart moodList={[]} />, { lifecycleExperimental: true });

        expect(wrapper.html()).not.toContain("canvas");
        expect(wrapper.html()).toContain("<h2>Their is not enough history for chart</h2>");
    });
});
