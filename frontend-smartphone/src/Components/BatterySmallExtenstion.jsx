//

//selbe Kommentare wie Battery.jsx
//wenn hier Fragen auftauchen, lest und versteht es dort
//so langsam macht das Kommentieren keinen Spaß mehr
import React, { Component } from "react";

class BatterySmallExtension extends Component {
  constructor() {
    super();
    this.state = {
      battery: 100
    };
  }

  componentDidMount() {
    this.props.socketinit.on("dataBattery", databattery =>
      this.setState({ battery: databattery })
    );
    //this.props.socketinit.emit("gotBatterySmallExtension", 1);
  }

  render() {
    const { battery } = this.state;

    if (battery > 100) {
      var bat = 100;
    } else {
      bat = battery;
    }

    return (
      <div>
        <h4 align="center">{bat}%</h4>
      </div>
    );
  }
}

export default BatterySmallExtension;
