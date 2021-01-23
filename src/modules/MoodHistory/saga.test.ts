import { moodsActions, moodsReducer, moodsSliceState } from "./slice";
import {
    addMoodRequestSaga,
    createUpdateMoodObject,
    deleteMoodObject,
    deleteMoodRequestSaga,
    getMoodsList,
    loadMoodsSaga,
    updateMoodRequestSaga,
} from "./saga";
import { MoodObject } from "./types";
import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import firebase from "firebase";
import MoodApi from "modules/MoodHistory/api";

jest.mock("firebase/app");
jest.mock("modules/MoodHistory/api");

describe("Moods saga", () => {
    const moodList: moodsSliceState = [
        {
            id: "2",
            mood: 5,
            date: new Date("December 10, 2020 03:24:00"),
            comment: "Slept all day",
        },
        {
            id: "1",
            mood: 6,
            date: new Date("December 9, 2020 03:24:00"),
            comment: "Slept all day",
        },
    ];
    const newMood: MoodObject = {
        mood: 1,
        date: new Date("December 11, 2020 03:24:00"),
        comment: "Slept all day",
    };

    const moodToUpdate: MoodObject = {
        id: "4",
        mood: 1,
        date: new Date("December 20, 2020 03:24:00"),
        comment: "Slept all day",
    };

    it("loadMoodsSaga__successBackEndCallPutSetMoodsAction", () => {
        return expectSaga(loadMoodsSaga)
            .withReducer(moodsReducer)
            .provide([[matchers.call.fn(getMoodsList), moodList]])
            .put(moodsActions.setMoods(moodList))
            .hasFinalState(moodList)
            .run();
    });

    it("loadMoodsSaga__failBackEndCallKeepCurrentState", () => {
        return expectSaga(loadMoodsSaga)
            .withReducer(moodsReducer)
            .provide([[matchers.call.fn(getMoodsList), []]])
            .hasFinalState([])
            .run();
    });

    it("addMoodRequestSaga__success", () => {
        return expectSaga(addMoodRequestSaga, {
            type: moodsActions.addMoodRequest.type,
            payload: newMood,
        })
            .withReducer(moodsReducer)
            .provide([[matchers.call.fn(createUpdateMoodObject), { id: "3", ...newMood }]])
            .put(moodsActions.addMood({ id: "3", ...newMood }))
            .hasFinalState([{ id: "3", ...newMood }])
            .run();
    });

    it("addMoodRequestSaga__fail", () => {
        return expectSaga(addMoodRequestSaga, {
            type: moodsActions.addMoodRequest.type,
            payload: newMood,
        })
            .withReducer(moodsReducer)
            .provide([[matchers.call.fn(createUpdateMoodObject), null]])
            .hasFinalState([])
            .run();
    });

    it("updateMoodRequestSaga__success", () => {
        const updatedMood: MoodObject = { ...moodToUpdate, mood: 10 };
        return expectSaga(updateMoodRequestSaga, {
            type: moodsActions.updateMoodRequest.type,
            payload: newMood,
        })
            .withReducer(moodsReducer)
            .withState([moodToUpdate, ...moodList])
            .provide([[matchers.call.fn(createUpdateMoodObject), updatedMood]])
            .put(moodsActions.updateMood(updatedMood))
            .hasFinalState([updatedMood, ...moodList])
            .run();
    });

    it("updateMoodRequestSaga__fail", () => {
        const updatedMood: MoodObject = (null as unknown) as MoodObject;
        return expectSaga(updateMoodRequestSaga, {
            type: moodsActions.updateMoodRequest.type,
            payload: newMood,
        })
            .withReducer(moodsReducer)
            .withState([moodToUpdate, ...moodList])
            .provide([[matchers.call.fn(createUpdateMoodObject), updatedMood]])
            .hasFinalState([moodToUpdate, ...moodList])
            .run();
    });

    it("deleteMoodRequestSaga__success", () => {
        return expectSaga(deleteMoodRequestSaga, {
            type: moodsActions.deleteMoodRequest.type,
            payload: "1",
        })
            .withReducer(moodsReducer)
            .withState(moodList)
            .provide([[matchers.call.fn(deleteMoodObject), "1"]])
            .put(moodsActions.deleteMood("1"))
            .hasFinalState([moodList[0]])
            .run();
    });

    it("deleteMoodRequestSaga__fail", () => {
        return expectSaga(deleteMoodRequestSaga, {
            type: moodsActions.deleteMoodRequest.type,
            payload: "1",
        })
            .withReducer(moodsReducer)
            .withState(moodList)
            .provide([[matchers.call.fn(deleteMoodObject), null]])
            .hasFinalState(moodList)
            .run();
    });

    it("getMoodsList__success", async () => {
        jest.spyOn(MoodApi, "getMoodsList").mockImplementation(() => {
            return Promise.resolve({
                val: () => {
                    return { "4": moodToUpdate };
                },
            } as firebase.database.DataSnapshot);
        });

        expect(await getMoodsList()).toEqual([moodToUpdate]);
    });

    it("getMoodsList__fail", async () => {
        jest.spyOn(MoodApi, "getMoodsList").mockImplementation(() => {
            return Promise.resolve({
                val: () => {
                    throw Error();
                    return [];
                },
            } as firebase.database.DataSnapshot);
        });

        expect(await getMoodsList()).toEqual([]);

        jest.spyOn(MoodApi, "getMoodsList").mockImplementation(() => {
            return Promise.resolve({} as firebase.database.DataSnapshot);
        });

        expect(await getMoodsList()).toEqual([]);
    });
});
