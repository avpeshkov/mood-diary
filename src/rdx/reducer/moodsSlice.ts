import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MoodObject } from "types/mood";
import { sortMoodsByDate } from "helpers/moods";

export type moodsSliceState = Array<MoodObject>;

const setMoods: CaseReducer<moodsSliceState, PayloadAction<moodsSliceState>> = (state, action) => sortMoodsByDate(action.payload);

const addMood: CaseReducer<moodsSliceState, PayloadAction<MoodObject>> = (state, action) => {
    if (!action.payload.id) {
        return state;
    }
    state.push(action.payload);
    return sortMoodsByDate(state);
};

const updateMood: CaseReducer<moodsSliceState, PayloadAction<MoodObject>> = (state, action) => {
    const moodToUpdate: MoodObject = action.payload;
    const index = state.findIndex((mood: MoodObject) => mood.id === moodToUpdate.id);
    if (index === -1) {
        return state;
    }
    state[index] = moodToUpdate;
    return sortMoodsByDate(state);
};

const deleteMood: CaseReducer<moodsSliceState, PayloadAction<number>> = (state, action) => {
    const moodIdToDelete: number = action.payload;
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
