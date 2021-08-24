//
// Vass Cisse
//

//Revealing module pattern
export const utils = (function() {
	const _maxWidth = 14;
	const _maxHeight = 10;
	const _activeColors = [ '#E94F37', '#1C89BF', '#A1D363', '#393E41' ];
	const _deletedColor = '#d5d9da';
	const _bonus10 = 10;
	const _bonus100 = 100;

	const _winingScore = 500;

	const _emptyGameData = {
		bubbles: [],
		score: 0,
		previousScore: 0,
		countFallen: 0,
		countBonus10: 0,
		countBonus100: 0,
		isNew: true,
		hasWon: false,
		isOver: false,
		hasLost: false
	};

	function _isNotNull(value) {
		return typeof value != 'undefined' && value;
	}

	function _getBubbleAt(i, j, bubbles) {
		let obj = bubbles.filter((b) => {
			return b.x === i && b.y === j;
		});
		return _isNotNull(obj) ? obj[0] : null;
	}

	function _moveOneBubbleDown(belowBubble, bubble, bubbles) {
		let count = 0;
		if (belowBubble.color === _deletedColor && bubble.color !== _deletedColor) {
			const index1 = bubbles.indexOf(bubble);
			bubbles[index1] = { ...bubble };
			bubbles[index1].color = _deletedColor;

			const index2 = bubbles.indexOf(belowBubble);
			bubbles[index2] = { ...belowBubble };
			bubbles[index2].color = bubble.color;

			count = 1;
		}
		return count;
	}

	function _moveBubblesDown(bubbles, total) {
		let counts = 0;
		for (var i = 0; i < _maxHeight; i++) {
			for (var j = 0; j < _maxWidth; j++) {
				if (i + 1 < _maxHeight) {
					let bubble = _getBubbleAt(i, j, bubbles);
					let belowBubble = _getBubbleAt(i + 1, j, bubbles);
					if (_isNotNull(bubble) && _isNotNull(belowBubble)) {
						counts += _moveOneBubbleDown(belowBubble, bubble, bubbles);
					}
				}
			}
		}

		total += counts;

		if (counts > 0) {
			_moveBubblesDown(bubbles, total);
		}

		return total;
	}

	function _deleteBubbleRecursively(color, bubble, bubbles) {
		if (_isNotNull(bubble)) {
			let i = bubble.x;
			let j = bubble.y;
			let valid = i >= 0 && i < _maxHeight && j >= 0 && j < _maxWidth && color === bubble.color;

			if (valid) {
				// Mark targeted bubble as deleted
				const index = bubbles.indexOf(bubble);
				bubbles[index] = { ...bubble };
				bubbles[index].color = _deletedColor;

				//recursive call for bubbles around
				_deleteBubbleRecursively(color, _getBubbleAt(i - 1, j, bubbles), bubbles);
				_deleteBubbleRecursively(color, _getBubbleAt(i + 1, j, bubbles), bubbles);
				_deleteBubbleRecursively(color, _getBubbleAt(i, j - 1, bubbles), bubbles);
				_deleteBubbleRecursively(color, _getBubbleAt(i, j + 1, bubbles), bubbles);
			}
		}
	}

	function _incrementScoreAndBonus(score, fallen, bonus10, bonus100) {
		let newScore = score + fallen;
		let newBonus10 = bonus10;
		let newBonus100 = bonus100;
		//bonus
		if (fallen >= 10) {
			newScore += _bonus100;
			newBonus100 += 1;
		} else if (fallen >= 5) {
			newScore += _bonus10;
			newBonus10 += 1;
		}

		return {
			score: newScore,
			countBonus10: newBonus10,
			countBonus100: newBonus100
		};
	}

	function _hasWon(score) {
		if (score >= _winingScore) return true;
		return false;
	}

	function _isOver(bubbles) {
		let foundUndeletedBubble = false;
		loop: for (var i = 0; i < _maxHeight; i++) {
			for (var j = 0; j < _maxWidth; j++) {
				const bubble = _getBubbleAt(i, j, bubbles);
				if (bubble !== null && bubble.color !== _deletedColor) {
					foundUndeletedBubble = true;
					break loop;
				}
			}
		}

		return !foundUndeletedBubble;
	}

	function startNewGame(previousScorePayload) {
		let bubbles = [];
		let count = 1;
		for (var i = 0; i < _maxHeight; i++) {
			for (var j = 0; j < _maxWidth; j++) {
				let obj = {
					id: count,
					x: i,
					y: j,
					color: _activeColors[Math.floor(Math.random() * _activeColors.length)]
				};
				bubbles.push(obj);
				count++;
			}
		}

		const newGameData = { ..._emptyGameData };
		newGameData.bubbles = bubbles;
		newGameData.previousScore = previousScorePayload;

		return newGameData;
	}

	function updateBoard(gamePayload) {
		if (gamePayload.bubble.color === _deletedColor) {
			return;
		}

		let { bubbles, score: xscore, countBonus10: bonus10, countBonus100: bonus100 } = gamePayload.game;
		_deleteBubbleRecursively(gamePayload.bubble.color, gamePayload.bubble, bubbles);
		let countFallen = _moveBubblesDown(bubbles, 0);
		let { score, countBonus10, countBonus100 } = _incrementScoreAndBonus(xscore, countFallen, bonus10, bonus100);

		const isOver = _isOver(bubbles);
		const hasWon = _hasWon(score);
		const hasLost = isOver && !hasWon;

		const newGameData = { ...gamePayload.game };
		newGameData.bubbles = bubbles;
		newGameData.score = score;
		newGameData.countFallen = countFallen;
		newGameData.countBonus10 = countBonus10;
		newGameData.countBonus100 = countBonus100;
		newGameData.hasWon = hasWon;
		newGameData.isOver = isOver;
		newGameData.hasLost = hasLost;

		return newGameData;
	}

	function gameHasStarted(gamePayload) {
		const newGameData = { ...gamePayload };
		newGameData.isNew = false;
		return newGameData;
	}

	function isNotDeletedColor(color) {
		if (color !== _deletedColor) {
			return true;
		}
		return false;
	}

	return {
		emptyGameData: _emptyGameData,
		startNewGame: startNewGame,
		gameHasStarted: gameHasStarted,
		updateBoard: updateBoard,
		isNotDeletedColor: isNotDeletedColor
	};
})();
