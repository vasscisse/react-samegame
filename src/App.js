//
// Vass Cisse
//

import React from 'react';
import './App.css';
import Board from './components/board';
import NavBar from './components/navbar';
import RightBar from './components/rightbar';
import Login from './components/login';

import { actionStartNewGame, actionSignIn } from './reducers/actions';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
	const game = useSelector((state) => state.game);
	const login = useSelector((state) => state.login);
	const dispatch = useDispatch();

	const launchGame = (username) => {
		dispatch(actionSignIn(username));
		dispatch(actionStartNewGame(game.score));
	};

	return (
		<React.Fragment>
			{login.logged === false && <Login launchGame={launchGame} />}
			{login.logged && (
				<React.Fragment>
					<NavBar />
					<main className="container m-2">
						<div className="row">
							<div className="col-sm">
								<Board />
							</div>
							<div className="col-sm">
								<RightBar />
							</div>
						</div>
					</main>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

export default App;
