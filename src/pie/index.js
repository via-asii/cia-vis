import React, { Component } from 'react';
import Arc from './components/Arc';
import { scaleOrdinal, schemeCategory10, arc, pie  } from 'd3';

class Pie extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	focus: null
    };
  }
	mouseEnter = (slice) => {
	  this.setState({ focus: slice });
	}
	mouseLeave = (slice) => {
	  this.setState({ focus: null });
	}
  render() {

	  const width = this.props.width || 260;
	  const height = this.props.height || 260;

		const {data} = this.props 

		const radius = Math.min(width, height) / 2;
		const color = scaleOrdinal(schemeCategory10);

		const arcfunc = arc()
			.innerRadius(0)
			.outerRadius(radius);

		const piefunc = pie()
			.value(function(d) { return d.value; })
			.sort(null);


		const focused = this.state.focus ? this.state.focus.label : null;
		const percent = this.props.isPercent ? '%' : null;
	  return (
		<svg className={`pie ${this.props.customClass}`} width={width} height={height}>
			<g transform={'translate(' + (width/2) + ',' + (height/2) + ')'}>
				{piefunc(data).map((slice, i) => 
					<Arc 
						key={slice.data.label}
						mouseEnter={()=>this.mouseEnter(slice.data)}
						mouseLeave={()=>this.mouseLeave(slice.data)}
						value={slice.data.value + '%'}
						d={arcfunc(slice)}
						fill={color(i)}
						focused={false}
					/>
				)}
			</g>
		</svg>
	  );
	}
}

export default Pie;