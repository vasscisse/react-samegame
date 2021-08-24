//
// Vass Cisse
//

import { SIGNED_IN } from './types';

const signIn = (payload) => {
	const newPayload = payload.substr(0, 1).toUpperCase() + payload.substr(1).toLowerCase();
	return {
		logged: true,
		username: newPayload
	};
};

const loggedReducer = (state = { logged: false, username: null }, action) => {
	switch (action.type) {
		case SIGNED_IN:
			return signIn(action.payload);
		default:
			return state;
	}
};

export default loggedReducer;
