import React from "react";
import { Mood, MoodObject, moods } from "modules/MoodHistory/types";
import { Pie } from "react-chartjs-2";
import "react-datepicker/dist/react-datepicker.css";
import { MoodColorMap } from "modules/MoodHistory/components/MoodScale";

interface MoodChartsProps {
    moodList: MoodObject[];
}

export const PieChart: React.FC<MoodChartsProps> = (props) => {
    const { moodList } = props;
    if (moodList.length < 4) {
        return <h2>Their is not enough history for chart</h2>;
    }
    const moodsValues = moodList.map((mood: MoodObject) => mood.mood);
    const data = {
        labels: moods,
        datasets: [
            {
                data: moods.map((mood: number) => moodsValues.filter((x) => x === mood).length),
                backgroundColor: moods.map((mood: number) => MoodColorMap[mood as Mood]),
                borderColor: moods.map((mood: number) => MoodColorMap[mood as Mood]),
                borderWidth: 1,
            },
        ],
    };

    return <Pie data={data} />;
};
