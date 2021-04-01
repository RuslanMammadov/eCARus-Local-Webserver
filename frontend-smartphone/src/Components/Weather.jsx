//

//haben wir nicht verwendet, hatten wichtigeres zu fixen und zu tun
//(Steuerung der Ebenen durch Touchpad zum Beispiel)
//(Gott war das frustrierend, und die Lösung war zu simpel)

//ansonsten ist alles andere genauso aufgebaut wie vieles (Battery.jsx) zum Beispiel

import React, { Component } from "react";

class Weather extends Component {
  constructor() {
    super();
    this.state = {
      temperature: false
    };
  }
  componentDidMount() {
    this.props.socketinit.on("dataTemperature", datatemperature =>
      this.setState({ temperature: datatemperature })
    );
  }
  render() {
    const { temperature } = this.state;
    var temperatureC = (temperature - 32) / 1.8;

    return <h1 style={{ textAlign: "center" }}>München: {temperatureC}°C</h1>;
  }
}
export default Weather;
