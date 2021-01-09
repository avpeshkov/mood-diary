import React from "react";
import snapshotDiff from "snapshot-diff";

import { shallow } from "enzyme";
import { MoodView } from "components/MoodView";
import { Mood } from "types/mood";

describe("MoodView", () => {
    const moodObject = { mood: 5 as Mood, comment: "test", date: new Date("December 16, 2020 03:24:00") };
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
});
