//

import React, { Component } from "react";
//Bilder reinladen
import PicRND from "../picsPRND/RND.jpg";
import PicR from "../picsPRND/R.jpg";
import PicN from "../picsPRND/N.jpg";
import PicD from "../picsPRND/D.jpg";

class RND extends Component {
  constructor() {
    super();
    this.state = {
      rnd: 3,
      endpoint: "http://localhost:5000"
    };
  }

  componentDidMount() {
    //Daten neu laden und state setzen
    this.props.socketinit.on("dataGang", datagang =>
      this.setState({ rnd: datagang })
    );
  }

  render() {
    const { rnd } = this.state;

    return (
      <div style={{ textAlign: "left" }}>
        {(() => {
          switch (rnd) {
            case 1:
              return <img src={PicN} alt={"neutral"} />;
            case 2:
              return <img src={PicD} alt={"drive"} />;
            case 3:
              return <img src={PicR} alt={"rückwärts"} />;  
            default:
              return <img src={PicRND} alt={"gang corrupt"} />;
          }
        })()}
      </div>
    );
  }
}

export default RND;
