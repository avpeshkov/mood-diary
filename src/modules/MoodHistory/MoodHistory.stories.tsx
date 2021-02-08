import React from "react";
import { storiesOf } from "@storybook/react";
import { MoodObject } from "./types";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { reducer } from "src/store";
import { MoodHistory } from "src/modules";
import styled from "@emotion/styled";

const StoryBookMoodHistoryWindow = styled.div`
    .List {
        height: 400px !important;
    }
    #mood-view-wrapper {
        height: 120px !important;
    }
`;

const data: MoodObject[] = [
    {
        id: "1",
        mood: 1,
        date: new Date("December 10, 2020 03:24:00").toString(),
        comment: "Slept all day",
    },
    {
        id: "2",
        mood: 5,
        date: new Date("December 11, 2020 03:24:00").toString(),
        comment: "",
    },
];
const store = configureStore({
    reducer,
    preloadedState: { moods: data },
});

storiesOf("MoodHistory", module).add("with mocked get", () => {
    return (
        <Provider store={store}>
            <StoryBookMoodHistoryWindow>
                <MoodHistory moodList={store.getState().moods} />
            </StoryBookMoodHistoryWindow>
        </Provider>
    );
});
