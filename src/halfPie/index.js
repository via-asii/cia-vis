import React from "react";
import { scaleOrdinal, schemeCategory10 } from 'd3';

const color = scaleOrdinal(schemeCategory10);

const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
};

const describeArc = (x, y, radius, startAngle, endAngle) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  const d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y
  ].join(" ");

  return d;
};

let percToAngle = n => {
  return (180 / 100) * n;
};

class HalfPie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let offset = 270;
    let width = this.props.width ? this.props.width : 100;
    let height = this.props.height ? this.props.height : 50;
    let thickness = this.props.thickness ? this.props.thickness : 20;
    let x = width / 2;
    let y = height;
    let radius = width / 2 - thickness;

    return (
      <svg className={`half-pie ${this.props.customClass}`} width={width} height={height}>
        {this.props.data.map((d, i) => {
          let angle = percToAngle(d.value);
          let startA = offset;
          offset += angle;
          return (
            <path
              key={i}
              d={describeArc(x, y, radius, startA, startA + angle)}
              fill="none"
              stroke={d.color ? d.color : color(i)}
              strokeWidth={thickness}
            />
          );
        })}
      </svg>
    );
  }
}

export default HalfPie;
