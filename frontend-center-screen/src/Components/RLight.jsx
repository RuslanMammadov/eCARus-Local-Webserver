//

//Kommentare analog in Abblendlicht.jsx, falls Fragen bitte dort zuerst lesen und versuchen zu verstehen
import React, { Component } from "react";
import An from "../picsPRNDs/RAn.jpg";
import Aus from "../picsPRNDs/RAus.jpg";
import "./Buttons.css";

class RLicht extends Component {
  constructor() {
    super();
    this.state = {
      light: 1,
      prev: 0
    };
    // This binding is necessary to make `this` work in the callback
    this.RGearIn = this.RGearIn.bind(this);
    this.RGearOut = this.RGearOut.bind(this);
  }

  componentDidMount() {
    this.setState({ prev: this.state.light });
    this.props.socketinit.on("dataGang", dataRlights =>
      this.setState({ light: dataRlights })
    );
  }

  RGearIn() {
    this.props.socketinit.emit("clickedR", 1);
  }

  RGearOut() {
    this.props.socketinit.emit("clickedR", 0);
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

    if (
      (tmplight === 1 && tmpprev === 1) ||
      (tmplight === 0 && tmpprev === 0)
    ) {
      //war an und ist immer noch an
      // TODO: It does not work that way. Firstly, you never change prev, secondly, backend does not need it, because 
      // backend handles it itself.
      // Speak with Backend if you want reimplement it.
      // this.props.socketinit.emit("clickedR", 2);
    }

    return (
      <div align="right">
        {(() => {
          switch (tmplight) {
            case 0:
              return (
                <button class="button button3">
                  <img src={Aus} alt="Rlicht" onClick={this.RGearIn} />
                </button>
              );
            case 1:
              return (
                <button class="button button3">
                  <img src={An} alt="Rlicht" onClick={this.RGearOut} />
                </button>
              );
            default:
              return <img src={Aus} alt="Rlicht" />;
          }
        })()}
      </div>
    );
  }
}

export default RLicht;
