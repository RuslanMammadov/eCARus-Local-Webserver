//

import React, { Component } from "react";

//style Änderungen
//restlicher Code wie in Speedometer.jsx, nur in einfach
const centered = {
  position: "relative",
  top: window.innerWidth / 2,
  left: window.innerHeight / 2
};

class SpeedExtension extends Component {
  constructor() {
    super();
    this.state = {
      speedx: 0
    };
  }
  componentDidMount() {
    //Daten von Backend Laden
    this.props.socketinit.on("dataSpeed", dataspeed =>
      this.setState({ speedx: dataspeed })
    );
  }

  render() {
    const { speedx } = this.state;

    return (
      <div style={{ textAlign: "center" }}>
        <h1 class={centered}>{speedx}km/h</h1>
      </div>
    );
  }
}

export default SpeedExtension;
