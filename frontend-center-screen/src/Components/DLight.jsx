//

//Kommentare analog in Abblendlicht.jsx, falls Fragen bitte dort zuerst lesen und versuchen zu verstehen
import React, { Component } from "react";
import An from "../picsPRNDs/DAn.jpg";
import Aus from "../picsPRNDs/DAus.jpg";

import "./Buttons.css";

class DLicht extends Component {
  constructor() {
    super();
    this.state = {
      light: 1,
      prev: 0
    };
    // This binding is necessary to make `this` work in the callback
    this.DGearIn = this.DGearIn.bind(this);
    this.DGearOut = this.DGearOut.bind(this);
  }

  componentDidMount() {
    this.setState({ prev: this.state.light });
    this.props.socketinit.on("dataGang", dataDlights =>
      this.setState({ light: dataDlights })
    );
  }

  DGearIn() {
    this.props.socketinit.emit("clickedD", 1);
  }

  DGearOut() {
    this.props.socketinit.emit("clickedD", 0);
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
      //this.props.socketinit.emit("clickedD", 2);
    }

    return (
      <div align="right">
        {(() => {
          switch (tmplight) {
            case 0:
              return (
                <button class="button button3">
                  <img src={Aus} alt="Dlicht" onClick={this.DGearIn} />
                </button>
              );
            case 1:
              return (
                <button class="button button3">
                  <img src={An} alt="Dlicht" onClick={this.DGearOut} />
                </button>
              );
            default:
              return <img src={Aus} alt="Dlicht" />;
          }
        })()}
      </div>
    );
  }
}

export default DLicht;
