import React from "react";
import { MoodObject } from "modules/MoodHistory/types";
import { Line } from "react-chartjs-2";

interface MoodChartsProps {
    moodList: MoodObject[];
}

export const MoodCharts: React.FC<MoodChartsProps> = (props) => {
    const moods = props.moodList.reverse();
    if (moods.length < 4) {
        return <h2>Their is not enough history for graph</h2>;
    }
    const data = {
        labels: moods.map((mood: MoodObject) => `${mood.date.getMonth()}-${mood.date.getDate()}`),
        datasets: [
            {
                label: "Moods for last 2 weeks",
                data: moods.map((mood: MoodObject) => mood.mood),
                fill: false,
                backgroundColor: "rgb(35, 145, 57)",
                borderColor: "rgba(35, 145, 57, 0.2)",
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

    return <Line data={data} options={options} />;
};
