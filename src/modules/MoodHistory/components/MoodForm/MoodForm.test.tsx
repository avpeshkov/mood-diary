import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { MoodForm } from "./MoodForm";
import { Mood, MoodObject } from "modules/MoodHistory/types";
import { date, lorem, random } from "faker";

describe("MoodFormComponent", () => {
    describe("Submitting form", () => {
        const moodObject: MoodObject = {
            mood: random.number(10) as Mood,
            date: date.recent(),
            comment: lorem.sentence(),
        };
        const submitForm = jest.fn();

        test("Submits form", async () => {
            const wrapper = render(<MoodForm moodObject={moodObject} createUpdateMoodObject={submitForm} />);
            const submitButtonNode = wrapper.getByText("Save");

            const commentNode = wrapper.getByText(moodObject.comment) as HTMLInputElement;
            fireEvent.change(commentNode, { target: { value: "new updated comment" } });
            fireEvent.click(submitButtonNode);

            await waitFor(() => expect(submitForm).toHaveBeenCalledTimes(1));
            await waitFor(() => expect(submitForm).toHaveBeenCalledWith({ ...moodObject, comment: "new updated comment" }));
        });
    });

    describe("Reset form", () => {
        const moodObject: MoodObject = {
            mood: random.number(10) as Mood,
            date: date.recent(),
            comment: lorem.sentence(),
        };
        const submitForm = jest.fn();

        beforeAll(() => {
            return { submitForm: submitForm, moodObject: moodObject };
        });

        test("Submits form after reset", async () => {
            const wrapper = render(<MoodForm moodObject={moodObject} createUpdateMoodObject={submitForm} />);
            const submitButtonNode = wrapper.getByText("Save");
            const resetButtonNode = wrapper.getByText("Reset");

            const commentNode = wrapper.getByText(moodObject.comment) as HTMLInputElement;
            fireEvent.change(commentNode, { target: { value: "new updated comment" } });
            fireEvent.click(resetButtonNode);
            fireEvent.click(submitButtonNode);

            await waitFor(() => expect(submitForm).toHaveBeenCalledTimes(1));
            await waitFor(() => expect(submitForm).toHaveBeenCalledWith({ ...moodObject }));
        });
    });
});
