//
// Vass Cisse
//

const _maxWidth = 14;
const _maxHeight = 10;
const _activeColors = [ '#E94F37', '#1C89BF', '#A1D363', '#393E41' ];
const _deletedColor = '#d5d9da';
const _bonus10 = 10;
const _bonus100 = 100;
const _winningScore = 500;

export const emptyGameData = {
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

function _isTruthy(value) {
	return typeof value !== 'undefined' && value;
}

function _getBubbleAt(i, j, bubbles) {
	let obj = bubbles.filter((b) => {
		return b.x === i && b.y === j;
	});
	return _isTruthy(obj) ? obj[0] : null;
}

function _onePassMoveBubblesDown(bubbles) {
	const updates = new Map();
	let moved = 0;
	for (let i = 0; i < _maxHeight - 1; i++) {
		for (let j = 0; j < _maxWidth; j++) {
			const bubble = _getBubbleAt(i, j, bubbles);
			const belowBubble = _getBubbleAt(i + 1, j, bubbles);
			if (
				_isTruthy(bubble) &&
				_isTruthy(belowBubble) &&
				belowBubble.color === _deletedColor &&
				bubble.color !== _deletedColor
			) {
				updates.set(bubbles.indexOf(bubble), _deletedColor);
				updates.set(bubbles.indexOf(belowBubble), bubble.color);
				moved++;
			}
		}
	}
	if (moved === 0) return { bubbles, moved: 0 };
	const next = bubbles.map((b, k) => (updates.has(k) ? { ...b, color: updates.get(k) } : b));
	return { bubbles: next, moved };
}

function _moveBubblesDown(bubbles) {
	let current = bubbles;
	let total = 0;
	let moved;
	do {
		const result = _onePassMoveBubblesDown(current);
		current = result.bubbles;
		moved = result.moved;
		total += moved;
	} while (moved > 0);
	return { bubbles: current, total };
}

function _collectDeletableIndices(color, bubble, bubbles, visited) {
	if (!_isTruthy(bubble) || bubble.color !== color) return;
	if (bubble.x < 0 || bubble.x >= _maxHeight || bubble.y < 0 || bubble.y >= _maxWidth) return;
	const idx = bubbles.indexOf(bubble);
	if (idx < 0 || visited.has(idx)) return;
	visited.add(idx);
	_collectDeletableIndices(color, _getBubbleAt(bubble.x - 1, bubble.y, bubbles), bubbles, visited);
	_collectDeletableIndices(color, _getBubbleAt(bubble.x + 1, bubble.y, bubbles), bubbles, visited);
	_collectDeletableIndices(color, _getBubbleAt(bubble.x, bubble.y - 1, bubbles), bubbles, visited);
	_collectDeletableIndices(color, _getBubbleAt(bubble.x, bubble.y + 1, bubbles), bubbles, visited);
}

function _deleteBubbleRecursively(color, bubble, bubbles) {
	const visited = new Set();
	_collectDeletableIndices(color, bubble, bubbles, visited);
	if (visited.size === 0) return bubbles;
	return bubbles.map((b, i) => (visited.has(i) ? { ...b, color: _deletedColor } : b));
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
	return score >= _winningScore;
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

export function startNewGame(previousScorePayload) {
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

	const newGameData = { ...emptyGameData };
	newGameData.bubbles = bubbles;
	newGameData.previousScore = previousScorePayload;

	return newGameData;
}

export function updateBoard(gamePayload) {
	if (gamePayload.bubble.color === _deletedColor) {
		return;
	}

	const { score: xscore, countBonus10: bonus10, countBonus100: bonus100 } = gamePayload.game;

	const bubblesAfterDelete = _deleteBubbleRecursively(
		gamePayload.bubble.color,
		gamePayload.bubble,
		gamePayload.game.bubbles
	);
	const { bubbles, total: countFallen } = _moveBubblesDown(bubblesAfterDelete);
	const { score, countBonus10, countBonus100 } = _incrementScoreAndBonus(xscore, countFallen, bonus10, bonus100);

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

export function gameHasStarted(gamePayload) {
	const newGameData = { ...gamePayload };
	newGameData.isNew = false;
	return newGameData;
}

export function isNotDeletedColor(color) {
	return color !== _deletedColor;
}
