import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import firebase from "firebase";

export type currentUserSliceState = firebase.User | null;

const setCurrentUser: CaseReducer<currentUserSliceState, PayloadAction<currentUserSliceState>> = (state, action) => action.payload;

const slice = createSlice({
    name: "currentUser",
    initialState: null as currentUserSliceState,
    reducers: {
        setCurrentUser,
        clearCurrentUser: () => null,
    },
});

export const currentUserActions = slice.actions;
export const currentUserReducer = slice.reducer;
