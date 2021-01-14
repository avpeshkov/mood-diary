import { quotesSaga, saveQuotes, saveQuotesToLocalStorage } from "./saga";
import { quotesActions, quotesReducer, quotesSliceState } from "./slice";
import { expectSaga } from "redux-saga-test-plan";

describe("Quotes saga", () => {
    const quoteList: quotesSliceState = [{ id: 1, author: "Hemingway", quote: "HA" }];

    it("saveQuotesGenerator__withListOfQuotesInPayload__success", () => {
        const generator = saveQuotes({
            type: quotesActions.setQuotes.type,
            payload: quoteList,
        });
        expect(generator.next().value).toMatchInlineSnapshot(`
      Object {
        "@@redux-saga/IO": true,
        "combinator": false,
        "payload": Object {
          "args": Array [
            Array [
              Object {
                "author": "Hemingway",
                "id": 1,
                "quote": "HA",
              },
            ],
          ],
          "context": null,
          "fn": [Function],
        },
        "type": "CALL",
      }
    `);
        expect(generator.next().done).toBe(true);
    });

    it("saveQuotesGenerator__withEmptyInPayload__justEnds", () => {
        const quoteList: quotesSliceState = [];

        const generator = saveQuotes({
            type: quotesActions.setQuotes.type,
            payload: quoteList,
        });
        expect(generator.next().done).toBe(true);
    });

    it("saveQuotesSaga__withListOfQuotesInPayload__success", () => {
        return expectSaga(saveQuotes, {
            type: quotesActions.setQuotes.type,
            payload: quoteList,
        })
            .call(saveQuotesToLocalStorage, quoteList)
            .run();
    });
});
