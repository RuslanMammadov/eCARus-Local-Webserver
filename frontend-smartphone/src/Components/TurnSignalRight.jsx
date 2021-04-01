//

//ähnliche Kommentare wie Battery.jsx
//so langsam macht es keinen Spaß mehr, immer dasselbe zu kommentieren

import React, { Component } from "react";

import rLightOff from "../picsTurnSignal/rightSmallBlanc.png";
import rLightOn from "../picsTurnSignal/rightSmallGreen.png";

class TurnSignalDemoRight extends Component {
  constructor() {
    super();
    this.state = {
      rflash: false,
      endpoint: "http://localhost:5000"
    };
  }
  componentDidMount() {
    this.props.socketinit.on("dataRflash", datarflash =>
      this.setState({ rflash: datarflash })
    );
    this.props.socketinit.emit("gotRflash", 1);
  }

  render() {
    const { rflash } = this.state;
    return (
      <div>
        {(() => {
          switch (rflash) {
            case 0:
              return <img src={rLightOff} alt={"right turn signal off"} />;
            case 1:
              return <img src={rLightOn} alt={"right turn signal on"} />;
            default:
              return <img src={rLightOff} alt={"right turn signal corrupt"} />;
          }
        })()}
      </div>
    );
  }
}
export default TurnSignalDemoRight;
