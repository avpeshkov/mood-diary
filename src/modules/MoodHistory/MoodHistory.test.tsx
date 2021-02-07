import { mount } from "enzyme";
import React from "react";
import { MoodHistory, AddNewMoodButton, getMoodObjectToEdit } from "./MoodHistory";
import Modal from "react-modal";
import { Mood, MoodObject } from "./types";
import { Provider } from "react-redux";
import { MoodView } from "modules/MoodHistory/components/MoodView";
import configureStore from "redux-mock-store";
import { random, date, lorem } from "faker";

const moodObjectToSearchID = random.uuid();
const moodObjectToSearch: MoodObject = {
    id: moodObjectToSearchID,
    mood: random.number(10) as Mood,
    date: date.future().toString(),
    comment: lorem.sentence(),
};

const data: MoodObject[] = [
    {
        id: random.uuid(),
        mood: random.number(10) as Mood,
        date: date.recent().toString(),
        comment: lorem.sentence(),
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

    it("MoodHistory generate", () => {
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
        expect(getMoodObjectToEdit(data, moodObjectToSearchID)).toEqual(moodObjectToSearch);
    });

    it("getMoodObjectToEdit_forEditMood_fail", () => {
        expect(getMoodObjectToEdit(data, random.uuid())).toEqual(null);
    });
});
