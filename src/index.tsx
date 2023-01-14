import "./index.css";
import App from "./App";
import ScrollToTop from "./components/ScrollToTop";
import store from "store";
import { BASE_URL } from "utils/endpoints";

import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = BASE_URL;

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <ScrollToTop>
                <Provider store={store}>
                    <App />
                </Provider>
            </ScrollToTop>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root"),
);
