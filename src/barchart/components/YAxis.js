import React from 'react';
import Tick from './Tick';

const YAxis = (props) => {
	const {nTicks, range} = props
	const tickVal = (range[1]-range[0])/(nTicks - 1)

	return (
		<g transform={`translate(${props.yPos},${props.xPos})`} fill="none" font-size="10" font-family="sans-serif" text-anchor="middle">
			<path className="domain" stroke="currentColor" d={`M-0.5,0V${props.height}`}></path>
			{[...Array(nTicks).keys()].map((i) => 
				<Tick 
					text={parseInt(range[1]-(tickVal*i))}
					y={props.height/(nTicks-1) * i}
					axis="y"
				/>
			)}
		</g>
	)
}

export default YAxis;

