import React from "react";
import styled from "@emotion/styled";
import { MoodItem, moods, Mood } from "./components/MoodItem";

interface MoodScaleProps {
    currentMood: Mood;
    onMoodUpdate: (currentMood: Mood) => void;
}

const MoodScaleWrapper = styled.div`
    display: inline-block;
    padding: 10px;
    border: 2px solid lightgray;
`;

export class MoodScale extends React.Component<MoodScaleProps> {
    render() {
        const { currentMood, onMoodUpdate } = this.props;
        return (
            <MoodScaleWrapper>
                {moods.map((mood: Mood) => (
                    <MoodItem key={mood} mood={mood} isFilled={mood <= currentMood} onClick={() => onMoodUpdate(mood)} />
                ))}
            </MoodScaleWrapper>
        );
    }
}
