import { MoodObject } from "types/mood";
import { db } from "services/firebase";
import { getCurrentUserUid } from "helpers/auth";
import firebase from "firebase";

const MOOD_LIST_PATH = "user-mood-list";

function getMoodList(): Promise<firebase.database.DataSnapshot> {
    const userUid = getCurrentUserUid();
    return db.ref(`${MOOD_LIST_PATH}/${userUid}`).get();
}

const postPatchMood = (moodObject: MoodObject): Promise<unknown> => {
    const userUid = getCurrentUserUid();
    const updatedObject = { ...moodObject, date: moodObject.date.toString() };
    if (moodObject.id) {
        return db.ref(`${MOOD_LIST_PATH}/${userUid}/${moodObject.id}`).update(updatedObject);
    } else {
        return (db.ref(`${MOOD_LIST_PATH}/${userUid}/`).push(updatedObject) as unknown) as Promise<unknown>;
    }
};

const deleteMood = (moodId: number): Promise<unknown> => {
    const userUid = getCurrentUserUid();
    return db.ref(`user-mood-list/${userUid}/${moodId}`).remove();
};

const MoodApi = {
    getMoodList,
    postPatchMood,
    deleteMood,
};

export default MoodApi;
