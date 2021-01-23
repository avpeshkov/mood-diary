import { CaseReducer, createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuoteObject } from "./types";

export type quotesSliceState = QuoteObject[];

const setQuotes: CaseReducer<quotesSliceState, PayloadAction<quotesSliceState>> = (state, action) => action.payload;

const loadQuotes = createAction("quotes/loadQuotes");

const quotesSlice = createSlice({
    name: "quotes",
    initialState: [] as quotesSliceState,
    reducers: {
        setQuotes,
    },
});

export const quotesActions = { ...quotesSlice.actions, loadQuotes: loadQuotes };
export const quotesReducer = quotesSlice.reducer;
