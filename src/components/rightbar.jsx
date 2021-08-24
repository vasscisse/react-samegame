//
// Vass Cisse
//

import React from 'react';
import { useSelector } from 'react-redux';
import Timer from './timer';

// Stateless Functional Component
const RightBar = () => {
	const game = useSelector((state) => state.game);
	const timerDetails = useSelector((state) => state.timer);
	const login = useSelector((state) => state.login);

	return (
		<React.Fragment>
			<ul className="list-group">
				<li className="list-group-item col-lg-5">
					<button type="button" className="btn btn-info" disabled>
						Total fallen <span className="badge badge-light">{game.countFallen}</span>
					</button>
				</li>
				<li className="list-group-item col-lg-5">
					<button type="button" className="btn btn-info" disabled>
						Bonus +10&nbsp; <span className="badge badge-light">{game.countBonus10}</span>
					</button>
				</li>
				<li className="list-group-item col-lg-5">
					<button type="button" className="btn btn-info" disabled>
						Bonus +100 <span className="badge badge-light">{game.countBonus100}</span>
					</button>
				</li>
				<li className="list-group-item col-lg-5">
					<Timer />
				</li>
			</ul>
			<br />
			<br />
			{game.hasWon && (
				<div className="alert alert-success col-lg-5" role="alert">
					Congratulations {login.username} ! You won! &#129321;
				</div>
			)}
			{(game.hasLost || (timerDetails.timeIsUp && !game.hasWon)) && (
				<div className="alert alert-danger col-lg-5" role="alert">
					{login.username}, you are a looser! &#128540;
				</div>
			)}
		</React.Fragment>
	);
};

export default RightBar;
