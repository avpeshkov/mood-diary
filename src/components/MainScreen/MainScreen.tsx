import React from "react";
import styled from "@emotion/styled";
import { QuoteBlock } from "../QuoteBlock";
import { QUOTE_BLOCK_DEFAULT_INTERVAL } from "../QuoteBlock/consts";
import { MoodHistory } from "../MoodHistory";

const MainScreenWrapper = styled.div`
    display: flex;
    width: 99%;
    max-width: 99%;
    flex-direction: column;
    position: absolute;
    height: 99%;
    max-height: 99%;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif !important;
    overflow: hidden;
`;
const MainScreenHeader = styled.h1`
    display: inline-flex;
    align-self: center;
    height: 3%;
`;

const MainScreenDataWrapper = styled.div`
    display: inline-flex;
    width: 100%;
    flex-direction: row;
    height: 95%;
    overflow-x: hidden;
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
// реализует патер Layout component
// этот компонент и является шаблоном приложения
export class MainScreen extends React.Component<{}> {
    shouldComponentUpdate(): boolean {
        return false;
    }

    render() {
        return (
            <MainScreenWrapper>
                <MainScreenHeader>Mood diary</MainScreenHeader>
                <MainScreenDataWrapper>
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
                </MainScreenDataWrapper>
            </MainScreenWrapper>
        );
    }
}
