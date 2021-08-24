//
// Vass Cisse
//

import { utils } from '../utils';
import { NEW_GAME, UPDATE_GAME, GAME_STARTED } from './types';

const gameReducer = (state = utils.emptyGameData, action) => {
	switch (action.type) {
		case NEW_GAME:
			return utils.startNewGame(action.payload);
		case GAME_STARTED:
			return utils.gameHasStarted(action.payload);
		case UPDATE_GAME:
			return utils.updateBoard(action.payload);
		default:
			return state;
	}
};

export default gameReducer;
