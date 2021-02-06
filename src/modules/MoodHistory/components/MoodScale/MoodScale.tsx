import React from "react";
import styled from "@emotion/styled";
import { MoodItem } from "./components/MoodItem";
import { Mood, moods } from "modules/MoodHistory/types";

interface MoodScaleProps {
    currentMood: Mood;
    onMoodUpdate?: (currentMood: Mood) => void;
}

const MoodScaleWrapper = styled.div`
    display: inline-block;
    padding: 10px;
    border: 2px solid lightgray;
    max-width: fit-content;
    width: fit-content;
`;

export const getOnClick = (onMoodUpdate?: (currentMood: Mood) => void) =>
    onMoodUpdate ? (event: React.MouseEvent<HTMLButtonElement>) => onMoodUpdate((event.currentTarget.getAttribute("value") as unknown) as Mood) : undefined;

export class MoodScale extends React.Component<MoodScaleProps> {
    render() {
        const { currentMood, onMoodUpdate } = this.props;
        const onClick = getOnClick(onMoodUpdate);
        return (
            <MoodScaleWrapper>
                {moods.map((mood: Mood) => (
                    <MoodItem type="button" key={mood} mood={mood} isFilled={mood <= currentMood} value={mood} onClick={onClick} />
                ))}
            </MoodScaleWrapper>
        );
    }
}
