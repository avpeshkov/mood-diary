import { shallow } from "enzyme";
import { Mood, MoodItem, MoodScale } from "../MoodScale";
import React from "react";
import { MoodHistory, AddNewMoodButton } from "./MoodHistory";
import { backEndFake } from "./MoodHistoryBackEndFake";
import { MoodView } from "../MoodView";
import Modal from "react-modal";
import { MoodObject } from "types/mood";

describe("MoodHistory", () => {
    it("renders component", () => {
        const history = shallow(<MoodHistory />);
        expect(history.find(AddNewMoodButton).length).toEqual(1);
        expect(history.find(Modal).length).toEqual(1);
        expect(history.find(MoodView).length).toEqual(backEndFake.moodList.length);
    });

    it("test component functions", () => {
        const history = shallow(<MoodHistory />);
        expect(history.state("moodList")).toEqual(backEndFake.moodList);
        history.setState({ moodList: [] });
        expect(history.state("moodList")).toEqual([]);
        let moodObject: MoodObject = { mood: 7 as Mood, date: new Date(), comment: "" };
        const componentInstance = history.instance() as MoodHistory;

        componentInstance.createUpdateMoodObject(moodObject);
        moodObject = { ...moodObject, id: 1 };
        expect((history.state("moodList") as MoodObject[])[0]).toEqual(moodObject);

        moodObject = { ...moodObject, mood: 3 };
        componentInstance.createUpdateMoodObject(moodObject);
        expect((history.state("moodList") as MoodObject[])[0]).toEqual(moodObject);

        componentInstance.addEditMoodObject(1);
        expect(history.state("moodObjectToEdit") as MoodObject[]).toEqual(moodObject);

        componentInstance.clearEditMoodObject();
        expect(history.state("moodObjectToEdit") as MoodObject).toEqual(null);

        componentInstance.deleteMoodObject(1);
        expect((history.state("moodList") as MoodObject[]).length).toEqual(0);

        componentInstance.addEditMoodObject();
        const blankObject = history.state("moodObjectToEdit") as MoodObject;
        expect(blankObject.date.toDateString()).toEqual(new Date().toDateString());
        expect(blankObject.comment).toEqual("");
        expect(blankObject.mood).toEqual(5);
        componentInstance.clearEditMoodObject();
    });
});
