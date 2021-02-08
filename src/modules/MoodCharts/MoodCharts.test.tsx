import { shallow } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Mood, MoodObject } from "modules/MoodHistory/types";
import { getTendencyResult, MoodCharts } from "src/modules";
import { range } from "ramda";
import { date, lorem, random } from "faker";

const data: MoodObject[] = range(1, 20).map((index: number) => {
    return {
        id: random.uuid(),
        mood: random.number(10) as Mood,
        date: date.soon(index),
        comment: lorem.sentence(),
    };
});

describe("MoodCharts", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let store: any;
    const mockStore = configureStore();

    beforeEach(() => {
        store = mockStore({ moods: data });
        jest.spyOn(store, "dispatch");
    });

    it("should contain chart", () => {
        const wrapper = shallow(
            <Provider store={store}>
                <MoodCharts moodList={store.getState().moods} />
            </Provider>,
            { lifecycleExperimental: true }
        );

        expect(wrapper.html()).toContain("canvas");
        expect(wrapper.html()).not.toContain("<h2>Their is not enough history for graph</h2>");
    });

    it("should not contain chart", () => {
        const wrapper = shallow(
            <Provider store={store}>
                <MoodCharts moodList={[]} />
            </Provider>,
            { lifecycleExperimental: true }
        );

        expect(wrapper.html()).not.toContain("canvas");
        expect(wrapper.html()).toContain("<h2>Their is not enough history for graph</h2>");
    });

    it("getTendencyResult test", () => {
        expect(getTendencyResult([10, 1])).toEqual("Your condition has worsened in recent years, perhaps you should seek help from a psychologist");
        expect(getTendencyResult([1, 10])).toEqual("Your condition has improved lately, keep it up, you can be proud of yourself.");
        expect(getTendencyResult([3, 3])).toEqual(
            "Your condition has been stable in the past two weeks. " +
                "This is not the best condition, maybe you should think about what you could improve in your life."
        );
        expect(getTendencyResult([8, 8])).toEqual("Your condition has been stable in the past two weeks. Condition is satisfactory, keep up, the good work.");
    });
});
