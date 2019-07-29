import React, { Component } from 'react';
import { scaleLinear, scaleTime, line, timeFormat, extent, timeParse, max, curveCatmullRom, format } from 'd3';

const lineColors = ['#6D455C','#585975','#346C7C','#277C6E','#4E8653','#81893C','#B6863E','#E07F61']
 const data = [
 [
   {a: '01/01/2019', b: 3},
   {a: '01/02/2019', b: 6},
   {a: '01/03/2019', b: 2},
   {a: '01/04/2019', b: 12},
   {a: '01/05/2019', b: 8}
 ],
 [
   {a: '01/01/2019', b: 15},
   {a: '01/02/2019', b: 8},
   {a: '01/03/2019', b: 7},
   {a: '01/04/2019', b: 10},
   {a: '01/05/2019', b: 12}
 ],
 [
   {a: '01/01/2019', b: 0},
   {a: '01/02/2019', b: 1},
   {a: '01/03/2019', b: 7},
   {a: '01/04/2019', b: 2},
   {a: '01/05/2019', b: 1}
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


    var xFormat = "%d-%B-%Y";;
		var parseTime = timeParse("%d/%m/%Y");

		const flat = []

		 data.forEach((d) => {
		 	d.forEach((v) => {
		 		flat.push(v)
		 	})
		 })

    //number formatter
    const yFormat = format('.2')
    
    const x = scaleTime()
	    // .domain([xMin, xMax])
	    .domain(extent(flat, function(d) { return parseTime(d.a); }))
    	.rangeRound([margin, w]);

    
    
    // x.domain(extent(data, function(d) { return parseTime(d.date); }));

    // const x = scaleLinear()
    //   .domain([xMin, xMax]) //domain: [min,max] of a
    //   .range([margin, w])
    
    //y scale
    const y = scaleLinear()
      // .domain([0, yMax]) // domain [0,max] of b (start from 0)
     	.domain(extent(flat, function(d) { return d.b; }))
      .range([h, margin])
    
    //line generator: each point is [x(d.a), y(d.b)] where d is a row in data
    // and x, y are scales (e.g. x(10) returns pixel value of 10 scaled by x)
    
    const linea = line()
      .x(d => x(parseTime(d.a)) )
      .y(d => y(d.b))
      // .curve(curveCatmullRom.alpha(0.5)) //curve line
    
    const xTicks = x.ticks(6).map(d => (
        x(d) > margin && x(d) < w ? 
          <g transform={`translate(${x(d)},${h + (margin/2)})`}>  
            <text>{timeFormat(xFormat)(d)}</text>
            <line style={{stroke: '#000'}} x1='0' x1='0' y1='0' y2='5' transform="translate(0,-20)"/>
          </g>
        : null
    ))

    const yTicks = y.ticks(5).map(d => (
        y(d) > 10 && y(d) < h ? 
          <g transform={`translate(${margin},${y(d)})`}>  
            <text x="-12" y="5">{yFormat(d)}</text>
            <line style={{stroke: '#000'}} x1='0' x1='5' y1='0' y2='0' transform="translate(-5,0)"/>
            <line style={{stroke: '#000'}} className='gridline' x1='0' x1={w - margin} y1='0' y2='0' transform="translate(-5,0)"/> 
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

		 {
		 	data.map((d, i) => {
		 		// console.log(linea(d));
		 		// debugger;
				const stroke = lineColors[i]
				return <path key={i} style={{stroke, ...linestyle}} d={linea(d)}/>
		 	}
		 )
		 }


			<g className="axis-labels">
			 {xTicks}
			</g>
	    <g className="axis-labels">
	     {yTicks}
	   	</g>
		</svg>
	  );
	}
}



export default LineChart;