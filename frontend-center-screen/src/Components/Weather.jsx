//

//selbe Kommentare wie in Smartphone

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