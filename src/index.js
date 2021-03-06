import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

import timerReducer from "./store/reducers/timer";
import "./index.css";
import App from "./App";

const rootReducer = combineReducers({
	tmr: timerReducer,
});

const store = createStore(rootReducer);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
