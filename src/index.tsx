import React from "react";
import { render } from "react-dom";
import { MoodScale } from "./components";

render(
    <MoodScale
        currentMood={5}
        onMoodUpdate={(mood: number) => {
            console.log(mood);
        }}
    />,
    document.getElementById("root")
);
