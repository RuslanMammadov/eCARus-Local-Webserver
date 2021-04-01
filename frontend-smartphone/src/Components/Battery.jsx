//
import React, { Component } from "react";
//Bilder reinladen und Trivialnamen geben, damit es schneller geht
import Perfect from "../picsBattery/perfect_new.jpg";
import Good from "../picsBattery/good_new.jpg";
import Medium from "../picsBattery/medium_new.jpg";
import Critical from "../picsBattery/critical_new.jpg";
import Empty from "../picsBattery/empty_new.jpg";

class Battery extends Component {
  constructor() {
    super();
    this.state = {
      battery: 100 //defaultmäßig 100 anzeigen
    };
  }

  componentDidMount() {
    //neue Daten laden und der state zuweisen
    this.props.socketinit.on("dataBattery", databattery =>
      this.setState({ battery: databattery })
    );
  }

  render() {
    const { battery } = this.state;

    //sicher gehen, dass es über 100 nicht möglich ist, damit folgendes if else kein Problem macht
    if (battery > 100) {
      var bat = 100;
    } else {
      bat = battery;
    }

    //entscheiden, welches Bild geladen werden soll
    //temporäre Variable tmp verwendet
    if (battery > 80) {
      var tmp = 0;
    } else if (battery <= 80 && battery > 60) {
      tmp = 1;
    } else if (battery <= 60 && battery > 40) {
      tmp = 2;
    } else if (battery <= 40 && battery > 20) {
      tmp = 3;
    } else {
      tmp = 4;
    }

    return (
      <div align="center">
        {(() => {
          switch (tmp) {
            case 0:
              return <img src={Perfect} alt={"battery perfect"} />;
            case 1:
              return <img src={Good} alt={"battery good"} />;
            case 2:
              return <img src={Medium} alt={"battery medium"} />;
            case 3:
              return <img src={Critical} alt={"battery critical"} />;
            default:
              return <img src={Empty} alt={"battery empty"} />;
          }
        })()}
        <h1 align="center">{bat}%</h1>
      </div>
    );
  }
}

export default Battery;
