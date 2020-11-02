import React from "react";
import styled from "@emotion/styled";
import { Mood } from "../MoodScale/components/MoodItem";
import { MoodScale } from "../MoodScale";

// тут у нас будет дата получаемая с бекенда, которая пока не понятно что где и как
const backEndData: { mood: Mood } = {
    mood: 5,
};

interface MoodFormState {
    mood: Mood;
}

const MoodFormWrapper = styled.div`
    display: inline-block;
    padding: 10px;
    border: 2px solid lightgray;
    height: 300px;
`;

export class MoodForm extends React.Component<{}, MoodFormState> {
    state: MoodFormState = {
        mood: 1,
    };

    componentDidMount() {
        this.setState({ mood: backEndData.mood });
    }

    onMoodUpdate = (currentMood: Mood): void => {
        this.setState({ mood: currentMood });
    };

    render() {
        const { mood } = this.state;
        return (
            <MoodFormWrapper>
                <MoodScale currentMood={mood} onMoodUpdate={this.onMoodUpdate} />
            </MoodFormWrapper>
        );
    }
}
