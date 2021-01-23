import { MoodObject } from "./types";
import firebase from "firebase";
import authHelpers from "utils/auth";
import firebaseApi from "utils/firebase";

const MOOD_LIST_PATH = "user-mood-list";

const { db } = firebaseApi;

/**
 *  Получаем список запись настроения
 */
function getMoodList(): Promise<firebase.database.DataSnapshot> {
    const userUid = authHelpers.getCurrentUserUid();
    return db.ref(`${MOOD_LIST_PATH}/${userUid}`).get();
}

/**
 *   Апдейтим/Создаем записи настроения
 */
const postPatchMood = (moodObject: MoodObject): Promise<firebase.database.DataSnapshot | undefined> => {
    const userUid = authHelpers.getCurrentUserUid();
    const updatedObject = { ...moodObject, date: moodObject.date.toString() };
    if (moodObject.id) {
        return db.ref(`${MOOD_LIST_PATH}/${userUid}/${moodObject.id}`).update(updatedObject);
    } else {
        return db.ref(`${MOOD_LIST_PATH}/${userUid}/`).push(updatedObject).get();
    }
};

/**
 *   Удаляем записи настроения настроения
 */
const deleteMood = (moodId: string): Promise<unknown> => {
    const userUid = authHelpers.getCurrentUserUid();
    return db.ref(`user-mood-list/${userUid}/${moodId}`).remove();
};

const MoodApi = {
    getMoodList,
    postPatchMood,
    deleteMood,
};

export default MoodApi;
