//
// Vass Cisse
//

import React, { useMemo } from 'react';
import { utils } from '../utils';
import { useSelector } from 'react-redux';

// Stateless Functional Component
const Bubble = (props) => {
	const timerDetails = useSelector((state) => state.timer);

	const isClickable = !timerDetails.timeIsUp && utils.isNotDeletedColor(props.bubble.color);
	const className = isClickable ? 'bubble bubble--clickable' : 'bubble';
	const bubbleStyle = useMemo(() => ({ backgroundColor: props.bubble.color }), [ props.bubble.color ]);

	return (
		<React.Fragment>
			{isClickable && <div className={className} style={bubbleStyle} onClick={() => props.onDelete(props.bubble)} />}
			{!isClickable && <div className={className} style={bubbleStyle} />}
		</React.Fragment>
	);
};

export default Bubble;
