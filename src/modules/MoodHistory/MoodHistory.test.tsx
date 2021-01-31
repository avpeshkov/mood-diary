import { mount } from "enzyme";
import React from "react";
import { MoodHistory, AddNewMoodButton, getMoodObjectToEdit } from "./MoodHistory";
import Modal from "react-modal";
import { MoodObject } from "./types";
import { Provider } from "react-redux";
import { MoodView } from "modules/MoodHistory/components/MoodView";
import configureStore from "redux-mock-store";

const moodObjectToSearch: MoodObject = {
    id: "2",
    mood: 5,
    date: new Date("December 11, 2020 03:24:00"),
    comment: "",
};

const data: MoodObject[] = [
    {
        id: "1",
        mood: 1,
        date: new Date("December 10, 2020 03:24:00"),
        comment: "Slept all day",
    },
    moodObjectToSearch,
];

describe("MoodHistory", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let store: any;
    const mockStore = configureStore();

    beforeEach(() => {
        store = mockStore({ moods: data });
        jest.spyOn(store, "dispatch");
    });

    it("should generate action on click", () => {
        const history = mount(
            <Provider store={store}>
                <MoodHistory moodList={store.getState().moods} />
            </Provider>
        );

        expect(history.find(AddNewMoodButton).length).toEqual(1);
        expect(history.find(Modal).length).toEqual(1);
        expect(history.find(MoodView).length).toEqual(2);
    });

    it("getMoodObjectToEdit_forNewMood", () => {
        expect(getMoodObjectToEdit(data)).toEqual(null);
    });

    it("getMoodObjectToEdit_forEditMood_success", () => {
        expect(getMoodObjectToEdit(data, "2")).toEqual(moodObjectToSearch);
    });

    it("getMoodObjectToEdit_forEditMood_fail", () => {
        expect(getMoodObjectToEdit(data, "3")).toEqual(null);
    });
});
