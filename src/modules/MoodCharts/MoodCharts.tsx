import React from "react";
import { MoodObject } from "modules/MoodHistory/types";
import { Line } from "react-chartjs-2";
import { findLineByLeastSquares } from "utils/stat";
import styled from "@emotion/styled";

export const getTendencyResult = (tendency: number[]): string => {
    const tendencyFirst = tendency[0];
    const tendencyLast = tendency[tendency.length - 1];
    let tendencyResult = "";

    if (Math.round(tendencyFirst) === Math.round(tendencyLast)) {
        tendencyResult = "Your condition has been stable in the past two weeks. ";
        if (Math.round(tendencyFirst) >= 7) {
            tendencyResult = tendencyResult + "Condition is satisfactory, keep up, the good work.";
        } else {
            tendencyResult = tendencyResult + "This is not the best condition, maybe you should think about what you could improve in your life.";
        }
    } else if (tendencyFirst > tendencyLast) {
        tendencyResult = "Your condition has worsened in recent years, perhaps you should seek help from a psychologist";
    } else {
        tendencyResult = "Your condition has improved lately, keep it up, you can be proud of yourself.";
    }

    return tendencyResult;
};

interface MoodChartsProps {
    moodList: MoodObject[];
}

const TendencyResult = styled.span`
    font-size: 18px;
    padding-left: 12px;
`;

export const MoodCharts: React.FC<MoodChartsProps> = (props) => {
    const moods = props.moodList.reverse();
    if (moods.length < 4) {
        return <h2>Their is not enough history for graph</h2>;
    }
    const tendency: number[] = findLineByLeastSquares(moods.map((mood: MoodObject) => mood.mood));

    const data = {
        labels: moods.map((mood: MoodObject) => `${new Date(mood.date).getMonth() + 1}-${new Date(mood.date).getDate()}`),
        datasets: [
            {
                label: "Moods for last 2 weeks",
                data: moods.map((mood: MoodObject) => mood.mood),
                fill: false,
                backgroundColor: "rgb(36, 136, 67)",
                borderColor: "rgba(36, 136, 67, 0.2)",
            },
            {
                label: "Tendency",
                data: tendency,
                fill: false,
                backgroundColor: "rgb(24, 40, 161)",
                borderColor: "rgba(24, 40, 161, 0.2)",
            },
        ],
    };
    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    return (
        <>
            <Line data={data} options={options} />
            <TendencyResult> Tendency analysis: {getTendencyResult(tendency)}</TendencyResult>
        </>
    );
};
