import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuoteObject } from "types/quote";

export type quotesSliceState = QuoteObject[];

const setQuotes: CaseReducer<quotesSliceState, PayloadAction<quotesSliceState>> = (state, action) => action.payload;

const quotesSlice = createSlice({
    name: "quotes",
    initialState: [] as quotesSliceState,
    reducers: {
        setQuotes,
    },
});

export const quotesActions = quotesSlice.actions;
export const quotesReducer = quotesSlice.reducer;
