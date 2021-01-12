import { quotesActions, quotesReducer, quotesSliceState } from "rdx/reducer/quotesSlice";

describe("quotesSlice test", () => {
    const quoteList: quotesSliceState = [{ id: 1, author: "Hemingway", quote: "HA" }];
    const { setQuotes } = quotesActions;

    describe("actions", () => {
        it("setQuotes_listOfMoodObjectsAs1stParam_createActionWithPayload", () => {
            const expectedAction = {
                type: setQuotes.type,
                payload: quoteList,
            };
            expect(setQuotes(quoteList)).toEqual(expectedAction);
        });
    });

    describe("reducers", () => {
        const initialState: quotesSliceState = [];

        it("quotesReducer_setQuotesActionAs2stParam_setListObjectsToStore", () => {
            const action = setQuotes(quoteList);
            const state = quotesReducer(initialState, action);
            expect(state).toEqual(quoteList);
        });
    });
});
