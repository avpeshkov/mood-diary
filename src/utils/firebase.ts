import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { authMock, dbMock } from "./firebase.mock";

const config = {
    apiKey: process.env.FIREBASE_API_KEY || "",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || "",
    databaseURL: process.env.FIREBASE_DATABASE_URL || "",
};

firebase.initializeApp(config);

const firebaseApi = {
    auth: firebase.auth ? firebase.auth : authMock,
    db: firebase.database ? firebase.database() : dbMock,
};

export default firebaseApi;
