import { currentUserActions, currentUserReducer, currentUserSliceState } from "rdx/reducer/currentUserSlice";
import firebase from "firebase";

describe("currentUserSlice test", () => {
    const user: currentUserSliceState = ({ id: 1, userName: "Hemingway" } as unknown) as firebase.User;
    const { setCurrentUser, clearCurrentUser } = currentUserActions;

    describe("actions", () => {
        it("test setCurrentUser action creator", () => {
            const expectedAction = {
                type: setCurrentUser.type,
                payload: user,
            };
            expect(setCurrentUser(user)).toEqual(expectedAction);
        });
        it("test clearCurrentUser action creator", () => {
            const expectedAction = {
                type: clearCurrentUser.type,
            };
            expect(clearCurrentUser()).toEqual(expectedAction);
        });
    });

    describe("reducers", () => {
        it("test setCurrentUser reducer", () => {
            const initialState: currentUserSliceState = null;
            const action = setCurrentUser(user);
            const state = currentUserReducer(initialState, action);
            expect(state).toEqual(user);
        });

        it("test setCurrentUser reducer", () => {
            const initialState: currentUserSliceState = user;
            const action = clearCurrentUser();
            const state = currentUserReducer(initialState, action);
            expect(state).toEqual(null);
        });
    });
});
