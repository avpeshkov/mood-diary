import { moodsActions, moodsReducer, moodsSliceState } from "rdx/reducer/moodsSlice";
import { MoodObject } from "types/mood";

describe("quotesSlice test", () => {
    const moodList: Array<MoodObject> = [
        {
            id: "1",
            comment: "ha ha",
            date: new Date("December 14, 2020 03:24:00"),
            mood: 6,
        },
        {
            id: "2",
            comment: "ha ha",
            date: new Date("December 10, 2020 03:24:00"),
            mood: 6,
        },
    ];
    const newMood: MoodObject = {
        id: "3",
        comment: "ha ha",
        date: new Date("December 15, 2020 03:24:00"),
        mood: 6,
    };

    const { addMood, deleteMood, setMoods, updateMood } = moodsActions;

    describe("actions", () => {
        it("setMoods_listOfMoodObjectsAs1stParam_createActionWithPayload", () => {
            const expectedAction = {
                type: setMoods.type,
                payload: moodList,
            };
            expect(setMoods(moodList)).toEqual(expectedAction);
        });
        it("addMood_moodObjectAs1stParam_createActionWithPayload", () => {
            const expectedAction = {
                type: addMood.type,
                payload: newMood,
            };
            expect(addMood(newMood)).toEqual(expectedAction);
        });
        it("updateMood_moodObjectAs1stParam_createActionWithPayload", () => {
            const expectedAction = {
                type: updateMood.type,
                payload: newMood,
            };
            expect(updateMood(newMood)).toEqual(expectedAction);
        });
        it("deleteMood_numberAs1stParam_createActionWithPayload", () => {
            const expectedAction = {
                type: deleteMood.type,
                payload: newMood.id,
            };
            expect(deleteMood(newMood.id!)).toEqual(expectedAction);
        });
    });

    describe("reducers", () => {
        it("moodsReducer_setMoodsActionAs2stParam_setListObjectToStore", () => {
            const initialState: moodsSliceState = [];
            const action = setMoods(moodList);
            const state = moodsReducer(initialState, action);
            expect(state).toEqual(moodList);
        });

        it("moodsReducer_addMoodActionAs2stParam_addNewObjectToStore", () => {
            const initialState: moodsSliceState = moodList;
            const action = addMood(newMood);
            const updatedState: moodsSliceState = [newMood, ...initialState];
            const state = moodsReducer(initialState, action);
            expect(state).toEqual(updatedState);
        });

        it("moodsReducer_moodToUpdateActionAs2stParam_updateObjectInStore", () => {
            const initialState: moodsSliceState = moodList;
            const moodToUpdate: MoodObject = {
                id: "2",
                comment: "new comment",
                date: new Date("December 14, 2020 03:24:00"),
                mood: 8,
            };
            const action = updateMood(moodToUpdate);
            const state = moodsReducer(initialState, action);
            expect(state[1]).toEqual(moodToUpdate);
        });

        it("moodsReducer_deleteMoodActionAs2stParam_deleteObjectFromStore", () => {
            const initialState: moodsSliceState = moodList;
            const action = deleteMood("2");
            const state = moodsReducer(initialState, action);
            expect(state.length).toEqual(1);
            expect(state[0].id).toEqual("1");
        });
    });
});
