import React from "react";
import styled from "@emotion/styled";
import { getRandomIndex } from "../utils";
import { QuoteObject } from "types/quote";
import { getQuoteList } from "../../api/quote";

interface QuoteBlockProps {
    interval: number;
    isAutoSwitchEnabled: boolean;
}

interface QuoteBlockState {
    quoteIndex: number;
    quoteList: QuoteObject[];
}

const QuoteWrapper = styled.div`
    display: flex;
    flex-direction: row;
    color: white;
    margin-bottom: 20px;
    border-radius: 25px;
    background-color: darkslategrey;
    min-height: 100px;
    max-width: 550px;
`;
const QuoteBlockView = styled.span`
    position: relative;
    font-size: medium;
    line-height: 24px;
    text-decoration-style: unset;
    color: white;
    font-style: italic;

    footer {
        font-size: 0.8em;
        font-weight: 700;
        color: darken($white, 15%);
        float: right;

        &:before {
            content: "\\2015";
        }
    }
`;

const QuoteButton = styled.a`
    text-decoration: none;
    display: block;
    background-color: transparent;
    align-items: center;
    height: fit-content;
    align-self: center;
    padding-right: 10px;
    font-weight: bold;
    font-size: 25px;
    padding-left: 10px;
`;

// здесь тоже реализованно как рандомное отоборажение содержания так и управление выводом
export class QuoteBlock extends React.Component<QuoteBlockProps, QuoteBlockState> {
    intervalID?: NodeJS.Timeout;
    _isMounted = false;

    state: QuoteBlockState = {
        quoteIndex: 0,
        quoteList: [],
    };

    componentDidMount() {
        const { interval, isAutoSwitchEnabled } = this.props;
        this.updateQuoteList();
        if (isAutoSwitchEnabled) {
            this.intervalID = setInterval(this.setRandomQuote, interval);
        }
    }

    shouldComponentUpdate(nextProps: Readonly<QuoteBlockProps>, nextState: Readonly<QuoteBlockState>): boolean {
        return (
            this.state.quoteIndex !== nextState.quoteIndex ||
            this.props.interval !== nextProps.interval ||
            this.props.isAutoSwitchEnabled !== nextProps.isAutoSwitchEnabled ||
            this.state.quoteList.length !== nextState.quoteList.length
        );
    }

    componentDidUpdate(prevProps: QuoteBlockProps) {
        const didPropsChanged = prevProps.interval !== this.props.interval || this.props.isAutoSwitchEnabled !== prevProps.isAutoSwitchEnabled;
        if (didPropsChanged) {
            this.clearWorker();
            if (this.props.isAutoSwitchEnabled) {
                this.intervalID = setInterval(this.setRandomQuote, this.props.interval);
            }
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.clearWorker();
    }

    updateQuoteList = () => {
        getQuoteList((quoteList: QuoteObject[]) => {
            this.setState({ quoteList }, () => {
                this._isMounted = true;
            });
        });
    };

    setRandomQuote = () => {
        if (this._isMounted) {
            let newId = this.state.quoteIndex;
            while (newId === this.state.quoteIndex) {
                newId = getRandomIndex(this.state.quoteList.length);
            }
            this.setState({ quoteIndex: newId });
        }
    };

    setQuote = (position: "next" | "previous") => {
        let newId = this.state.quoteIndex;
        const quoteListLength = this.state.quoteList.length;
        switch (position) {
            case "next":
                newId++;
                break;
            case "previous":
                newId--;
                break;
        }
        if (newId === -1) {
            newId = quoteListLength - 1;
        } else if (newId >= quoteListLength) {
            newId = quoteListLength - newId;
        }
        this.setState({ quoteIndex: newId });
    };

    clearWorker = () => {
        if (this.intervalID) {
            clearInterval(this.intervalID);
            this.intervalID = undefined;
        }
    };

    render() {
        const { quoteIndex, quoteList } = this.state;
        if (quoteList.length == 0) {
            return <></>;
        }
        return (
            <QuoteWrapper>
                <QuoteButton onClick={() => this.setQuote("previous")}>{"<"}</QuoteButton>
                <QuoteBlockView>
                    {quoteList[quoteIndex]?.quote}
                    <footer>{quoteList[quoteIndex]?.author}</footer>
                </QuoteBlockView>
                <QuoteButton onClick={() => this.setQuote("next")}>{">"}</QuoteButton>
            </QuoteWrapper>
        );
    }
}
