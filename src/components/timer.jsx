//
// Vass Cisse
//

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actionStopTimer, actionStartTimer, actionTimeIsUp, actionGameStarted } from '../reducers/actions';

//IIFE
const timerCountDown = (function() {
	const _baseTime = 90;
	let _counter = _baseTime;
	let _timerID = null;
	let _hasLost = false;
	let _endGame = false; //hasWon && gameOver
	let _stopRequested = false;
	let _observer = null;

	// private

	function _notify(newTime) {
		if (_observer != null) {
			_observer.update(newTime);
		}
	}

	function _countDown() {
		if (_hasLost || _endGame) {
			_observer.dispatchStopTimer();
			clearInterval(_timerID);
		} else {
			const timeIsUp = _counter === 0;
			if (timeIsUp) {
				_stopTimer();
			} else {
				_counter = _counter - 1;
				_notify(_counter);
			}
		}
	}

	function _stopTimer() {
		if (!_stopRequested) {
			_observer.dispatchTimeIsUp();
		}
		clearInterval(_timerID);
	}

	// public

	function updateSettings(hasLost, stopRequested, endGame) {
		_hasLost = hasLost;
		_stopRequested = stopRequested;
		_endGame = endGame;
	}

	function getSettings() {
		return {
			hasLost: _hasLost,
			stopRequested: _stopRequested,
			endGame: _endGame
		};
	}

	function startCountDown(observer) {
		_counter = _baseTime;
		_hasLost = false;
		_stopRequested = false;
		_endGame = false;
		_observer = observer;
		_notify(_counter);
		_timerID = setInterval(_countDown, 1000);
	}

	return {
		startCountDown: startCountDown,
		updateSettings: updateSettings,
		getSettings: getSettings
	};
})();

// Functional Component using the State Hook
const Timer = () => {
	const game = useSelector((state) => state.game);
	const timerDetails = useSelector((state) => state.timer);
	const dispatch = useDispatch();

	const timeSign = '⏳';

	// Declare a new state variable, which we'll call "count"
	const [ count, setCount ] = useState(0);

	const { hasLost, stopRequested, endGame } = timerCountDown.getSettings();
	if (
		hasLost !== game.hasLost ||
		stopRequested !== timerDetails.stopRequested ||
		endGame !== (game.hasWon && game.isOver)
	) {
		timerCountDown.updateSettings(game.hasLost, timerDetails.stopRequested, game.hasWon && game.isOver);
	}

	if (game.isNew) {
		const observer = {
			update: (newTime) => setCount(newTime),
			dispatchStopTimer: () => dispatch(actionStopTimer(timerDetails)),
			dispatchTimeIsUp: () => dispatch(actionTimeIsUp())
		};
		timerCountDown.startCountDown(observer);
		dispatch(actionStartTimer());
		dispatch(actionGameStarted(game));
	}

	return (
		<React.Fragment>
			{count <= 10 && (
				<button type="button" className="btn btn-warning" disabled>
					{timeSign}{' '}
					<span className="badge badge-light">
						<font color="red">{count}</font>
					</span>
				</button>
			)}
			{count > 10 && (
				<button type="button" className="btn btn-warning" disabled>
					{timeSign} <span className="badge badge-light">{count}</span>
				</button>
			)}
		</React.Fragment>
	);
};

export default Timer;
