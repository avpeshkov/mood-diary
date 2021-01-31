import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import App from "./App";
import firebaseApi from "./utils/firebase";
import firebase from "firebase";
import MoodApi from "./modules/MoodHistory/api";
import QuoteApi from "./modules/QuoteBlock/api";

jest.mock("firebase/app");

jest.spyOn(MoodApi, "getMoodsList").mockImplementation(() => {
    return Promise.resolve({} as firebase.database.DataSnapshot);
});

jest.spyOn(QuoteApi, "getQuoteList").mockImplementation(() => {
    return Promise.resolve({} as firebase.database.DataSnapshot);
});

Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

test("at first we render loading", () => {
    jest.spyOn(firebaseApi, "auth").mockImplementation(() => {
        const onAuthStateChanged: () => void = () => {};
        return ({ onAuthStateChanged } as unknown) as firebase.auth.Auth;
    });

    const history = createMemoryHistory();
    render(
        <Router history={history}>
            <App />
        </Router>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});

test("if no auth user we ca load public pages", () => {
    jest.spyOn(firebaseApi, "auth").mockImplementation(() => {
        const onAuthStateChanged: (value: () => void) => void = (value) => {
            value();
        };
        return ({ onAuthStateChanged } as unknown) as firebase.auth.Auth;
    });
    const history = createMemoryHistory();
    render(
        <Router history={history}>
            <App />
        </Router>
    );

    expect(screen.getByText(/Welcome to Mood Diary/i)).toBeInTheDocument();
    expect(history.location.pathname).toEqual("/");
});

test("if no auth user authenticated he always get mood page", () => {
    jest.spyOn(firebaseApi, "auth").mockImplementation(() => {
        const onAuthStateChanged: (value: (user: { currentUser: { email: string } }) => void) => void = (value) => {
            value({ currentUser: { email: "test@test.com" } });
        };
        return ({ onAuthStateChanged, currentUser: { email: "test@test.com" } } as unknown) as firebase.auth.Auth;
    });

    const history = createMemoryHistory();
    render(
        <Router history={history}>
            <App />
        </Router>
    );

    expect(screen.getByTestId("main-screen-data-test-id")).toBeTruthy();
    expect(history.location.pathname).toEqual("/mood");

    history.push("/signup");
    expect(screen.getByTestId("main-screen-data-test-id")).toBeTruthy();
    expect(history.location.pathname).toEqual("/mood");

    history.push("/login");
    expect(screen.getByTestId("main-screen-data-test-id")).toBeTruthy();
    expect(history.location.pathname).toEqual("/mood");

    history.push("/");
    expect(screen.getByTestId("main-screen-data-test-id")).toBeTruthy();
    expect(history.location.pathname).toEqual("/mood");

    history.push("/some-random-link");
    expect(screen.getByTestId("main-screen-data-test-id")).toBeTruthy();
    expect(history.location.pathname).toEqual("/mood");
});
