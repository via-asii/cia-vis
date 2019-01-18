import React from 'react';
import Tick from './Tick';

const YAxis = (props) => {
	const {nTicks, range} = props
	const tickVal = (range[1]-range[0])/nTicks
	return (
		<g transform={`translate(${props.yPos},${props.xPos})`} fill="none" font-size="10" font-family="sans-serif" text-anchor="middle">
			<path className="domain" stroke="currentColor" d={`M-0.5,0V${props.height}`}></path>
			{[...Array(nTicks).keys()].map((i) => 
				<Tick 
					text={range[1] - (tickVal*i)}
					y={props.height/(nTicks) * i}
				/>
			)}
		</g>
	)
}

export default YAxis;

