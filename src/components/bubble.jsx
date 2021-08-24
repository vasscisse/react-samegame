//
// Vass Cisse
//

import React from 'react';
import { utils } from '../utils';
import { useSelector } from 'react-redux';

// Stateless Functional Component
const Bubble = (props) => {
	var bubbleStyle = {
		padding: 3,
		margin: 3,
		display: 'inline-block',
		backgroundColor: props.bubble.color,
		borderRadius: '50%',
		width: 40,
		height: 40
	};

	const timerDetails = useSelector((state) => state.timer);

	const isClickable = !timerDetails.timeIsUp && utils.isNotDeletedColor(props.bubble.color);
	if (isClickable) {
		bubbleStyle.cursor = 'pointer';
	}

	return (
		<React.Fragment>
			{isClickable && <div style={bubbleStyle} onClick={() => props.onDelete(props.bubble)} />}
			{!isClickable && <div style={bubbleStyle} />}
		</React.Fragment>
	);
};

export default Bubble;
