import React from "react";
import styled from "@emotion/styled";
import { MoodItem } from "./components/MoodItem";
import { Moods } from "./components/MoodItem/MoodItems";

interface MoodScaleProps {
    currentMood: number;
    onMoodUpdate: (currentMood: number) => void;
}

interface MoodScaleState {
    currentMood: number;
}

const MoodScaleWrapper = styled.div`
    display: inline-block;
    padding: 10px;
    border: 2px solid lightgray;
`;

export class MoodScale extends React.Component<MoodScaleProps, MoodScaleState> {
    constructor(props: MoodScaleProps) {
        super(props);
        this.state = {
            currentMood: 0,
        };
    }

    componentDidMount() {
        this.setState({ currentMood: this.props.currentMood });
    }

    onMoodChange = (currentMood: number) => {
        this.setState({ currentMood }, () => {
            this.props.onMoodUpdate(currentMood);
        });
    };

    render() {
        return (
            <MoodScaleWrapper>
                {Moods.map((mood: number) => (
                    <MoodItem key={mood} mood={mood} isFilled={mood <= this.state.currentMood} onClick={this.onMoodChange.bind(this, mood)} />
                ))}
            </MoodScaleWrapper>
        );
    }
}
