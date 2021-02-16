import React, { useState } from "react";
import { MoodObject } from "modules/MoodHistory/types";
import { findLineByLeastSquares } from "utils/stat";
import styled from "@emotion/styled";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { LineChart } from "./components/LineChart";
import { getTendencyResult } from "modules/MoodCharts/utils";

interface MoodChartsProps {
    moodList: MoodObject[];
}

const ResultAnaliseWrapper = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
`;
const TendencyResult = styled.span`
    font-size: 18px;
    padding-left: 12px;
`;

const DatePickerBlock = styled.div`
    display: inline-flex;
    flex-direction: row;
    justify-content: space-between;
`;

const DatePickerLabel = styled.label`
    margin-right: 10px;
`;

export const ResultAnalise: React.FC<MoodChartsProps> = (props) => {
    const [from, setFrom] = useState<Date>(new Date(Date.now() - 12096e5));
    const [to, setTo] = useState<Date>(new Date());

    const moods = props.moodList.filter((mood: MoodObject) => new Date(mood.date) > from && new Date(mood.date) < to).reverse();

    const tendency: number[] = findLineByLeastSquares(moods.map((mood: MoodObject) => mood.mood));

    return (
        <ResultAnaliseWrapper>
            <DatePickerBlock>
                <div>
                    <DatePickerLabel htmlFor="date">From</DatePickerLabel>
                    <DatePicker
                        selected={from}
                        onChange={(date: Date) => {
                            setFrom(date);
                        }}
                    />
                </div>
                <div>
                    <DatePickerLabel htmlFor="date">To</DatePickerLabel>
                    <DatePicker
                        selected={to}
                        onChange={(date: Date) => {
                            setTo(date);
                        }}
                    />
                </div>
            </DatePickerBlock>
            <LineChart moodList={moods} tendency={tendency} label={`Moods from: ${from.toDateString()}  to: ${to.toDateString()}`} />
            <TendencyResult> Tendency analysis: {getTendencyResult(tendency)}</TendencyResult>
        </ResultAnaliseWrapper>
    );
};
