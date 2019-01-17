import React from 'react';

const Arc = (props) => {
	return (
		<g>
			<path onMouseEnter={props.mouseEnter} onMouseLeave={props.mouseLeave} d={props.d} fill={props.fill}></path>
			<g style={{display: props.focused ? 'block':'none' }} className="text-group">
				<text className="name-text" textAnchor="middle" dy="-1.2em">{props.label}</text>
				<text className="value-text" textAnchor="middle" dy=".6em">{props.value}</text>
			</g>
		</g>
	)
}

export default Arc;