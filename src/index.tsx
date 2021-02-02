import React from "react";
import { render } from "react-dom";
import Modal from "react-modal";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

Modal.setAppElement("#root");
const PUBLIC_PATH = process.env.PUBLIC_PATH || "/";

render(
    <Router basename={PUBLIC_PATH}>
        <App />
    </Router>,
    document.getElementById("root")
);
