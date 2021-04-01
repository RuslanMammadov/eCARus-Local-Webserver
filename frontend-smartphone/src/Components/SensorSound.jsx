//

//Warnton, wenn Abstand weniger als 0.3m

//naja, bis jetzt haben wir noch keine gute mp3 Dateien gefunden, daher haben wir erst einmal
//den Ton der Blinker eingefügt

import React, { Component } from "react";
import Sound from "react-sound";

import soundfile1 from "../audio/turn-signal-audio.mp3";
import soundfile2 from "../audio/turn-signal-audio.mp3";

class SensorSounds extends Component {
  //Daten laden und neu setzen, anhand dieser dann entscheiden, ob Ton an oder aus gehen soll
  constructor() {
    super();
    this.state = {
      sensorR: 0.1,
      sensorL: 0.1
    };
  }
  componentDidMount() {
    this.props.socketinit.on("dataSensorR", datasensorr =>
      this.setState({ sensorR: datasensorr })
    );
    this.props.socketinit.on("dataSensorL", datasensorl =>
      this.setState({ sensorL: datasensorl })
    );
  }
  render() {
    const { sensorR } = this.state;
    const { sensorL } = this.state;

    if (sensorR <= 0.1 || sensorL <= 0.1) {
      var sensorSound = 1; //weniger als 10cm
    } else if (
      (sensorR <= 0.3 && sensorR > 0.1) ||
      (sensorL <= 0.3 && sensorL < 0.1)
    ) {
      sensorSound = 2; //zwischen 10cm und 30cm
    } else {
      sensorSound = 0; //sonst kein Ton
    }

    return (
      <div>
        {(() => {
          switch (sensorSound) {
            case 0:
              return;
            case 1:
              return (
                <Sound //bitte alle ausgefüllt lassen, sonst funktioniert es nicht!
                  url={soundfile1}
                  playStatus={Sound.status.PLAYING}
                  onLoading={this.handleSongLoading}
                  onPlaying={this.handleSongPlaying}
                  onFinishedPlaying={this.handleSongFinishedPlaying}
                  autoLoad={true}
                  loop={true}
                />
              );
            case 2:
              return (
                <Sound
                  url={soundfile2}
                  playStatus={Sound.status.PLAYING}
                  onLoading={this.handleSongLoading}
                  onPlaying={this.handleSongPlaying}
                  onFinishedPlaying={this.handleSongFinishedPlaying}
                  autoLoad={true}
                  loop={true}
                />
              );
            default:
              return;
          }
        })()}
      </div>
    );
  }
}

export default SensorSounds;
