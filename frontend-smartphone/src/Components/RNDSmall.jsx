//

//selbe Kommentare wie in RND.jsx
import React, { Component } from "react";
import PicRND from "../picsPRND/RNDSmall.jpg";
import PicR from "../picsPRND/RSmall.jpg";
import PicN from "../picsPRND/NSmall.jpg";
import PicD from "../picsPRND/DSmall.jpg";

class RNDSmall extends Component {
  constructor() {
    super();
    this.state = {
      rnd: 3
    };
  }

  componentDidMount() {
    this.props.socketinit.on("dataGang", datagang =>
      this.setState({ rnd: datagang })
    );
  }

  render() {
    const { rnd } = this.state;

    return (
      <div style={{ textAlign: "center" }}>
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

export default RNDSmall;
