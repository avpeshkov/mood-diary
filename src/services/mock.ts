import firebase from "firebase";

export const authMock = (() => {
    return {};
}) as (app?: firebase.app.App) => firebase.auth.Auth;
export const dbMock = {} as firebase.database.Database;
