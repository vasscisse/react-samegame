//
// Vass Cisse
//

import { START_TIMER, STOP_TIMER, TIME_IS_UP } from './types';

const timerDetails = {
	startRequested: false,
	stopRequested: false,
	timeIsUp: false
};

const publishStartTimer = () => {
	const newTimerDetails = {
		...timerDetails,
		startRequested: true
	};
	return newTimerDetails;
};

const publishStopTimer = (payload) => {
	const newTimerDetails = {
		...payload,
		stopRequested: true
	};
	return newTimerDetails;
};

const publishTimeIsUp = () => {
	const newTimerDetails = {
		...timerDetails,
		timeIsUp: true
	};
	return newTimerDetails;
};

const timerReducer = (state = timerDetails, action) => {
	switch (action.type) {
		case START_TIMER:
			return publishStartTimer();
		case STOP_TIMER:
			return publishStopTimer(action.payload);
		case TIME_IS_UP:
			return publishTimeIsUp();
		default:
			return state;
	}
};

export default timerReducer;
