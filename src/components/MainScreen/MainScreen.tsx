import React from "react";
import styled from "@emotion/styled";
import { QuoteBlock } from "../QuoteBlock";
import { QUOTE_BLOCK_DEFAULT_INTERVAL } from "../QuoteBlock/consts";
import { MoodHistory } from "../MoodHistory";

const MainScreenWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    position: absolute;
    height: 100%;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif !important;
`;

const HistoryBlockWrapper = styled.div`
    display: inline-flex;
    border-right: 2px solid lightgray;
    margin-right: 10px;
    overflow: scroll;
`;

const RightBlockWrapper = styled.div`
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;
`;

const GraphBlockWrapper = styled.div`
    display: inline-flex;
    align-self: flex-start;
`;

const QuoteBlockWrapper = styled.div`
    display: inline-flex;
    align-self: flex-end;
`;

// главный компонент, каркас для странички
export const MainScreen: React.FC<{}> = (props) => {
    return (
        <MainScreenWrapper>
            <HistoryBlockWrapper>
                <MoodHistory />
            </HistoryBlockWrapper>
            <RightBlockWrapper>
                <GraphBlockWrapper>
                    <h2>Here will be cool graph</h2>
                </GraphBlockWrapper>
                <QuoteBlockWrapper>
                    <QuoteBlock interval={QUOTE_BLOCK_DEFAULT_INTERVAL} isAutoSwitchEnabled={true} />
                </QuoteBlockWrapper>
            </RightBlockWrapper>
        </MainScreenWrapper>
    );
};
