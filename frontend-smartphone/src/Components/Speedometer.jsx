//
import React, { Component } from "react";
import ReactSpeedometer from "react-d3-speedometer";

const width = (window.innerWidth / 100) * 45;
const height = width * 0.55;

class Speedometer extends Component {
  constructor() {
    super();
    this.state = {
      speed: 0 //default Geschwindigkeit ist 0
    };
  }
  componentDidMount() {
    //Daten von Backend Laden
    this.props.socketinit.on("dataSpeed", dataspeed =>
      this.setState({ speed: dataspeed })
    );
  }
  render() {
    const { speed } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
        <ReactSpeedometer //ab hier relativ selbsterklärend
          maxValue={50}
          value={speed}
          needleColor="black"
          startColor="#A5B8F0"
          segments={5}
          endColor={"#0D2BEA"}
          needleTransition={"easeLinear"}
          needleTransitionDuration={100}
          ringWidth={30}
          textColor={"#010311"}
          height={height}
          width={width}
        />
        <h1>{speed}km/h</h1>
      </div>
    );
  }
}
export default Speedometer;
