import { saveQuotes } from "rdx/saga/quotesSaga";
import { quotesActions, quotesSliceState } from "rdx/reducer/quotesSlice";

describe("Quotes saga", () => {
    it("saveQuotesGenerator__withListOfQuotesInPayload__success", () => {
        const quoteList: quotesSliceState = [{ id: 1, author: "Hemingway", quote: "HA" }];

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
});
