import React from "react";
import { MoodObject } from "types/mood";
import { MoodForm } from "../MoodForm";
import styled from "@emotion/styled";
import { backEndFake } from "./MoodHistoryBackEndFake";
import { QuoteBlock } from "../QuoteBlock";

interface MoodHistoryState {
    moodList: Array<MoodObject>;
}

const MoodHistoryWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 550px;
    align-items: center;
`;

export class MoodHistory extends React.Component<{}, MoodHistoryState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            moodList: [],
        };
    }

    componentDidMount() {
        this.setState({ moodList: backEndFake.moodList });
    }

    render() {
        const { moodList } = this.state;
        return (
            <MoodHistoryWrapper>
                <QuoteBlock interval={10000} isAutoSwitchEnabled={true} />
                {moodList.map((item: MoodObject, index: number) => (
                    <MoodForm isViewMode={true} moodObject={item} key={index} />
                ))}
            </MoodHistoryWrapper>
        );
    }
}
