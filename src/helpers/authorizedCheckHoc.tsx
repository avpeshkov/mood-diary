import React, { useEffect, useState } from "react";
import firebaseApi from "services/firebase";
import { Redirect, useHistory } from "react-router";

/**
 *  НОС  для страниц на которые не должен попадать авторизованный пользователь
 */
export const authorizedCheckHoc = <Props extends object>(Component: React.ComponentType<Props>) => (props: Props) => {
    if (firebaseApi.auth().currentUser && useHistory().location.pathname !== "/mood") {
        return <Redirect to="/mood" />;
    } else {
        return <Component {...props} />;
    }
};
