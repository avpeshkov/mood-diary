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
import { Mood, MoodObject } from "./types";
import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import firebase from "firebase";
import MoodApi from "modules/MoodHistory/api";
import * as faker from "faker";

const { random, date, lorem } = faker;
jest.mock("modules/MoodHistory/api");

describe("Moods saga", () => {
    const moodToDeleteId = random.uuid();
    const moodToUpdateId = random.uuid();
    const moodList: moodsSliceState = [
        {
            id: moodToDeleteId,
            mood: random.number(10) as Mood,
            date: date.soon(),
            comment: lorem.sentence(),
        },
        {
            id: moodToUpdateId,
            mood: random.number(10) as Mood,
            date: date.recent(),
            comment: lorem.sentence(),
        },
    ];
    const newMoodId = random.uuid();
    const newMood: MoodObject = {
        mood: random.number(10) as Mood,
        date: date.future(),
        comment: lorem.sentence(),
    };

    const moodToUpdate: MoodObject = {
        id: moodToUpdateId,
        mood: random.number(10) as Mood,
        date: date.future(),
        comment: lorem.sentence(),
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
            .provide([[matchers.call.fn(createUpdateMoodObject), { id: newMoodId, ...newMood }]])
            .put(moodsActions.addMood({ id: newMoodId, ...newMood }))
            .hasFinalState([{ id: newMoodId, ...newMood }])
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
            payload: moodToDeleteId,
        })
            .withReducer(moodsReducer)
            .withState(moodList)
            .provide([[matchers.call.fn(deleteMoodObject), moodToDeleteId]])
            .put(moodsActions.deleteMood(moodToDeleteId))
            .hasFinalState([moodList[1]])
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
                    return { [moodToUpdateId]: moodToUpdate };
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
