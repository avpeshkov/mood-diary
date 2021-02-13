import { storiesOf } from "@storybook/react";
import { MoodObject } from "modules/MoodHistory/types";
import React from "react";
import { PieChart } from "./PieChart";

storiesOf("PieChart", module).add("with mocked data", () => {
    const moods: MoodObject[] = [
        {
            id: "2",
            mood: 7,
            date: "December 13, 2020 03:24:00",
            comment: "",
        },
        {
            id: "2",
            mood: 6,
            date: "December 12, 2020 03:24:00",
            comment: "",
        },
        {
            id: "2",
            mood: 5,
            date: "December 11, 2020 03:24:00",
            comment: "",
        },
        {
            id: "1",
            mood: 1,
            date: "December 10, 2020 03:24:00",
            comment: "Slept all day",
        },
        {
            id: "1",
            mood: 1,
            date: "December 9, 2020 03:24:00",
            comment: "Slept all day",
        },
    ];

    return <PieChart moodList={moods} />;
});
