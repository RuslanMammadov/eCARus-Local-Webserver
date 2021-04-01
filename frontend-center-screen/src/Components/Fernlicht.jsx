//

//Kommentare analog in Abblendlicht.jsx, falls Fragen bitte dort zuerst lesen und versuchen zu verstehen
import React, { Component } from "react";
import An from "../picsLights/FernlichtOn.jpg";
import Aus from "../picsLights/FernlichtOff.jpg";
import "./Buttons.css";

class Fernlicht extends Component {
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
    this.props.socketinit.emit("clickedFernlicht", 1);
  }

  turnOff() {
    this.props.socketinit.emit("clickedFernlicht", 0);
  }

  render() {
    const { light } = this.state;
    const { prev } = this.state;

    switch (light) {
      case 2:
        var tmplight = 1;
        break;

      default:
        tmplight = 0;
        break;
    }

    switch (prev) {
      case 2:
        var tmpprev = 1;
        break;

      default:
        tmpprev = 0;
        break;
    }

    if (
      (tmplight === 1 && tmpprev === 1) ||
      (tmplight === 0 && tmpprev === 0)
    ) {
      //war an und ist immer noch an
      //this.props.socketinit.emit("clickedFernlicht", 2);
    }

    return (
      <div align="right">
        {(() => {
          switch (tmplight) {
            case 0:
              return (
                <button class="button button5">
                  <img src={Aus} alt="Fernlicht" onClick={this.turnOn} />
                </button>
              );
            case 1:
              return (
                <button class="button button5">
                  <img src={An} alt="Fernlicht" onClick={this.turnOff} />
                </button>
              );
            default:
              return <img src={Aus} alt="Fernlicht" />;
          }
        })()}
      </div>
    );
  }
}

export default Fernlicht;
