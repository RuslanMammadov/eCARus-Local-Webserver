//

//Das ist die Seite, die für wenige Sekunden angezeigt werden soll, nachdem man sich erfolgreich angemeldet hat
//maximal 3 Sekunden lang
//Hier müssen natürlich Vorname und Nachname aus der Datenbank geladen werden, bzw muss das der Backend schicken
//wie der Backend das macht ist natürlich nicht die Sache von Frontend, aber einfach genauso schicken wie die Geshcwindigkeit

import React, { Component } from "react";

class Second extends Component {
  constructor() {
    super();
    this.state = {
      vorname: "eCARus",
      nachname: "Fahrer"
    };
  }

  componentDidMount() {
    this.props.socketiniWelcome.on("dataVorname", datavorname =>
      this.state({ vornaWelcomee: datavorname })
    );
    this.props.socketiniWelcome.on("dataNachname", datanachname =>
      this.setState({ nachname: datanachname })
    );
  }

  render() {
    const { vorname } = this.state;
    const { nachname } = this.state;
    return (
      <div>
        <h1>Herzlich Willkommen,</h1>
        <h1>
          {vorname} {nachname}
        </h1>
      </div>
    );
  }
}

export default Second;
