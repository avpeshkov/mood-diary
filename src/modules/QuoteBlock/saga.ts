import { takeEvery, call } from "redux-saga/effects";

import { quotesActions } from "./slice";
import { QuoteObject } from "./types";
import { isEmpty } from "ramda";

export const saveQuotesToLocalStorage = async (quotesList: QuoteObject[]) => {
    await localStorage.setItem("quotesList", JSON.stringify(quotesList));
};

export function* saveQuotes({ payload }: ReturnType<typeof quotesActions.setQuotes>) {
    if (!isEmpty(payload)) {
        yield call(saveQuotesToLocalStorage, payload);
    }
}

export function* quotesSaga() {
    yield takeEvery(quotesActions.setQuotes.type, saveQuotes);
}
