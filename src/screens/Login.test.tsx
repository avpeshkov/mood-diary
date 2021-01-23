import firebase from "firebase";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import React from "react";
import Login from "./Login";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import authHelpers from "utils/auth";
import firebaseApi from "utils/firebase";

jest.mock("firebase/app");

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

const mockSignIn = jest.fn();
jest.spyOn(authHelpers, "signIn").mockImplementation(mockSignIn);
const history = createMemoryHistory();

test("submit empty form", async () => {
    const { getByText } = render(
        <Router history={history}>
            <Login />
        </Router>
    );
    fireEvent.click(getByText("Submit"));
    await waitFor(() => getByText(/Please input your email!/i));
    await waitFor(() => getByText(/Please input your password!/i));
});

test("success submit", async () => {
    const { getByText } = render(
        <Router history={history}>
            <Login />
        </Router>
    );

    const emailInputNode = screen.getByLabelText("Email");
    fireEvent.change(emailInputNode, { target: { value: "mail" } });
    const passwordInputNode = screen.getByLabelText("Password");
    fireEvent.change(passwordInputNode, { target: { value: "pass" } });
    fireEvent.click(getByText("Submit"));
    await waitFor(() => expect(mockSignIn).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(mockSignIn).toHaveBeenCalledWith("mail", "pass"));
});
