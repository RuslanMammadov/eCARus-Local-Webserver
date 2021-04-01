//

import React, { Component } from "react";

import An from "../picsLights/AbblendlichtOn.jpg";
import Aus from "../picsLights/AbblendlichtOff.jpg";
import "./Buttons.css";

class Abblendlicht extends Component {
  constructor() {
    super();
    this.state = {
      light: 0, //Status des Lichts
      prev: 0 //vorheriger Status des Abblendlichts
    };
    // This binding is necessary to make `this` work in the callback
    this.turnOn = this.turnOn.bind(this);
    this.turnOff = this.turnOff.bind(this);
  }

  turnOn() {
    this.props.socketinit.emit("clickedAbblendlicht", 1);
  }

  turnOff() {
    this.props.socketinit.emit("clickedAbblendlicht", 0);
  }

  componentDidMount() {
    //bevor der Status des Lichts aktualisiert wird, wird der frühere Status auf prev gesetzt
    this.setState({ prev: this.state.light });
    this.props.socketinit.on("dataLights", datalights =>
      this.setState({ light: datalights })
    );
  }

  render() {
    const { light } = this.state;
    const { prev } = this.state;

    //nur sensibel darauf sein, ob Abblendlicht an oder nicht an
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

    //keine Veränderung der state
    if (
      (tmplight === 1 && tmpprev === 1) ||
      (tmplight === 0 && tmpprev === 0)
    ) {
      //war an und ist immer noch an
      //this.props.socketinit.emit("clickedAbblendlicht", 2);
    }

    return (
      <div align="right">
        {(() => {
          switch (tmplight) {
            case 0: //Licht ist aus, beim Klicken wird "Licht an" gesendet und so lange gewartet (aus), bis Licht tatsächlich an ist
              return (
                <button class="button button5">
                  <img src={Aus} alt="Abblendlicht" onClick={this.turnOn} />
                </button>
              );
            case 1: //Licht ist an, beim Klicken wird "Licht an" gesendet und so lange gewartet (an), bis Licht tatsächlich aus ist
              return (
                <button class="button button5">
                  <img src={An} alt="Abblendlicht" onClick={this.turnOff} />
                </button>
              );
            default:
              //falls Fehler, soll Foto kein Button sein, sondern nur ein nicht interaktionsfähiges Bild
              return <img src={Aus} alt="Abblendlicht" />;
          }
        })()}
      </div>
    );
  }
}

export default Abblendlicht;
