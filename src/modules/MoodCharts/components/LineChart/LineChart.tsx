import React from "react";
import { MoodObject } from "modules/MoodHistory/types";
import { Line } from "react-chartjs-2";
import "react-datepicker/dist/react-datepicker.css";

interface MoodChartsProps {
    moodList: MoodObject[];
    tendency: number[];
    label: string;
}

export const LineChart: React.FC<MoodChartsProps> = (props) => {
    const { moodList, label, tendency } = props;
    if (moodList.length < 4) {
        return <h2>Their is not enough history for graph</h2>;
    }
    const data = {
        labels: moodList.map((mood: MoodObject) => `${new Date(mood.date).getMonth() + 1}-${new Date(mood.date).getDate()}`),
        datasets: [
            {
                label: label,
                data: moodList.map((mood: MoodObject) => mood.mood),
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
                        autoSkip: true,
                    },
                },
            ],
            xAxes: [
                {
                    ticks: {
                        autoSkip: true,
                    },
                },
            ],
        },
    };

    return <Line data={data} options={options} />;
};
