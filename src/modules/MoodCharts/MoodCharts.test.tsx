import { shallow } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MoodObject } from "modules/MoodHistory/types";
import { MoodCharts } from "src/modules";
import * as faker from "faker";

const data: MoodObject[] = [
    {
        id: "2",
        mood: 7,
        date: faker.date.recent(),
        comment: "",
    },
    {
        id: "2",
        mood: 6,
        date: faker.date.recent(),
        comment: "",
    },
    {
        id: "2",
        mood: 5,
        date: faker.date.recent(),
        comment: "",
    },
    {
        id: "1",
        mood: 1,
        date: faker.date.recent(),
        comment: "Slept all day",
    },
];

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
        expect(wrapper.html()).not.toEqual("<h2>Their is not enough history for graph</h2>");
    });

    it("should not contain chart", () => {
        const wrapper = shallow(
            <Provider store={store}>
                <MoodCharts moodList={[]} />
            </Provider>,
            { lifecycleExperimental: true }
        );

        expect(wrapper.html()).not.toContain("canvas");
        expect(wrapper.html()).toEqual("<h2>Their is not enough history for graph</h2>");
    });
});
