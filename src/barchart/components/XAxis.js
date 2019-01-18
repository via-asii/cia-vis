import React from 'react';
import Tick from './Tick';

const XAxis = (props) => {

	return (
		<g transform={`translate(${props.yPos},${props.xPos})`} fill="none" font-size="10" font-family="sans-serif" text-anchor="middle">
			<path className="domain" stroke="currentColor" d={`M0,0.5H${props.width}`}></path>
			{props.data.map((d,i) => 
				<Tick 
					x={(props.width/props.data.length)* i + (props.width/props.data.length)/2}
					text={d.label}
					axis="x"
				/>
			)}
		</g>
	)
}

export default XAxis;

