//

//selbe Kommentare wie in Lights.jsx
import React, { Component } from "react";

import Tageslicht from "../picsLight/TageslichtOnSmall.jpg";
import Abblendlicht from "../picsLight/AbblendlichtOnSmall.jpg";
import Standlicht from "../picsLight/StandlichtOnSmall.jpg";
import Fernlicht from "../picsLight/FernlichtOnSmall.jpg";
import Blanc from "../picsLight/BlancSmall.jpg";

class Lights extends Component {
  constructor() {
    super();
    this.state = {
      lights: 0,
      endpoint: "http://localhost:5000"
    };
  }

  componentDidMount() {
    this.props.socketinit.on("dataLights", datalights =>
      this.setState({ lights: datalights })
    );
  }

  render() {
    const { lights } = this.state;
    var light = Blanc;
    switch (lights) {
      case 0:
        light = Tageslicht;
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
        <img src={light} alt="logo lights small" align="center" />
      </div>
    );
  }
}

export default Lights;
