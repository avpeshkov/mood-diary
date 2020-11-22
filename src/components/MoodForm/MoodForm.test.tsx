import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { MoodForm } from "./MoodForm";
import { Mood } from "../MoodScale/components/MoodItem";
import { MoodObject } from "types/mood";

describe("MoodFormComponent", () => {
    describe("Submitting form", () => {
        const moodObject: MoodObject = {
            date: new Date("December 16, 2020 03:24:00"),
            mood: 7 as Mood,
            comment: "ha ha ha",
        };
        const submitForm = jest.fn();

        beforeAll(() => {
            const wrapper = render(<MoodForm moodObject={moodObject} createUpdateMoodObject={submitForm} />);
            const submitButtonNode = wrapper.getByText("Save");

            const commentNode = wrapper.getByText(moodObject.comment) as HTMLInputElement;
            fireEvent.change(commentNode, { target: { value: "new updated comment" } });
            fireEvent.click(submitButtonNode);

            return { submitForm: submitForm, moodObject: moodObject };
        });

        test("Submits Login with email and password", () => {
            expect(submitForm).toHaveBeenCalledTimes(1); // <- Error. Doesn't get called
            expect(submitForm).toHaveBeenCalledWith({ ...moodObject, comment: "new updated comment" });
        });
    });
});
