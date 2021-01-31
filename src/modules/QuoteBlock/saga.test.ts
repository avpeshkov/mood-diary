import { loadQuotes, getQuotesListForSaga } from "./saga";
import { quotesActions, quotesReducer, quotesSliceState } from "./slice";
import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import QuoteApi from "modules/QuoteBlock/api";
import firebase from "firebase";

jest.mock("firebase/app");
jest.mock("modules/QuoteBlock/api");

describe("Quotes saga", () => {
    const quoteList: quotesSliceState = [{ id: 1, author: "Hemingway", quote: "HA" }];

    it("loadQuotesSaga__successBackEndCallPutSetQuotesAction", () => {
        return expectSaga(loadQuotes)
            .withReducer(quotesReducer)
            .provide([[matchers.call.fn(getQuotesListForSaga), quoteList]])
            .put(quotesActions.setQuotes(quoteList))
            .hasFinalState(quoteList)
            .run();
    });

    it("loadQuotesSaga__withListOfQuotesInPayload__failBackEndCallKeepCurrentState", () => {
        return expectSaga(loadQuotes)
            .withReducer(quotesReducer)
            .provide([[matchers.call.fn(getQuotesListForSaga), quoteList]])
            .put(quotesActions.setQuotes(quoteList))
            .hasFinalState(quoteList)
            .run();
    });

    it("getQuotesListForSaga__success", async () => {
        jest.spyOn(QuoteApi, "getQuoteList").mockImplementation(() => {
            return Promise.resolve({ val: () => quoteList } as firebase.database.DataSnapshot);
        });

        expect(await getQuotesListForSaga()).toEqual(quoteList);
    });

    it("getQuotesListForSaga__fail", async () => {
        jest.spyOn(QuoteApi, "getQuoteList").mockImplementation(() => {
            return Promise.resolve({} as firebase.database.DataSnapshot);
        });

        expect(await getQuotesListForSaga()).toEqual([]);
    });
});
