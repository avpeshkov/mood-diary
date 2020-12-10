import React from "react";
import { render } from "react-dom";
import Modal from "react-modal";
import App from "./App";

Modal.setAppElement("#root");

render(<App />, document.getElementById("root"));
