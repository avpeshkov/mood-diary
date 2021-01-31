import { takeEvery, call, put } from "redux-saga/effects";

import { quotesActions } from "./slice";
import { QuoteObject } from "./types";
import { isEmpty } from "ramda";
import QuoteApi from "modules/QuoteBlock/api";

export const getQuotesListForSaga = async () => {
    const snapshot = await QuoteApi.getQuoteList();
    if (!snapshot.val) return [];
    return snapshot.val();
};

export function* loadQuotes() {
    try {
        const quotesList: QuoteObject[] = yield call(getQuotesListForSaga);
        if (!quotesList) {
            throw Error("Can't load quotes");
        }
        if (!isEmpty(quotesList)) {
            yield put(quotesActions.setQuotes(quotesList));
        }
    } catch (error) {
        console.log(error);
    }
}

export function* quotesSaga() {
    yield takeEvery(quotesActions.loadQuotes.type, loadQuotes);
}
