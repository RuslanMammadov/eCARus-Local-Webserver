//

//ähnliche Kommentare wie Battery.jsx
//so langsam macht es keinen Spaß mehr, immer dasselbe zu kommentieren

import React, { Component } from "react";

import lLightOff from "../picsTurnSignal/leftSmallBlanc.png";
import lLightOn from "../picsTurnSignal/leftSmallGreen.png";

class TurnSignalDemoLeft extends Component {
  constructor() {
    super();
    this.state = {
      lflash: false
    };
  }
  componentDidMount() {
    this.props.socketinit.on("dataLflash", datalflash =>
      this.setState({ lflash: datalflash })
    );
  }
  render() {
    const { lflash } = this.state;

    return (
      <div align="right">
        {(() => {
          switch (lflash) {
            case 0:
              return <img src={lLightOff} alt={"left turn signal off"} />;
            case 1:
              return <img src={lLightOn} alt={"left turn signal on"} />;
            default:
              return <img src={lLightOff} alt={"left turn signal corrupt"} />;
          }
        })()}
      </div>
    );
  }
}
export default TurnSignalDemoLeft;
