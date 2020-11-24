import { MoodObject, MoodObjectResponse } from "types/mood";
import axios, { AxiosResponse } from "axios";

export const MOOD_LIST_API = "http://localhost:3001/mood-list/";

export const getMoodList = (callBack: (moodList: MoodObject[]) => void) => {
    axios
        .get(MOOD_LIST_API)
        .then(({ data }: AxiosResponse<MoodObjectResponse[]>) => {
            const updatedData: MoodObject[] = data
                .map((moodObjectJson: MoodObjectResponse) => {
                    return { ...moodObjectJson, date: new Date(moodObjectJson.date) };
                })
                .sort((a: MoodObject, b: MoodObject) => a.date.getTime() - b.date.getTime()); // сортируем по дате
            callBack(updatedData);
            // this.setState({ moodList: updatedData, moodObjectToEdit: undefined });
        })
        .catch((error) => {
            console.log(error);
        });
};

export const postPatchMood = (moodObject: MoodObject, callBack: () => void) => {
    const method = moodObject.id ? axios.patch : axios.post;
    method(`${MOOD_LIST_API}${moodObject.id || ""}`, { ...moodObject, date: moodObject.date.toString() })
        .then(({ data }: AxiosResponse<MoodObjectResponse>) => {
            callBack();
        })
        .catch((error) => {
            console.log(error);
        });
};

export const deleteMood = (moodId: number, callBack: () => void) => {
    axios
        .delete(`${MOOD_LIST_API}${moodId}`)
        .then(({ data }: AxiosResponse<MoodObjectResponse>) => {
            callBack();
        })
        .catch((error) => {
            console.log(error);
        });
};
