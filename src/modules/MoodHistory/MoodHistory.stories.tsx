import React from "react";
import { storiesOf } from "@storybook/react";
import { MoodObject } from "./types";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { reducer } from "src/store";
import { MoodHistory } from "src/modules";

storiesOf("MoodHistory", module).add("with mocked get", () => {
    const data: MoodObject[] = [
        {
            id: "1",
            mood: 1,
            date: new Date("December 10, 2020 03:24:00"),
            comment: "Slept all day",
        },
        {
            id: "2",
            mood: 5,
            date: new Date("December 11, 2020 03:24:00"),
            comment: "",
        },
    ];
    const store = configureStore({
        reducer,
        preloadedState: { moods: data },
    });
    return (
        <Provider store={store}>
            <MoodHistory moodList={store.getState().moods} />
        </Provider>
    );
});
