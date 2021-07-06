import React from "react";
import './assets/css/style.css';
import Timer from "./containers/Timer/Timer";

function App() {
	return (
		<div className="content">
			<h1>Redux Stopwatch</h1>
			<Timer />
		</div>
	);
}

export default App;
