import { loadQuotes, getQuotesList } from "./saga";
import { quotesActions, quotesReducer, quotesSliceState } from "./slice";
import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";

jest.mock("firebase/app");

describe("Quotes saga", () => {
    const quoteList: quotesSliceState = [{ id: 1, author: "Hemingway", quote: "HA" }];

    it("loadQuotesSaga__successBackEndCallPutSetQuotesAction", () => {
        return expectSaga(loadQuotes)
            .withReducer(quotesReducer)
            .provide([[matchers.call.fn(getQuotesList), quoteList]])
            .put(quotesActions.setQuotes(quoteList))
            .hasFinalState(quoteList)
            .run();
    });

    it("loadQuotesSaga__withListOfQuotesInPayload__failBackEndCallKeepCurrentState", () => {
        return expectSaga(loadQuotes)
            .withReducer(quotesReducer)
            .provide([[matchers.call.fn(getQuotesList), quoteList]])
            .put(quotesActions.setQuotes(quoteList))
            .hasFinalState(quoteList)
            .run();
    });
});
