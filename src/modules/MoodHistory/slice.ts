import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MoodObject } from "./types";
import { sortMoodsByDate } from "./utils";

export type moodsSliceState = MoodObject[];

const setMoods: CaseReducer<moodsSliceState, PayloadAction<moodsSliceState>> = (state, action) => sortMoodsByDate(action.payload);

const addMood: CaseReducer<moodsSliceState, PayloadAction<MoodObject>> = (state, action) => {
    if (!action.payload.id) {
        return state;
    }
    return sortMoodsByDate([...state, action.payload]);
};

const updateMood: CaseReducer<moodsSliceState, PayloadAction<MoodObject>> = (state, action) => {
    const moodToUpdate: MoodObject = action.payload;
    const index = state.findIndex((mood: MoodObject) => mood.id === moodToUpdate.id);
    if (index === -1) {
        return state;
    }
    return sortMoodsByDate([...state.slice(0, index), moodToUpdate, ...state.slice(index + 1)]);
};

const deleteMood: CaseReducer<moodsSliceState, PayloadAction<string>> = (state, action) => {
    const moodIdToDelete: string = action.payload;
    const index = state.findIndex((mood: MoodObject) => mood.id === moodIdToDelete);
    if (index === -1) {
        return state;
    }
    state.splice(index, 1);
    return state;
};

const moodsSlice = createSlice({
    name: "moods",
    initialState: [] as moodsSliceState,
    reducers: {
        setMoods,
        addMood,
        updateMood,
        deleteMood,
    },
});

export const moodsActions = moodsSlice.actions;
export const moodsReducer = moodsSlice.reducer;
