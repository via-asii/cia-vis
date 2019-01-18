import React from 'react';

const Tick = (props) => {
	return props.axis === "x" ?
	(
		<g className="tick" opacity="1" transform={`translate(${props.x},0)`}>
			<line stroke="currentColor" y2="6"></line>
			<text fill="currentColor" y="9" dy="0.71em">{props.text}</text>
		</g>
	) 
		: 
	(
		<g className="tick" opacity="1" transform={`translate(0,${props.y})`}>
			<line stroke="currentColor" x2="-6" ></line>
			<text textAnchor="end" fill="currentColor" x="-8" y="" dy="0.32em">{props.text}</text>
		</g>
	)
}

export default Tick;