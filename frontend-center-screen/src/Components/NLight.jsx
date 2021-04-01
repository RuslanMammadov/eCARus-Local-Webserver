//

//Kommentare analog in Abblendlicht.jsx, falls Fragen bitte dort zuerst lesen und versuchen zu verstehen
import React, { Component } from "react";
import An from "../picsPRNDs/NAn.jpg";
import Aus from "../picsPRNDs/NAus.jpg";
import "./Buttons.css";

class NLicht extends Component {
  constructor() {
    super();
    this.state = {
      light: 1,
      prev: 0
    };
    // This binding is necessary to make `this` work in the callback
    this.NGearIn = this.NGearIn.bind(this);
    this.NGearOut = this.NGearOut.bind(this);
  }

  componentDidMount() {
    this.setState({ prev: this.state.light });
    this.props.socketinit.on("dataGang", dataNlights =>
      this.setState({ light: dataNlights })
    );
  }

  NGearIn() {
    this.props.socketinit.emit("clickedN", 1);
  }

  NGearOut() {
    this.props.socketinit.emit("clickedN", 0);
  }

  render() {
    const { light } = this.state;
    const { prev } = this.state;

    switch (light) {
      case 1:
        var tmplight = 1;
        break;

      default:
        tmplight = 0;
        break;
    }

    switch (prev) {
      case 1:
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
      // TODO: It does not work that way. Firstly, you never changes prev, secondly, backend does not need it, because
      // backend handles it itself.
      // Speak with Backend if you want reimplement it.
      // this.props.socketinit.emit("clickedN", 2);
    }

    return (
      <div align="right">
        {(() => {
          switch (tmplight) {
            case 0:
              return (
                <button class="button button3">
                  <img src={Aus} alt="Nlicht" onClick={this.NGearIn} />
                </button>
              );
            case 1:
              return (
                <button class="button button3">
                  <img src={An} alt="Nlicht" onClick={this.NGearOut} />
                </button>
              );
            default:
              return <img src={Aus} alt="Nlicht" />;
          }
        })()}
      </div>
    );
  }
}

export default NLicht;
