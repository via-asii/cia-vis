import React, { Component } from 'react';
import Bar from './components/bar';
import { scaleLinear, max} from 'd3';
// import * as d3 from "d3";

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: null
    };
  }
  mouseEnter = (d) => {
    this.setState({ focus: d });
  }
  mouseLeave = (d) => {
    this.setState({ focus: null });
  }
  render() {

    const width = this.props.width || 500;
    const height = this.props.height || 250;
    const padding = this.props.padding || 50;
    const color = this.props.color || '#32BAEF';
    const {data} = this.props 

    const linearScale = scaleLinear()
        .domain([0, max(data, (d) => d.value)])
        .range([0,height - (padding * 2)]);

    const barWidth = (width-padding*2)/data.length

    const focused = this.state.focus ? this.state.focus.label : null;
    const percent = this.props.isPercent ? '%' : null;
    return (
    <svg className={`bar-chart ${this.props.customClass}`} width={width} height={height}>
      <g transform={'translate(' + padding + ',' + padding + ')'}>
        {data.map((d, i) => 
          <Bar 
            key={d.label}
            width={barWidth}
            x={barWidth * i}
            cheight={height-(padding*2)}
            height={linearScale(d.value)}
            mouseEnter={()=>this.mouseEnter(d)}
            mouseLeave={()=>this.mouseLeave(d)}
            label={d.label}
            value={d.value + '%'}
            fill={color}
            focused={focused === d.label}
          />
        )}
      </g>
    </svg>
    );
  }
}

export default BarChart;