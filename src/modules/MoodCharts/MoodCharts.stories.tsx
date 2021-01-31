import { storiesOf } from "@storybook/react";
import { MoodObject } from "modules/MoodHistory/types";
import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "src/store";
import { Provider } from "react-redux";
import { MoodCharts } from "src/modules";
import React from "react";

storiesOf("MoodCharts", module).add("with mocked data", () => {
    const data: MoodObject[] = [
        {
            id: "2",
            mood: 7,
            date: new Date("December 13, 2020 03:24:00"),
            comment: "",
        },
        {
            id: "2",
            mood: 6,
            date: new Date("December 12, 2020 03:24:00"),
            comment: "",
        },
        {
            id: "2",
            mood: 5,
            date: new Date("December 11, 2020 03:24:00"),
            comment: "",
        },
        {
            id: "1",
            mood: 1,
            date: new Date("December 10, 2020 03:24:00"),
            comment: "Slept all day",
        },
    ];
    const store = configureStore({
        reducer,
        preloadedState: { moods: data },
    });
    return (
        <Provider store={store}>
            <MoodCharts moodList={store.getState().moods} />
        </Provider>
    );
});
