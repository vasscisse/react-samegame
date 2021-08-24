//
// Vass Cisse
//

import gameReducer from './gameReducer';
import loggedReducer from './loggedReducer';
import timerReducer from './timerReducer';
import { combineReducers } from 'redux';

// The only source of truth
const allReducers = combineReducers({
	game: gameReducer,
	login: loggedReducer,
	timer: timerReducer
});

export default allReducers;
