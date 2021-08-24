//
// Vass Cisse
//

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actionStartNewGame } from '../reducers/actions';

// Stateless Functional Component
const NavBar = () => {
	const game = useSelector((state) => state.game);
	const timerDetails = useSelector((state) => state.timer);
	const dispatch = useDispatch();
	const authorizeNewGame = game.hasWon || game.hasLost || timerDetails.timeIsUp;

	return (
		<nav className="navbar navbar-brand bg-light">
			{!authorizeNewGame && (
				<button type="button" className="btn btn-secondary m-2" disabled>
					New Game
				</button>
			)}
			{authorizeNewGame && (
				<button
					type="button"
					className="btn btn-secondary m-2"
					onClick={() => {
						dispatch(actionStartNewGame(game.score));
					}}
				>
					New Game
				</button>
			)}
			<button type="button" className="btn btn-info m-2" disabled>
				Previous Score <span className="badge badge-light">{game.previousScore}</span>
			</button>
			<button type="button" className="btn btn-info m-2" disabled>
				Current Score <span className="badge badge-light">{game.score}</span>
			</button>
			<span className="badge badge-pill badge-light">React Samegame v1.1, developed by Vass Cisse © 2019</span>
		</nav>
	);
};

export default NavBar;
