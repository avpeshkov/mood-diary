import React from "react";
import styled from "@emotion/styled";
import "react-datepicker/dist/react-datepicker.css";
import { css } from "@emotion/core";
import { MoodScale } from "modules/MoodHistory/components/MoodScale";
import { MoodObject } from "modules/MoodHistory/types";

interface MoodViewProps {
    moodObject: MoodObject;
    editMoodObject?: (moodId: string) => void;
    deleteMoodObject?: (moodId: string) => void;
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

/** Комнпонент для обображения/редактирования основной модели прилоежния. */
export const MoodView: React.FC<MoodViewProps> = (props: MoodViewProps) => {
    const { moodObject, editMoodObject, deleteMoodObject } = props;

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
            {moodObject.id && (
                <MoodEditButtonsWrapper>
                    {editMoodObject && (
                        <ActionButton data-test-id="edit-mood-btn" onClick={() => editMoodObject(moodObject.id!)}>
                            Edit
                        </ActionButton>
                    )}
                    {deleteMoodObject && (
                        <ActionButton data-test-id="delete-mood-btn" onClick={() => deleteMoodObject(moodObject.id!)} backgroundColor="red">
                            Delete
                        </ActionButton>
                    )}
                </MoodEditButtonsWrapper>
            )}
        </MoodViewWrapper>
    );
};
