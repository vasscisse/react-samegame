//
// Vass Cisse
//

import { NEW_GAME, GAME_STARTED, UPDATE_GAME, SIGNED_IN, START_TIMER, STOP_TIMER, TIME_IS_UP } from './types';

export const actionStartNewGame = (previousScorePayload) => {
	return {
		type: NEW_GAME,
		payload: previousScorePayload
	};
};

export const actionGameStarted = (gamePayload) => {
	return {
		type: GAME_STARTED,
		payload: gamePayload
	};
};

export const actionUpdateBoard = (gamePayload) => {
	return {
		type: UPDATE_GAME,
		payload: gamePayload
	};
};

export const actionSignIn = (payload) => {
	return {
		type: SIGNED_IN,
		payload: payload
	};
};

export const actionStartTimer = () => {
	return {
		type: START_TIMER,
		payload: null
	};
};

export const actionStopTimer = (payload) => {
	return {
		type: STOP_TIMER,
		payload: payload
	};
};

export const actionTimeIsUp = () => {
	return {
		type: TIME_IS_UP,
		payload: null
	};
};
