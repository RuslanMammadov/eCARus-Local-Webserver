//

//Kommentare analog in Abblendlicht.jsx, falls Fragen bitte dort zuerst lesen und versuchen zu verstehen
import React, { Component } from "react";
import An from "../picsLights/StandlichtOn.jpg";
import Aus from "../picsLights/StandlichtOff.jpg";
import "./Buttons.css";

class Standlicht extends Component {
  constructor() {
    super();
    this.state = {
      light: 0,
      prev: 0
    };
    // This binding is necessary to make `this` work in the callback
    this.turnOn = this.turnOn.bind(this);
    this.turnOff = this.turnOff.bind(this);
  }

  componentDidMount() {
    this.setState({ prev: this.state.light });
    this.props.socketinit.on("dataLights", datalights =>
      this.setState({ light: datalights })
    );
  }

  turnOn() {
    this.props.socketinit.emit("clickedStandlicht", 1);
  }

  turnOff() {
    this.props.socketinit.emit("clickedStandlicht", 0);
  }

  render() {
    const { light } = this.state;
    const { prev } = this.state;

    switch (light) {
      case 3:
        var tmplight = 1;
        break;

      default:
        tmplight = 0;
        break;
    }

    switch (prev) {
      case 3:
        var tmpprev = 1;
        break;

      default:
        tmpprev = 0;
        break;
    }

    // if (
    //   (tmplight === 1 && tmpprev === 1) ||
    //   (tmplight === 0 && tmpprev === 0)
    // ) {
    //   //war an und ist immer noch an
    //   //this.props.socketinit.emit("clickedStandlicht", 2);
    // }

    return (
      <div align="right">
        {(() => {
          switch (tmplight) {
            case 0:
              return (
                <button class="button button5">
                  <img src={Aus} alt="Standlicht" onClick={this.turnOn} />
                </button>
              );
            case 1:
              return (
                <button class="button button5">
                  <img src={An} alt="Standlicht" onClick={this.turnOff} />
                </button>
              );
            default:
              return <img src={Aus} alt="Standlicht" />;
          }
        })()}
      </div>
    );
  }
}

export default Standlicht;
