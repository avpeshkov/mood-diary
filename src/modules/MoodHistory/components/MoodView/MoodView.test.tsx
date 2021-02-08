import React from "react";

import { shallow } from "enzyme";
import { MoodView } from "./index";
import { Mood } from "modules/MoodHistory/types";
import { date, lorem, random } from "faker";

describe("MoodView", () => {
    const moodObject = {
        id: random.uuid(),
        mood: random.number(10) as Mood,
        date: date.recent(),
        comment: lorem.sentence(),
    };
    const moodObjectWithoutComment = { ...moodObject, comment: "" };

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
