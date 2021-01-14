import { MoodObject } from "./types";
import { clone } from "ramda";

export function sortMoodsByDate(moods: MoodObject[]): MoodObject[] {
    return clone(moods).sort((a: MoodObject, b: MoodObject) => b.date.getTime() - a.date.getTime());
}
