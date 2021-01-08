import { MoodObject } from "types/mood";
import firebaseApi from "services/firebase";
import authHelpers from "helpers/auth";
import firebase from "firebase";

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
const postPatchMood = (moodObject: MoodObject): Promise<unknown> => {
    const userUid = authHelpers.getCurrentUserUid();
    const updatedObject = { ...moodObject, date: moodObject.date.toString() };
    if (moodObject.id) {
        return db.ref(`${MOOD_LIST_PATH}/${userUid}/${moodObject.id}`).update(updatedObject);
    } else {
        return (db.ref(`${MOOD_LIST_PATH}/${userUid}/`).push(updatedObject) as unknown) as Promise<unknown>;
    }
};

/**
 *   Удаляем записи настроения настроения
 */
const deleteMood = (moodId: number): Promise<unknown> => {
    const userUid = authHelpers.getCurrentUserUid();
    return db.ref(`user-mood-list/${userUid}/${moodId}`).remove();
};

const MoodApi = {
    getMoodList,
    postPatchMood,
    deleteMood,
};

export default MoodApi;
