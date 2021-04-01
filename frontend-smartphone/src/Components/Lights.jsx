//

import React, { Component } from "react";
//alle Bilder reinladen
import Tageslicht from "../picsLight/TageslichtOn.jpg";
import Abblendlicht from "../picsLight/AbblendlichtOn.jpg";
import Standlicht from "../picsLight/StandlichtOn.jpg";
import Fernlicht from "../picsLight/FernlichtOn.jpg";
import Blanc from "../picsLight/Blanc.jpg";

class Lights extends Component {
  constructor() {
    super();
    this.state = {
      lights: 1 //defaultmäßig auf Null oder Tageslicht setzen,
    };
  }

  componentDidMount() {
    this.props.socketinit.on("dataLights", datalights =>
      this.setState({ lights: datalights })
    );
  }

  render() {
    const { lights } = this.state;

    switch (lights) {
      case 0:
        var light = Tageslicht;
        break;
      case 1:
        light = Abblendlicht;
        break;
      case 2:
        light = Fernlicht;
        break;
      case 3:
        light = Standlicht;
        break;
      default:
        light = Blanc;
        break;
    }

    return (
      <div>
        <img src={light} alt="logo lights" align="center" />
      </div>
    );
  }
}

export default Lights;
