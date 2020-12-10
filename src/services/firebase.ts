import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
    apiKey: process.env.FIREBASE_API_KEY || "",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || "",
    databaseURL: process.env.FIREBASE_DATABASE_URL || "",
};

firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database ? firebase.database() : ({} as firebase.database.Database);
