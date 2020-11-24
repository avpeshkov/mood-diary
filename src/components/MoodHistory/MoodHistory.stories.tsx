import React from "react";
import { MoodHistory } from ".";
import { storiesOf } from "@storybook/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MOOD_LIST_API } from "../../api/mood";

const mock = new MockAdapter(axios);

storiesOf("MoodHistory", module).add("with mocked get", () => {
    mock.onGet(MOOD_LIST_API).reply(200, [
        {
            id: 1,
            mood: 1,
            date: "December 10, 2020 03:24:00",
            comment: "Slept all day",
        },
        {
            id: 2,
            mood: 5,
            date: "December 11, 2020 03:24:00",
            comment: "",
        },
    ]);

    return <MoodHistory />;
});
