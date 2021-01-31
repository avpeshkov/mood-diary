import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import App from "src/App";
import firebase from "firebase";
import firebaseApi from "utils/firebase";
import MoodApi from "modules/MoodHistory/api";
import QuoteApi from "modules/QuoteBlock/api";

jest.spyOn(MoodApi, "getMoodsList").mockImplementation(() => {
    return Promise.resolve({} as firebase.database.DataSnapshot);
});

jest.spyOn(QuoteApi, "getQuoteList").mockImplementation(() => {
    return Promise.resolve({} as firebase.database.DataSnapshot);
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
