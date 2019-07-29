import React, { Component } from 'react';
import { scaleLinear, scaleTime, line, timeFormat, extent, timeParse, max, curveCardinal, format } from 'd3';

const lineColors = ['#6D455C','#585975','#346C7C','#277C6E','#4E8653','#81893C','#B6863E','#E07F61']
const mockData = [
 [
   {date: '01/2019', d: 3},
   {date: '02/2019', d: 6},
   {date: '03/2019', d: 2},
   {date: '04/2019', d: 12},
   {date: '05/2019', d: 8}
 ],
 [
   {date: '01/2019', d: 15},
   {date: '02/2019', d: 8},
   {date: '03/2019', d: 7},
   {date: '04/2019', d: 10},
   {date: '05/2019', d: 12}
 ],
 [
   {date: '01/2019', d: 0},
   {date: '02/2019', d: 1},
   {date: '03/2019', d: 7},
   {date: '04/2019', d: 2},
   {date: '05/2019', d: 1}
 ]]
 


class LineChart extends Component {
	constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
  	const margin = 40
  	const width = this.width || 750;
		const height = this.props.height || 550;
		
		const h = height - 2 * margin, w = width - 2 * margin

		const data = this.props.data || mockData;

    var xFormat = "%b-%Y";;
		var parseTime = timeParse("%m/%Y");

		const flat = []

		 data.forEach((d) => {
		 	d.forEach((v) => {
		 		flat.push(v)
		 	})
		 })

    //number formatter
    const yFormat = format('.2')
    
    const x = scaleTime()
	    .domain(extent(flat, function(d) { return parseTime(d.date); }))
    	.rangeRound([margin, w]);
    
    //y scale
    const y = scaleLinear()
      // .domain([0, yMax]) // domain [0,max] of b (start from 0)
     	.domain(extent(flat, function(d) { return d.d; }))
      .range([h, margin])
    
    //line generator: each point is [x(d.a), y(d.b)] where d is a row in data
    // and x, y are scales (e.g. x(10) returns pixel value of 10 scaled by x)
    
    const lineF = line()
      .x(d => x(parseTime(d.date)) )
      .y(d => y(d.d))
      .curve(curveCardinal) //curve line
    
    const xTicks = x.ticks(6).map(d => (
      <g key={d} transform={`translate(${x(d)},${h + (margin/2)})`}>  
        <text style={{textAnchor: 'middle'}}>{timeFormat(xFormat)(d)}</text>
        <line style={{stroke: '#000'}} x1='0' x1='0' y1='0' y2='5' transform="translate(0,-20)"/>
      </g>
    ))

    const yTicks = y.ticks(5).map(d => (
      y(d) > 10 && y(d) < h ? 
        <g key={d} transform={`translate(${margin},${y(d)})`}>  
          <text style={{textAnchor: 'middle'}} x="-12" y="5">{yFormat(d)}</text>
          <line style={{stroke: '#000'}} x1='0' x1='5' y1='0' y2='0' transform="translate(-5,0)"/>
          <line style={{stroke: '#AFB0BF', strokeWidth: '1px'}} className='gridline' x1='0' x1={w - margin} y1='0' y2='0' transform="translate(-5,0)"/> 
        </g>
      : null
    ))
		const linestyle = {
  		strokeWidth: '4px',
  		fill: 'none'
  	}
	  return (

		<svg width={width} height={height}>
			<line style={{stroke: '#000'}} className="axis" x1={margin} x2={w} y1={h} y2={h}/>
			<line style={{stroke: '#000'}} className="axis" x1={margin} x2={margin} y1={margin} y2={h}/>
			<g className="axis-labels">
			 {xTicks}
			</g>
	    <g className="axis-labels">
	     {yTicks}
	   	</g>
			{
				data.map((d, i) => {
					const stroke = lineColors[i]
					return <path key={i} style={{stroke, ...linestyle}} d={lineF(d)}/>
				})
		 	}

		</svg>
	  );
	}
}



export default LineChart;