import React from "react";
import styled from "@emotion/styled";
import { QuoteBlock } from "components/QuoteBlock";
import { MoodHistory } from "components/MoodHistory";
import { QUOTE_BLOCK_DEFAULT_INTERVAL } from "components/QuoteBlock/consts";
import { PageWrapper } from "components/Wrapper";
import { QuoteObject } from "types/quote";
import QuoteApi from "api/quote";
import { MoodObject, MoodObjectResponse } from "types/mood";
import MoodApi from "api/mood";

const MainScreenWrapper = styled.div`
    display: flex;
    width: 99%;
    max-width: 99%;
    flex-direction: column;
    position: absolute;
    max-height: 99%;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif !important;
    overflow: hidden;
    height: inherit;
`;

const MainScreenDataWrapper = styled.div`
    display: inline-flex;
    width: 100%;
    flex-direction: row;
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

interface MainScreenState {
    quoteList: QuoteObject[];
    moodList: MoodObject[];
}

/**
  Главная страница, авторизованный пользователь всегда попадает на нее.
 */
class MainScreen extends React.Component<{}, MainScreenState> {
    state: MainScreenState = {
        quoteList: [],
        moodList: [],
    };

    componentDidMount() {
        this.updateMoodList();
        this.getQuoteList();
    }

    getQuoteList = () => {
        QuoteApi.getQuoteList()
            .then((snapshot) => {
                if (!snapshot.val) return null;
                this.setState({ quoteList: snapshot.val() });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // обновляем список записей настроения с бекенда
    updateMoodList = () => {
        MoodApi.getMoodList()
            .then((snapshot) => {
                if (!snapshot.val) return null;
                const moodResponseList: MoodObjectResponse[] = [];
                snapshot.forEach((snap) => {
                    moodResponseList.push({ ...snap.val(), id: snap.key });
                });
                const moodList: MoodObject[] = moodResponseList
                    .map((moodObjectJson: MoodObjectResponse) => {
                        return { ...moodObjectJson, date: new Date(moodObjectJson.date) };
                    })
                    .sort((a: MoodObject, b: MoodObject) => b.date.getTime() - a.date.getTime()); // сортируем по дате
                this.setState({ moodList });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {
        const { quoteList, moodList } = this.state;
        return (
            <PageWrapper>
                <MainScreenWrapper data-testid="main-screen-data-test-id">
                    <MainScreenDataWrapper>
                        <HistoryBlockWrapper>
                            <MoodHistory moodList={moodList} updateMoodList={this.updateMoodList} />
                        </HistoryBlockWrapper>
                        <RightBlockWrapper>
                            <GraphBlockWrapper>
                                <h2>Here will be cool graph</h2>
                            </GraphBlockWrapper>
                            <QuoteBlockWrapper>
                                <QuoteBlock interval={QUOTE_BLOCK_DEFAULT_INTERVAL} isAutoSwitchEnabled={true} quoteList={quoteList} />
                            </QuoteBlockWrapper>
                        </RightBlockWrapper>
                    </MainScreenDataWrapper>
                </MainScreenWrapper>
            </PageWrapper>
        );
    }
}

export default MainScreen;
