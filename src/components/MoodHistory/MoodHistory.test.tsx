import { shallow } from "enzyme";
import React from "react";
import { MoodHistory, AddNewMoodButton } from "./MoodHistory";
import { MoodView } from "../MoodView";
import Modal from "react-modal";

const axios = require("axios");
jest.mock("axios");
const data = [
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
];

describe("MoodHistory", () => {
    test("test mood history", async () => {
        axios.get.mockResolvedValue({
            data: data,
        });

        const history = await shallow(<MoodHistory />);

        expect(history.find(AddNewMoodButton).length).toEqual(1);
        expect(history.find(Modal).length).toEqual(1);
        expect(history.find(MoodView).length).toEqual(2);
    });
});
