import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { fork } from "redux-saga/effects";
import { quotesSaga } from "./modules/QuoteBlock/saga";
import { moodsSaga } from "./modules/MoodHistory/saga";
import { combineReducers } from "redux";
import { moodsReducer } from "./modules/MoodHistory/slice";
import { quotesReducer } from "./modules/QuoteBlock/slice";
import { currentUserReducer } from "./modules/users/slice";

export const reducer = combineReducers({
    moods: moodsReducer,
    quotes: quotesReducer,
    currentUser: currentUserReducer,
});

const sagaMiddleware = createSagaMiddleware();

const middleware = [...getDefaultMiddleware(), sagaMiddleware];

if (process.env.NODE_ENV === `development`) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { logger } = require(`redux-logger`);

    middleware.push(logger);
}

export const store = configureStore({
    reducer,
    middleware,
});

function* rootSaga() {
    yield fork(quotesSaga);
    yield fork(moodsSaga);
}

sagaMiddleware.run(rootSaga);

export type MoodDiaryState = ReturnType<typeof reducer>;
