import { Mood } from "../components/MoodScale/components/MoodItem";

export interface MoodObject {
    id?: number;
    mood: Mood;
    date: Date;
    comment: string;
}
