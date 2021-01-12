import { takeEvery, call } from "redux-saga/effects";

import { quotesActions } from "rdx/reducer/quotesSlice";
import { QuoteObject } from "types/quote";

const saveQuotesToLocalStorage = async (quotesList: QuoteObject[]) => {
    await localStorage.setItem("quotesList", JSON.stringify(quotesList));
};

export function* saveQuotes({ payload }: ReturnType<typeof quotesActions.setQuotes>) {
    if (payload && payload.length > 0) {
        yield call(saveQuotesToLocalStorage, payload);
    }
}

export function* quotesSaga() {
    yield takeEvery(quotesActions.setQuotes.type, saveQuotes);
}
