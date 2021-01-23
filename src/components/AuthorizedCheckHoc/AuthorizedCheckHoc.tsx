import React from "react";
import { Redirect, useHistory } from "react-router";
import firebaseApi from "utils/firebase";

/**
 *  НОС  для страниц на которые не должен попадать авторизованный пользователь
 */
export const AuthorizedCheckHoc = <Props extends object>(Component: React.ComponentType<Props>) => (props: Props) => {
    if (firebaseApi.auth().currentUser && useHistory().location.pathname !== "/mood") {
        return <Redirect to="/mood" />;
    } else {
        return <Component {...props} />;
    }
};
