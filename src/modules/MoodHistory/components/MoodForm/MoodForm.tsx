import React from "react";
import styled from "@emotion/styled";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { Mood, MoodObject, moods } from "modules/MoodHistory/types";
import { MoodScale } from "modules/MoodHistory/components/MoodScale";

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

const FooterButtonsWrapper = styled.div`
    display: inline-flex;
    flex-direction: row;
    justify-content: space-between;
`;

const SaveButton = styled.button`
    display: inline-flex;
    background-color: #6180da;
    border-radius: 5px;
    border: 0px;
    color: white;
    width: 70px;
    align-items: center;
    font-size: 24px;
    align-self: flex-end;
`;

const RestButton = styled.button`
    display: inline-flex;
    background-color: #555555;
    border-radius: 5px;
    border: 0;
    color: white;
    width: 80px;
    align-items: center;
    font-size: 24px;
    align-self: flex-end;
`;

/** Комнпонент для редактирования/добавления основной модели прилоежния(Formik форма). */
export const MoodForm: React.FC<MoodFormProps> = (props) => {
    const { moodObject, createUpdateMoodObject } = props;
    const initialValues: MoodObject = moodObject || {
        date: new Date().toString(),
        mood: moods[Math.floor(Math.random() * moods.length)], // задаем начальное значение рандомно
        comment: "",
    };
    return (
        <Formik initialValues={initialValues} onSubmit={(values: MoodObject, actions: FormikHelpers<MoodObject>) => createUpdateMoodObject(values)}>
            {({ values, setFieldValue, handleReset }: FormikProps<MoodObject>) => {
                return (
                    <Form>
                        <MoodFormWrapper>
                            <FieldWrapper>
                                <label htmlFor="date">Date</label>
                                <DatePicker
                                    selected={new Date(values.date)}
                                    onChange={(date: Date) => {
                                        setFieldValue("date", date.toString());
                                    }}
                                />
                            </FieldWrapper>
                            <FieldWrapper>
                                <label htmlFor="mood">Mood</label>
                                <MoodScale
                                    currentMood={values.mood}
                                    onMoodUpdate={(mood: Mood) => {
                                        setFieldValue("mood", Number(mood));
                                    }}
                                />
                            </FieldWrapper>
                            <FieldWrapper>
                                <label htmlFor="comment">Comment</label>
                                <Field label="Comment" name="comment" component="textarea" />
                            </FieldWrapper>
                            <FooterButtonsWrapper>
                                <RestButton onClick={handleReset}>Reset</RestButton>
                                <SaveButton type="submit">Save</SaveButton>
                            </FooterButtonsWrapper>
                        </MoodFormWrapper>
                    </Form>
                );
            }}
        </Formik>
    );
};
