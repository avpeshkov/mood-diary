import React from "react";
import styled from "@emotion/styled";
import { Mood } from "../MoodScale/components/MoodItem";
import { MoodScale } from "../MoodScale";
import { MoodObject } from "types/mood";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface MoodFormProps {
    isViewMode?: boolean;
    moodObject?: MoodObject;
}

type MoodFormState = MoodObject;

const MoodFormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-bottom: 2px solid lightgray;
    height: 100px;
    width: 500px;
`;

export const DateWrapper = styled.div`
    display: inline-flex;
    margin-bottom: 5px;
    font-weight: bold;
`;

// в следующем домашнем задании этот компонент будет переписан на формы сейчас в нем конечно есть несколько недостатков.
export class MoodForm extends React.Component<MoodFormProps, MoodFormState> {
    state: MoodFormState = {
        mood: 1,
        date: new Date(),
    };

    componentDidMount() {
        const { moodObject } = this.props;
        if (moodObject) {
            this.setState({ mood: moodObject.mood, date: moodObject.date });
        }
    }

    onMoodUpdate = (currentMood: Mood): void => {
        this.setState({ mood: currentMood });
    };

    onDateUpdate = (currentDate: Date): void => {
        this.setState({ date: currentDate });
    };

    render() {
        const { mood, date } = this.state;
        const { isViewMode } = this.props;
        return (
            <MoodFormWrapper>
                <DateWrapper> {isViewMode ? date.toDateString() : <DatePicker selected={date} onChange={this.onDateUpdate} />}</DateWrapper>
                <MoodScale currentMood={mood} onMoodUpdate={isViewMode ? undefined : this.onMoodUpdate} />
            </MoodFormWrapper>
        );
    }
}
