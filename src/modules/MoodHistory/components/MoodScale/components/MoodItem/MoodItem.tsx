import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { Mood } from "modules/MoodHistory/types";

const BaseCell = css`
    width: 25px;
    height: 25px;
    border: 1px solid;
    display: inline-block;
    border-radius: 15px;
    line-height: 25px;
    text-align: center;
    margin: 5px;
    vertical-align: bottom;
`;

const EmptyCell = css`
    border-color: black;
`;

const filledCell = (mood: Mood) => {
    return css`
        border-color: ${MoodColorMap[mood]};
        background-color: ${MoodColorMap[mood]};
        color: gray;
    `;
};

interface Props {
    isFilled: boolean;
    mood: Mood;
}

export const MoodItem = styled.button`
    ${BaseCell};
    ${({ isFilled, mood }: Props) => (isFilled ? filledCell(mood) : EmptyCell)};
`;

export const MoodColorMap: { [key in Mood]: string } = {
    1: "#17325a",
    2: "#7223b9",
    3: "#6978dd",
    4: "#5ecacc",
    5: "#a8d765",
    6: "#f8ea55",
    7: "#f8b94f",
    8: "#ea863f",
    9: "#f86959",
    10: "#e2200c",
};
