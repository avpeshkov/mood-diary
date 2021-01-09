import { MoodObject } from "types/mood";

export function sortMoodsByDate(moods: Array<MoodObject>): Array<MoodObject> {
    return moods.sort((a: MoodObject, b: MoodObject) => b.date.getTime() - a.date.getTime());
}
