import { currentUserActions, currentUserReducer, currentUserSliceState } from "./slice";
import firebase from "firebase";

describe("currentUserSlice test", () => {
    const user: currentUserSliceState = ({ id: 1, userName: "Hemingway" } as unknown) as firebase.User;
    const { setCurrentUser, clearCurrentUser } = currentUserActions;

    describe("actions", () => {
        it("setCurrentUser_firebaseUserObjectAs1stParam_createActionWithPayload", () => {
            const expectedAction = {
                type: setCurrentUser.type,
                payload: user,
            };
            expect(setCurrentUser(user)).toEqual(expectedAction);
        });
        it("clearCurrentUser_firebaseUserObjectAs1stParam_createActionWithPayload", () => {
            const expectedAction = {
                type: clearCurrentUser.type,
            };
            expect(clearCurrentUser()).toEqual(expectedAction);
        });
    });

    describe("reducers", () => {
        it("currentUserReducer_setCurrentUserActionAs2stParam_setUserToStore", () => {
            const initialState: currentUserSliceState = null;
            const action = setCurrentUser(user);
            const state = currentUserReducer(initialState, action);
            expect(state).toEqual(user);
        });

        it("currentUserReducer_clearCurrentUserActionAs2stParam_setNullToStore", () => {
            const initialState: currentUserSliceState = user;
            const action = clearCurrentUser();
            const state = currentUserReducer(initialState, action);
            expect(state).toEqual(null);
        });
    });
});
