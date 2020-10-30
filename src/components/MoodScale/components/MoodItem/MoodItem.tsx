import React, { FC } from "react";
import { MoodItemButton } from "./MoodItems";

export interface MoodProps {
    onClick: () => void;
    mood: number;
    isFilled: boolean;
}

export const MoodItem: FC<MoodProps> = ({ onClick, mood, isFilled }) => {
    return <MoodItemButton mood={mood} onClick={onClick} isFilled={isFilled} />;
};
