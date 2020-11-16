import React from "react";
import styled from "@emotion/styled";
import { Mood } from "../MoodScale/components/MoodItem";
import { MoodScale } from "../MoodScale";
import { MoodObject } from "types/mood";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";

interface MoodFormProps {
    moodObject: MoodObject | null;
    createUpdateMoodObject: (object: MoodObject) => void;
}

const MoodFormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-bottom: 2px solid lightgray;
    width: 500px;
`;

const FieldWrapper = styled.div`
    display: inline-flex;
    flex-direction: column;
    margin-bottom: 10px;
`;

const SaveButton = styled.button`
    display: inline-flex;
    background-color: darkgreen;
    border-radius: 5px;
    border: 0px;
    color: white;
    width: 70px;
    display: flex;
    align-items: center;
    font-size: 24px;
    align-self: flex-end;
`;

export const DateWrapper = styled.div`
    display: inline-flex;
    margin-bottom: 5px;
    font-weight: bold;
`;

// Комнпонент для редактирования/добавления основной модели прилоежния(Formik форма).

export const MoodForm: React.FC<MoodFormProps> = (props) => {
    const { moodObject } = props;
    const { createUpdateMoodObject } = props;
    const initialValues: MoodObject = moodObject ? moodObject : { date: new Date(), mood: 5, comment: "" };
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values: MoodObject, actions: FormikHelpers<MoodObject>) => {
                createUpdateMoodObject(values);
            }}
        >
            {(props: FormikProps<MoodObject>) => {
                const { values, setFieldValue } = props;
                return (
                    <Form>
                        <MoodFormWrapper>
                            <FieldWrapper>
                                <label htmlFor="date">Date</label>
                                <DatePicker
                                    selected={values.date}
                                    onChange={(date: Date) => {
                                        setFieldValue("date", date);
                                    }}
                                />
                            </FieldWrapper>
                            <FieldWrapper>
                                <label htmlFor="mood">Mood</label>
                                <MoodScale
                                    currentMood={values.mood}
                                    onMoodUpdate={(mood: Mood) => {
                                        setFieldValue("mood", mood);
                                    }}
                                />
                            </FieldWrapper>
                            <FieldWrapper>
                                <label htmlFor="comment">Comment</label>
                                <Field label="Comment" name="comment" component="textarea" />
                            </FieldWrapper>
                            <SaveButton type="submit">Save</SaveButton>
                        </MoodFormWrapper>
                    </Form>
                );
            }}
        </Formik>
    );
};
