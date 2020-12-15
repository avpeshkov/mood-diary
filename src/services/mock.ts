import firebase from "firebase";

/**
     мок firebase.db для тестов
 */
export const authMock = (() => {
    return {};
}) as (app?: firebase.app.App) => firebase.auth.Auth;

/**
 мок firebase.db для тестов
 */
export const dbMock = {} as firebase.database.Database;
