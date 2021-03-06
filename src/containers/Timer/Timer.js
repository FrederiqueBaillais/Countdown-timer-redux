import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import {
	INCREMENT,
	DECREMENT,
	COUNTDOWN,
	COUNTDOWNATZERO,
	RESET
} from "../../store/actions";
import Button from "../../components/Buttons/Button";

class Timer extends Component {
	constructor(props) {
		super(props);

		// for storing interval function
		this.timer = 0;

		this.startTimer = this.startTimer.bind(this);
		this.stopTimer = this.stopTimer.bind(this);
		this.countDown = this.countDown.bind(this);
		this.resetTimer = this.resetTimer.bind(this);
		this.incTimer = this.incTimer.bind(this);
		this.decTimer = this.decTimer.bind(this);
	}

	// Returns an object with, h-m-s from the passed seconds
	secondsToTime(secs) {
		let hours = Math.floor(secs / (60 * 60));

		let divisor_for_minutes = secs % (60 * 60);
		let minutes = Math.floor(divisor_for_minutes / 60);

		let divisor_for_seconds = divisor_for_minutes % 60;
		let seconds = Math.ceil(divisor_for_seconds);

		let obj = {
			h: hours,
			m: minutes,
			s: seconds,
		};
		return obj;
	}

	incTimer() {
		if (this.props.seconds >= 0) this.props.onIncrement(this.secondsToTime);
	}

	decTimer() {
		// Runs only if seconds > 61, to not result in getting -ve values rendered
		if (this.props.seconds > 61) this.props.onDecrement(this.secondsToTime);
	}

	startTimer() {
		// Runs only if timer isn't started already and seconds are atleast more than zero
		if (this.timer === 0 && this.props.seconds > 0) {
			this.timer = setInterval(this.countDown, 1000);
		}
	}

	countDown() {
		// Removing a sec and setting state to re-render
		// let seconds = this.state.seconds - 1;
		this.props.onCountDown(this.secondsToTime);

		// Check if we're at zero
		if (this.props.seconds === 0) {
			clearInterval(this.timer);
			this.props.onCountDownAtZero();
		}
	}

	stopTimer() {
		// Stop only if timer is running and seconds aren't zero already
		if (this.timer !== 0 && this.props.seconds !== 0) {
			clearInterval(this.timer);
			this.timer = 0;
		}
	}

	resetTimer() {
		// Getting back state to its original form
		this.props.onReset();
		//this.props.onResetLaps();

		// Also, if timer is running, we've to stop it too
		if (this.timer !== 0) {
			clearInterval(this.timer);
			this.timer = 0;
		}
	}

	// Gives our single digit h, m, and s a double digits, to look like clock
	timeFormatter(time) {
		let { h, m, s } = time;

		if (h.toString().length < 2) h = `0${h}`;

		if (m.toString().length < 2) m = `0${m}`;

		if (s.toString().length < 2) s = `0${s}`;

		return { h, m, s };
	}

	render() {
		let { h, m, s } = this.timeFormatter(this.props.time);

		return (
			<Fragment>
				<div className="bloc-timer-buttons">
					<div className="timer">
						<span>
							{h}:{m}:{s}
						</span>
					</div>
					<div className="buttons">
						<Button clicked={this.incTimer}>+</Button>
						<Button clicked={this.startTimer}>Start</Button>
						<Button clicked={this.stopTimer}>Stop</Button>
						<Button clicked={this.resetTimer}>Reset</Button>
						<Button clicked={this.decTimer}>-</Button>
					</div>
				</div>
			</Fragment>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onIncrement: (fn) => dispatch({ type: INCREMENT, secToTime: fn }),
		onDecrement: (fn) => dispatch({ type: DECREMENT, secToTime: fn }),
		onCountDown: (fn) => dispatch({ type: COUNTDOWN, secToTime: fn }),
		onCountDownAtZero: () => dispatch({ type: COUNTDOWNATZERO }),
		onReset: () => dispatch({ type: RESET })
	};
};

const mapStateToProps = (state) => {
	return {
		time: state.tmr.time,
		seconds: state.tmr.seconds
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
