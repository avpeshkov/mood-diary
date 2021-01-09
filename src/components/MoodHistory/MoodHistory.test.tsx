import { shallow } from "enzyme";
import React from "react";
import { MoodHistory, AddNewMoodButton } from "./MoodHistory";
import { MoodView } from "../MoodView";
import Modal from "react-modal";
import { MoodObject } from "types/mood";

jest.mock("firebase/app");

const data: MoodObject[] = [
    {
        id: 1,
        mood: 1,
        date: new Date("December 10, 2020 03:24:00"),
        comment: "Slept all day",
    },
    {
        id: 2,
        mood: 5,
        date: new Date("December 11, 2020 03:24:00"),
        comment: "",
    },
];

describe("MoodHistory", () => {
    test("test mood history", () => {
        const history = shallow(<MoodHistory moodList={data} updateMoodList={() => {}} />);

        expect(history.find(AddNewMoodButton).length).toEqual(1);
        expect(history.find(Modal).length).toEqual(1);
        expect(history.find(MoodView).length).toEqual(2);
    });
});
