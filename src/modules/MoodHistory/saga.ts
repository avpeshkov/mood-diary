import { takeEvery, call, take, put, apply } from "redux-saga/effects";

import { moodsActions } from "./slice";
import { MoodObject, MoodObjectResponse } from "./types";
import { isEmpty } from "ramda";
import MoodApi from "modules/MoodHistory/api";
import firebase from "firebase";

export const getMoodsList = async () => {
    try {
        const snapshot = await MoodApi.getMoodList();
        if (!snapshot.val) return [];
        const moodList: MoodObject[] = [];
        snapshot.forEach((snap) => {
            const val: MoodObjectResponse = snap.val();
            moodList.push({ ...val, id: snap.key as string, date: new Date(val.date) });
        });
        return moodList;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export function* loadMoodsSaga() {
    const moodList: MoodObject[] = yield call(getMoodsList);
    if (!isEmpty(moodList)) {
        yield put(moodsActions.setMoods(moodList));
    }
}

export const createUpdateMoodObject = async (moodObject: MoodObject) => {
    try {
        const moodResponse: firebase.database.DataSnapshot | undefined = await MoodApi.postPatchMood(moodObject);
        return moodResponse ? { ...moodObject, id: moodResponse.key as string } : moodObject;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export function* addMoodRequestSaga({ payload }: ReturnType<typeof moodsActions.addMood>) {
    const mood: MoodObject = yield call(createUpdateMoodObject, payload);

    if (!isEmpty(mood)) {
        yield put(moodsActions.addMood(mood));
    }
}

export function* updateMoodRequestSaga({ payload }: ReturnType<typeof moodsActions.updateMood>) {
    const mood: MoodObject = yield call(createUpdateMoodObject, payload);

    if (!isEmpty(mood)) {
        yield put(moodsActions.updateMood(mood));
    }
}

export const deleteMoodObject = async (moodId: string) => {
    try {
        const result = await MoodApi.deleteMood(moodId);
        if (result === undefined) {
            return moodId;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

export function* deleteMoodRequestSaga({ payload }: ReturnType<typeof moodsActions.deleteMood>) {
    const moodIdToDelete: string = yield call(deleteMoodObject, payload);

    if (moodIdToDelete) {
        yield put(moodsActions.deleteMood(moodIdToDelete));
    }
}

export function* moodsSaga() {
    yield takeEvery(moodsActions.loadMoods.type, loadMoodsSaga);
    yield takeEvery(moodsActions.addMoodRequest.type, addMoodRequestSaga);
    yield takeEvery(moodsActions.updateMoodRequest.type, updateMoodRequestSaga);
    yield takeEvery(moodsActions.deleteMoodRequest.type, deleteMoodRequestSaga);
}
