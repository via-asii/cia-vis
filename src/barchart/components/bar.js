import React from 'react';

const Bar = (props) => {
	const color = props.focused ? "#EFCF58" : "#90a3b2";
	return (
		<rect 
			stroke="white" 
			className="bar" 
			fill="#90a3b2" 
			y={props.cheight - props.height} 
			x={props.x} 
			width={props.width} 
			height={props.height}
			onMouseEnter={props.mouseEnter}
			onMouseLeave={props.mouseLeave}
			>
		</rect>
	)
}

export default Bar;