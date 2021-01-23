import { takeEvery, call, take } from "redux-saga/effects";

import { moodsActions } from "./slice";
import { MoodObject } from "./types";
import { isEmpty } from "ramda";

export const setMoodsLocalStorage = async (moodList: MoodObject[]) => {
    await localStorage.setItem("moodList", JSON.stringify(moodList));
};

export function* setMoods({ payload }: ReturnType<typeof moodsActions.setMoods>) {
    if (!isEmpty(payload)) {
        yield call(setMoodsLocalStorage, payload);
    }
}

export const addMoodToLocalStorage = async (moodObject: MoodObject) => {
    const moodList: MoodObject[] = JSON.parse((await localStorage.getItem("moodList")) || "[]");
    moodList.push(moodObject);
    await localStorage.setItem("moodList", JSON.stringify(moodList));
};

export function* addMood({ payload }: ReturnType<typeof moodsActions.addMood>) {
    if (!isEmpty(payload)) {
        yield call(addMoodToLocalStorage, payload);
    }
}

export const updateMoodInLocalStorage = async (moodObject: MoodObject) => {
    let moodList: MoodObject[] = JSON.parse((await localStorage.getItem("moodList")) || "[]");
    moodList = moodList.filter((mood: MoodObject) => mood.id !== moodObject.id);
    moodList.push(moodObject);
    await localStorage.setItem("moodList", JSON.stringify(moodList));
};

export function* updateMood({ payload }: ReturnType<typeof moodsActions.updateMood>) {
    if (!isEmpty(payload)) {
        yield call(updateMoodInLocalStorage, payload);
    }
}

export const deleteMoodFromLocalStorage = async (moodId: string) => {
    let moodList: MoodObject[] = JSON.parse((await localStorage.getItem("moodList")) || "[]");
    moodList = moodList.filter((mood: MoodObject) => mood.id !== moodId);
    await localStorage.setItem("moodList", JSON.stringify(moodList));
};

export function* deleteMood({ payload }: ReturnType<typeof moodsActions.deleteMood>) {
    if (payload) {
        yield call(deleteMoodFromLocalStorage, payload);
    }
}

export function* moodsSaga() {
    yield takeEvery(moodsActions.setMoods.type, setMoods);
    yield takeEvery(moodsActions.addMood.type, addMood);
    yield takeEvery(moodsActions.updateMood.type, updateMood);
    yield takeEvery(moodsActions.deleteMood.type, deleteMood);
}
