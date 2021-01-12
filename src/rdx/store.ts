import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { reducer } from "./reducer";
import { fork } from "redux-saga/effects";
import { quotesSaga } from "rdx/saga/quotesSaga";
import { moodsSaga } from "rdx/saga/moodsSaga";

const sagaMiddleware = createSagaMiddleware();

const middleware = [...getDefaultMiddleware(), sagaMiddleware];

if (process.env.NODE_ENV === `development`) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { logger } = require(`redux-logger`);

    middleware.push(logger);
}

function* rootSaga() {
    yield fork(quotesSaga);
    yield fork(moodsSaga);
}

export const store = configureStore({
    reducer,
    middleware,
});

sagaMiddleware.run(rootSaga);

export type MoodDiaryState = ReturnType<typeof reducer>;
