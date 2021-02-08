import { MoodObject } from "./types";
import { clone } from "ramda";

export function sortMoodsByDate(moods: MoodObject[]): MoodObject[] {
    return clone(moods).sort((a: MoodObject, b: MoodObject) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
