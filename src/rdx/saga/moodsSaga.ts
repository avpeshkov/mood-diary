import { takeEvery, call, take } from "redux-saga/effects";

import { moodsActions } from "rdx/reducer/moodsSlice";
import { MoodObject } from "types/mood";

const setMoodsLocalStorage = async (moodList: MoodObject[]) => {
    await localStorage.setItem("moodList", JSON.stringify(moodList));
};

export function* setMoods({ payload }: ReturnType<typeof moodsActions.setMoods>) {
    if (payload && payload.length > 0) {
        yield call(setMoodsLocalStorage, payload);
    }
}

const addMoodToLocalStorage = async (moodObject: MoodObject) => {
    const moodList: MoodObject[] = JSON.parse((await localStorage.getItem("moodList")) || "[]");
    moodList.push(moodObject);
    await localStorage.setItem("moodList", JSON.stringify(moodList));
};

export function* addMood({ payload }: ReturnType<typeof moodsActions.addMood>) {
    if (payload) {
        yield call(addMoodToLocalStorage, payload);
    }
}

const updateMoodInLocalStorage = async (moodObject: MoodObject) => {
    let moodList: MoodObject[] = JSON.parse((await localStorage.getItem("moodList")) || "[]");
    moodList = moodList.filter((mood: MoodObject) => mood.id !== moodObject.id);
    moodList.push(moodObject);
    await localStorage.setItem("moodList", JSON.stringify(moodList));
};

export function* updateMood({ payload }: ReturnType<typeof moodsActions.updateMood>) {
    if (payload) {
        yield call(updateMoodInLocalStorage, payload);
    }
}

const deleteMoodFromLocalStorage = async (moodId: string) => {
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
