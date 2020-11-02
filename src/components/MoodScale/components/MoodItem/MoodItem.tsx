import styled from "@emotion/styled";
import { css } from "@emotion/core";

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

export const moods = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

export type Mood = typeof moods[number];

export const MoodColorMap: { [key in Mood]: string } = {
    1: "#372d21",
    2: "#606f4e",
    3: "#6978dd",
    4: "#5ecacc",
    5: "#a8d765",
    6: "#f8ea55",
    7: "#f8b94f",
    8: "#f46a3b",
    9: "#f86959",
    10: "#D60567",
};
