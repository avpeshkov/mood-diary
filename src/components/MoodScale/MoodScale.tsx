import React from "react";
import styled from "@emotion/styled";
import { MoodItem } from "./components/MoodItem";
import { moods, Mood } from "types/mood";

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

export class MoodScale extends React.Component<MoodScaleProps> {
    render() {
        const { currentMood, onMoodUpdate } = this.props;
        return (
            <MoodScaleWrapper>
                {moods.map((mood: Mood) => (
                    <MoodItem type="button" key={mood} mood={mood} isFilled={mood <= currentMood} onClick={onMoodUpdate && (() => onMoodUpdate(mood))} />
                ))}
            </MoodScaleWrapper>
        );
    }
}
