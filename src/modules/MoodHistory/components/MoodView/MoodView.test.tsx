import React from "react";
import snapshotDiff from "snapshot-diff";

import { shallow } from "enzyme";
import { MoodView } from "./index";
import { Mood } from "modules/MoodHistory/types";
import { AddNewMoodButton } from "src/modules";

describe("MoodView", () => {
    const moodObject = { mood: 5 as Mood, comment: "test", date: new Date("December 16, 2020 03:24:00"), id: "1" };
    test("no snapshot difference between equal components", () => {
        expect(snapshotDiff(<MoodView moodObject={moodObject} />, <MoodView moodObject={moodObject} />)).toMatchSnapshot();
    });
    const moodObjectWithoutComment = { ...moodObject, comment: "" };
    test("no snapshot difference between components", () => {
        expect(snapshotDiff(<MoodView moodObject={moodObjectWithoutComment} />, <MoodView moodObject={moodObjectWithoutComment} />)).toMatchSnapshot();
    });

    it("renders component with comment", () => {
        const view = shallow(<MoodView moodObject={moodObject} />);

        expect(view.find("#comment").length).toEqual(1);
    });
    it("renders component without comment", () => {
        const scale = shallow(<MoodView moodObject={moodObjectWithoutComment} />);
        expect(scale.find("#comment").length).toEqual(0);
    });

    it("renders edit button on edit function in props", () => {
        const scale = shallow(<MoodView moodObject={moodObject} editMoodObject={() => {}} />);
        expect(scale.find({ "data-test-id": "edit-mood-btn" }).length).toEqual(1);
    });

    it("not renders edit button without edit function in props", () => {
        const scale = shallow(<MoodView moodObject={moodObject} />);
        expect(scale.find({ "data-test-id": "edit-mood-btn" }).length).toEqual(0);
    });

    it("renders delete button on delete function in props", () => {
        const scale = shallow(<MoodView moodObject={moodObject} deleteMoodObject={() => {}} />);
        expect(scale.find({ "data-test-id": "delete-mood-btn" }).length).toEqual(1);
    });

    it("not delete edit button without delete function in props", () => {
        const scale = shallow(<MoodView moodObject={moodObject} />);
        expect(scale.find({ "data-test-id": "delete-mood-btn" }).length).toEqual(0);
    });
});
