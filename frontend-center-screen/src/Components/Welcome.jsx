//

//Seite, die maximal 3 Sekunden lang angezeigt werden soll als persönliche Begrüßung
//"süßes Feature"

//Second Screen, login = 1

//alles anderes ist genauso aufgebaut wie sonst auch

//Achtung
//Backend muss "dataVorname" und "dataNachname" schicken!

import React, { Component } from "react";

class Welcome extends Component {
  constructor() {
    super();
    this.state = {
      vorname: "eCARus",
      nachname: "Fahrer"
    };
  }

  componentDidMount() {
    this.props.socketinit.on("dataVorname", datavorname =>
      this.setState({ vorname: datavorname })
    );
    this.props.socketinit.on("dataNachname", datanachname =>
      this.setState({ nachname: datanachname })
    );
  }

  render() {
    const { vorname } = this.state;
    const { nachname } = this.state;
    return (
      <div>
        <h1 align="center">Herzlich Willkommen,</h1>
        <h1 align="center">
          {vorname} {nachname}
        </h1>
      </div>
    );
  }
}

export default Welcome;
