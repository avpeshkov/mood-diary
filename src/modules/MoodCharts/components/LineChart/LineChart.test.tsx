import { shallow } from "enzyme";
import React from "react";
import { Mood, MoodObject } from "modules/MoodHistory/types";
import { range } from "ramda";
import { date, lorem, random } from "faker";
import { LineChart } from "./LineChart";
import { findLineByLeastSquares } from "utils/stat";

const moods: MoodObject[] = range(1, 20).map((index: number) => {
    return {
        id: random.uuid(),
        mood: random.number(10) as Mood,
        date: date.soon(index).toString(),
        comment: lorem.sentence(),
    };
});

const tendency: number[] = findLineByLeastSquares(moods.map((mood: MoodObject) => mood.mood));

describe("MoodCharts", () => {
    it("should contain chart", () => {
        const wrapper = shallow(<LineChart moodList={moods} tendency={tendency} label={"Moods"} />, { lifecycleExperimental: true });

        expect(wrapper.html()).toContain("canvas");
        expect(wrapper.html()).not.toContain("<h2>Their is not enough history for graph</h2>");
    });

    it("should not contain chart", () => {
        const wrapper = shallow(<LineChart moodList={[]} tendency={[]} label={"Moods"} />, { lifecycleExperimental: true });

        expect(wrapper.html()).not.toContain("canvas");
        expect(wrapper.html()).toContain("<h2>Their is not enough history for graph</h2>");
    });
});
