import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import App from "src/App";
import firebaseApi from "services/firebase";
import firebase from "firebase";

jest.mock("firebase/app");
jest.mock("services/firebase");
jest.mock("firebase/app");
jest.mock("api/mood");
jest.mock("api/quote");

import MoodApi from "api/mood";
import QuoteApi from "api/quote";

jest.spyOn(MoodApi, "getMoodList").mockImplementation(() => {
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

jest.spyOn(firebaseApi, "auth").mockImplementation(() => {
    const onAuthStateChanged: (value: () => void) => void = (value) => {
        value();
    };
    return ({ onAuthStateChanged } as unknown) as firebase.auth.Auth;
});

test("if no auth user we get home page", () => {
    const history = createMemoryHistory();
    render(
        <Router history={history}>
            <App />
        </Router>
    );

    expect(screen.getByText(/Welcome to Mood Diary/i)).toBeInTheDocument();
    expect(history.location.pathname).toEqual("/");

    history.push("/some-random-link");
    expect(screen.getByText(/Welcome to Mood Diary/i)).toBeInTheDocument();
    expect(history.location.pathname).toEqual("/");
});

test("check redirect to signup page", () => {
    const history = createMemoryHistory();
    render(
        <Router history={history}>
            <App />
        </Router>
    );

    expect(screen.getByText(/Welcome to Mood Diary/i)).toBeInTheDocument();
    expect(history.location.pathname).toEqual("/");

    userEvent.click(screen.getByTestId("signup-data-test-id"));
    expect(screen.getByText(/Sign Up to Mood Diary/i)).toBeInTheDocument();
    expect(history.location.pathname).toEqual("/signup");
});

test("check redirect to login page", () => {
    const history = createMemoryHistory();
    render(
        <Router history={history}>
            <App />
        </Router>
    );

    expect(screen.getByText(/Welcome to Mood Diary/i)).toBeInTheDocument();
    expect(history.location.pathname).toEqual("/");

    userEvent.click(screen.getByTestId("login-data-test-id"));
    expect(screen.getByText(/Login to Mood Diary/i)).toBeInTheDocument();
    expect(history.location.pathname).toEqual("/login");
});
