import React from "react";
import { render } from "react-dom";
import Modal from "react-modal";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

Modal.setAppElement("#root");

render(
    <Router basename={process.env.PUBLIC_PATH}>
        <App />
    </Router>,
    document.getElementById("root")
);
