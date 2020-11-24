import React from "react";
import styled from "@emotion/styled";
import { MoodScale } from "../MoodScale";
import { MoodObject } from "types/mood";
import "react-datepicker/dist/react-datepicker.css";
import { css } from "@emotion/core";

interface MoodViewProps {
    moodObject: MoodObject;
    updateMoodObject?: (moodId: number, action: "edit" | "delete") => void;
}

const MoodViewWrapper = styled.div`
    display: flex;
    flex-direction: row;
    padding-bottom: 10px;
    padding-top: 10px;
    width: 500px;
    border-bottom: 2px solid lightgray;
    justify-content: space-between;
`;

const MoodContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin-right: 10px;
`;

const MoodEditButtonsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const ViewWrapper = styled.div`
    display: inline-flex;
    flex-direction: row;
    margin-bottom: 10px;
`;

export const DateWrapper = styled.div`
    display: inline-flex;
    margin-bottom: 5px;
    font-weight: bold;
`;
const ActionButton = styled.button`
    display: inline-flex;
    background-color: darkgreen;
    border-radius: 5px;
    border: 0;
    color: white;
    width: fit-content;
    align-items: center;
    align-self: flex-end;
    text-align: center;
    ${(props: { backgroundColor?: string }) =>
        props.backgroundColor &&
        css`
            background-color: ${props.backgroundColor};
        `}
`;

// Комнпонент для обображения/редактирования основной модели прилоежния.

export const MoodView: React.FC<MoodViewProps> = (props: MoodViewProps) => {
    const { moodObject, updateMoodObject } = props;

    return (
        <MoodViewWrapper>
            <MoodContentWrapper>
                <ViewWrapper>
                    <label>Date: </label>
                    <DateWrapper> {moodObject.date.toDateString()}</DateWrapper>
                </ViewWrapper>
                <MoodScale currentMood={moodObject.mood} />
                {moodObject.comment && (
                    <>
                        <label>Comment:</label>
                        <span id="comment">{moodObject.comment}</span>
                    </>
                )}
            </MoodContentWrapper>
            {moodObject.id && updateMoodObject && (
                <MoodEditButtonsWrapper>
                    <ActionButton onClick={() => updateMoodObject(moodObject.id!, "edit")}>Edit</ActionButton>
                    <ActionButton onClick={() => updateMoodObject(moodObject.id!, "delete")} backgroundColor="red">
                        Delete
                    </ActionButton>
                </MoodEditButtonsWrapper>
            )}
        </MoodViewWrapper>
    );
};
