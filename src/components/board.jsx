//
// Vass Cisse
//

import React from 'react';
import Bubble from './bubble';
import { useSelector, useDispatch } from 'react-redux';
import { actionUpdateBoard } from '../reducers/actions';

// Stateless Functional Component
const Board = () => {
	const game = useSelector((state) => state.game);
	const dispatch = useDispatch();

	return (
		<React.Fragment>
			<div className="board-grid">
				{game.bubbles.map((bubble) => (
					<Bubble
						key={bubble.id}
						bubble={bubble}
						onDelete={() => {
							dispatch(actionUpdateBoard({ bubble: bubble, game: game }));
						}}
					/>
				))}
			</div>
			<br />
			<div className="card" style={{ width: 645 }}>
				<div className="card-body">
					<h5 className="card-title">Rules of the game</h5>
					<p className="card-text">
						Click on a bubble to remove it. Adjoining bubbles of the same color will also be removed.
						Remaining bubbles will fall in the empty spaces created. If 5 or more bubbles fall, you get a
						bonus (+10). If 10 or more bubbles fall, you get a better bonus (+100). You win the game when
						your score reaches 500. Have fun!
					</p>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Board;
