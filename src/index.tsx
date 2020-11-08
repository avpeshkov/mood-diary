import React from "react";
import { render } from "react-dom";
import { MoodHistory } from "./components/MoodHistory";

render(<MoodHistory isActive={true} interval={10000} />, document.getElementById("root"));
