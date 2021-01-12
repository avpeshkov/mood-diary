import React from "react";
import { MoodHistory } from ".";
import { storiesOf } from "@storybook/react";
import { MoodObject } from "types/mood";
import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "rdx/reducer";
import { Provider } from "react-redux";

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
