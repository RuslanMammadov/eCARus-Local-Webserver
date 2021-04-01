//

//kaum eine andere Möglichkeit, eine Uhr so einfach wie möglich zu implementieren
//wenn es euch nicht gefällt, dann ändert es
//(vielleicht könnte man die Sekunden weglassen)
//Aber "Uhr" sollte man lassen, der Verständnis mancher Leute willen

import React, { Component } from "react";

class Clock extends Component {
  //AnfangsDaten
  state = {
    time: new Date()
  };

  componentDidMount() {
    //Uhrzeit-Anderung Intervall
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    //nach dem Intercall Daten löschen
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      time: new Date()
    });
  }

  render() {
    return <h3 align="center">{this.state.time.toLocaleTimeString()} Uhr</h3>;
  }
}
export default Clock;
