import React from "react";
import { render } from "react-dom";
import { MainScreen } from "./components/MainScreen";
import Modal from "react-modal";

Modal.setAppElement("#root");

render(<MainScreen />, document.getElementById("root"));
