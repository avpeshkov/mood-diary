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

        // эти тесты временно закомичены, так как функции более не работают со стейтом,
        // и проводить их через большую цепочку моков более не целесообразно,
        // а далее предполоагется тестировать компонент чрез интеграционное тестирование.

        // const history = shallow(<MoodHistory />);
        // let moodObject: MoodObject = { mood: 7 as Mood, date: new Date(), comment: "" };
        // const componentInstance = history.instance() as MoodHistory;
        //
        // it("test component init", () => {
        //     expect(history.state("moodList")).toEqual(moodHistoryBackEndFake.moodList);
        // });
        //
        // it("test component setState", () => {
        //     history.setState({ moodList: [] });
        //     expect(history.state("moodList")).toEqual([]);
        // });
        //
        //     componentInstance.createUpdateMoodObject(moodObject);
        //     moodObject = { ...moodObject, id: 3 };
        //     console.log(history.state("moodList"));
        //     expect((history.state("moodList") as MoodObject[])[3]).toEqual(moodObject);
        //
        //     moodObject = { ...moodObject, mood: 3 };
        //     componentInstance.createUpdateMoodObject(moodObject);
        //     expect((history.state("moodList") as MoodObject[])[0]).toEqual(moodObject);
        // });
        //
        // it("test component addEditMoodObject on edit", () => {
        //     componentInstance.addEditMoodObject(1);
        //     expect(history.state("moodObjectToEdit") as MoodObject[]).toEqual(moodObject);
        // });
        // it("test component clearEditMoodObject", () => {
        //     componentInstance.clearEditMoodObject();
        //     expect(history.state("moodObjectToEdit") as MoodObject).toEqual(null);
        // });
        // it("test component deleteMoodObject", () => {
        //     componentInstance.deleteMoodObject(1);
        //     expect((history.state("moodList") as MoodObject[]).length).toEqual(0);
        // });
        // it("test component functions on add", () => {
        //     componentInstance.addEditMoodObject();
        //     const blankObject = history.state("moodObjectToEdit") as MoodObject;
        //     expect(blankObject.date.toDateString()).toEqual(new Date().toDateString());
        //     expect(blankObject.comment).toEqual("");
        //     expect(blankObject.mood).toEqual(5);
        //     componentInstance.clearEditMoodObject();
    });
});
