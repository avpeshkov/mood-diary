import React from "react";
import styled from "@emotion/styled";
import { QuoteBlock } from "components/QuoteBlock";
import { MoodHistory } from "components/MoodHistory";
import { QUOTE_BLOCK_DEFAULT_INTERVAL } from "components/QuoteBlock/consts";
import { PageWrapper } from "components/Wrapper";
import QuoteApi from "api/quote";
import { MoodObject, MoodObjectResponse } from "types/mood";
import MoodApi from "api/mood";
import { connect } from "react-redux";
import { moodsActions } from "rdx/reducer/moodsSlice";
import { quotesActions } from "rdx/reducer/quotesSlice";
import { MoodDiaryState } from "rdx/store";
import { pick } from "ramda";
import { QuoteObject } from "types/quote";

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

function mapStateToProps(state: MoodDiaryState): { moods: MoodObject[]; quotes: QuoteObject[] } {
    return pick(["moods", "quotes"], state);
}

const mapDispatchToProps = {
    setMoods: moodsActions.setMoods,
    setQuotes: quotesActions.setQuotes,
};

type RawMainScreenProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

/**
 Главная страница, авторизованный пользователь всегда попадает на нее.
 */
class RawMainScreen extends React.Component<RawMainScreenProps, {}> {
    componentDidMount() {
        this.updateMoodList();
        this.getQuoteList();
    }

    getQuoteList = () => {
        QuoteApi.getQuoteList()
            .then((snapshot) => {
                if (!snapshot.val) return null;
                this.props.setQuotes(snapshot.val());
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
                const moodList: MoodObject[] = [];
                snapshot.forEach((snap) => {
                    const val: MoodObjectResponse = snap.val();
                    moodList.push({ ...val, id: snap.key as string, date: new Date(val.date) });
                });
                this.props.setMoods(moodList);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {
        const { moods, quotes } = this.props;
        return (
            <PageWrapper>
                <MainScreenWrapper data-testid="main-screen-data-test-id">
                    <MainScreenDataWrapper>
                        <HistoryBlockWrapper>
                            <MoodHistory moodList={moods} />
                        </HistoryBlockWrapper>
                        <RightBlockWrapper>
                            <GraphBlockWrapper>
                                <h2>Here will be cool graph</h2>
                            </GraphBlockWrapper>
                            <QuoteBlockWrapper>
                                <QuoteBlock interval={QUOTE_BLOCK_DEFAULT_INTERVAL} isAutoSwitchEnabled={true} quoteList={quotes} />
                            </QuoteBlockWrapper>
                        </RightBlockWrapper>
                    </MainScreenDataWrapper>
                </MainScreenWrapper>
            </PageWrapper>
        );
    }
}

const MainScreen = connect(mapStateToProps, mapDispatchToProps)(RawMainScreen);

export default MainScreen;
