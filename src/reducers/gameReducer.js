//
// Vass Cisse
//

import { emptyGameData, gameHasStarted, startNewGame, updateBoard } from '../utils';
import { NEW_GAME, UPDATE_GAME, GAME_STARTED } from './types';

const gameReducer = (state = emptyGameData, action) => {
	switch (action.type) {
		case NEW_GAME:
			return startNewGame(action.payload);
		case GAME_STARTED:
			return gameHasStarted(action.payload);
		case UPDATE_GAME:
			return updateBoard(action.payload);
		default:
			return state;
	}
};

export default gameReducer;
