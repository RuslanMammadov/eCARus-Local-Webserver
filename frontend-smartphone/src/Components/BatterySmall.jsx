//

//selbe Kommentare wie Battery.jsx
//wenn hier Fragen auftauchen, lest und versteht es dort
//so langsam macht das Kommentieren keinen Spaß mehr
import React, { Component } from "react";

import Perfect from "../picsBattery/perfect_small.jpg";
import Good from "../picsBattery/good_small.jpg";
import Medium from "../picsBattery/medium_small.jpg";
import Critical from "../picsBattery/critical_small.jpg";
import Empty from "../picsBattery/empty_small.jpg";

class BatterySmall extends Component {
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
    //this.props.socketinit.emit("gotBatterySmall", 1);
  }

  render() {
    const { battery } = this.state;

    if (battery > 80) {
      var tmp = 0;
    } else if (battery <= 80 && battery > 60) {
      tmp = 1;
    } else if (battery <= 60 && battery > 40) {
      tmp = 2;
    } else if (battery <= 40 && battery > 20) {
      tmp = 3;
    } else {
      tmp = 4;
    }

    return (
      <div align="center">
        {(() => {
          switch (tmp) {
            case 0:
              return <img src={Perfect} alt={"battery perfect"} />;
            case 1:
              return <img src={Good} alt={"battery good"} />;
            case 2:
              return <img src={Medium} alt={"battery medium"} />;
            case 3:
              return <img src={Critical} alt={"battery critical"} />;
            default:
              return <img src={Empty} alt={"battery empty"} />;
          }
        })()}
      </div>
    );
  }
}

export default BatterySmall;
