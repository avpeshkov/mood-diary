export const moods = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
export type Mood = typeof moods[number];

export interface MoodObject {
    id?: string;
    mood: Mood;
    date: string;
    comment: string;
}

export interface MoodObjectResponse {
    id?: string;
    mood: Mood;
    date: string;
    comment: string;
}
