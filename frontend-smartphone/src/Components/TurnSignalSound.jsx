//

//Achtung
//Wer Probleme damit hat, dass Bilder und Geräusche nicht synchronisiert sind, kann das Backend Team das gerne anpassen

import React, { Component } from "react";
import Sound from "react-sound";

import soundfile from "../audio/turn-signal-audio.mp3";

class TurnSignalSounds extends Component {
  //Blinkerdaten laden und entscheiden
  constructor() {
    super();
    this.state = {
      rflash: 0,
      lflash: 0
    };
  }
  componentDidMount() {
    this.props.socketinit.on("dataLflash", datalflash =>
      this.setState({ lflash: datalflash })
    );
    this.props.socketinit.on("dataRflash", datarflash =>
      this.setState({ rflash: datarflash })
    );
  }
  render() {
    const { rflash } = this.state;
    const { lflash } = this.state;

    //egal ob links oder rechts an ist, wird der Tom abgespielt
    if (rflash === 1 || lflash === 1) {
      var flashSound = 1;
    } else {
      flashSound = 0;
    }

    return (
      <div>
        {(() => {
          switch (flashSound) {
            case 0:
              return;
            case 1:
              return (
                <Sound //nichts davon unausgefüllt lassen oder löschen!
                  url={soundfile}
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

export default TurnSignalSounds;
