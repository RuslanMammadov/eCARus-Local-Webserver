//

//Abstandsensoren senden Werte von 0 bis 2, werden hier dynamisch angezeigt
//momentan nur 2 Sensoren (vorne rechts und vorne links) eingebaut

import React, { Component } from "react";
import Radar from "react-d3-radar";

//Maße von Auto, fix
const sv = [0.3];
const svr = [0.2];
const shr = [0.2];
const sh = [0.3];
const shl = [0.2];
const svl = [0.2];

//Maße Digramm
const max = [2];
const width = window.innerWidth;
const height = window.innerHeight * 1.8;

class Sensor extends Component {
  constructor() {
    super();
    this.state = {
      sensorR: 2,
      sensorL: 2
    };
  }

  componentDidMount() {
    this.props.socketinit.on("dataSensorR", datasensorr =>
      this.setState({ sensorR: datasensorr })
    );
    this.props.socketinit.on("dataSensorL", datasensorl =>
      this.setState({ sensorL: datasensorl })
    );
  }

  render() {
    const { sensorR } = this.state;
    const { sensorL } = this.state;
    return (
      <Radar
        width={width}
        height={height}
        padding={0}
        domainMax={max}
        highlighted={null}
        data={{
          variables: [
            { key: "v" },
            { key: "vr" },
            { key: "hr" },
            { key: "h" },
            { key: "hl" },
            { key: "vl" }
          ],
          sets: [
            {
              //Auto
              key: "Abstand",
              values: {
                v: (sensorR + sensorL) / 2,
                vr: sensorR,
                hr: 0,
                h: 0,
                hl: 0,
                vl: sensorL
              }
            },
            {
              //Abstand
              key: "Auto",
              values: {
                v: sv,
                vr: svr,
                hr: shr,
                h: sh,
                hl: shl,
                vl: svl
              }
            }
          ]
        }}
      />
    );
  }
}

export default Sensor;
