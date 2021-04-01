//

//Kommentare analog in Abblendlicht.jsx, falls Fragen bitte dort zuerst lesen und versuchen zu verstehen
//kein Tageslicht einstellbar (Hardware), deshalb nicht verwendet
import React, { Component } from "react";
import An from "../picsLights/TageslichtOn.png";
import Aus from "../picsLights/TageslichtOff.jpg";
import "./Buttons.css";

class Tageslicht extends Component {
  constructor() {
    super();
    this.state = {
      light: 0,
      prev: 0
    };
  }

  componentDidMount() {
    this.setState({ prev: this.state.light });
    this.props.socketinit.on("dataLights", datalights =>
      this.setState({ light: datalights })
    );
  }

  render() {
    const { light } = this.state;
    const { prev } = this.state;

    switch (light) {
      case 1:
        var tmplight = 1;
        break;

      default:
        tmplight = 0;
        break;
    }

    switch (prev) {
      case 1:
        var tmpprev = 1;
        break;

      default:
        tmpprev = 0;
        break;
    }

    if (
      (tmplight === 1 && tmpprev === 1) ||
      (tmplight === 0 && tmpprev === 0)
    ) {
      //war an und ist immer noch an
      //this.props.socketinit.emit("clickedTageslicht", 2);
    }

    return (
      <div align="right">
        {(() => {
          switch (tmplight) {
            case 0:
              return (
                <button class="button button5">
                  <img
                    src={Aus}
                    alt="Tageslicht"
                    onClick={() => {
                      this.props.socketinit.emit("clickedTageslicht", 1);
                    }}
                  />
                </button>
              );
            case 1:
              return (
                <button class="button button5">
                  <img
                    src={An}
                    alt="Tageslicht"
                    onClick={() => {
                      this.props.socketinit.emit("clickedTageslicht", 0);
                    }}
                  />
                </button>
              );
            default:
              return <img src={Aus} alt="Tageslicht" />;
          }
        })()}
      </div>
    );
  }
}

export default Tageslicht;

//frühere Versuche:

/*import * as React from 'react';
import {MouseEvent} from "react";
import Img from "@fdmg/ts-react-image";
import tageslicht from "../picsLights/TageslichtSmallRound.jpg";

export interface Props {
    className?: string;
    onClick: (event: MouseEvent<HTMLSpanElement>) => void;
    alt: string;
    src: string;
    tabIndex?: number|any;
}

export default class TagesButton extends React.Component {
    constructor(props:Props) {
        super(props);
        this.props = props;
       
    }
    render() {
        return (
            <span
                onClick={this.props.onClick}
                className={this.props.className}
                role="button"
                tabIndex={this.props.tabIndex ? this.props.tabIndex : 0}
                aria-label={this.props.alt}
            >
                <Img alt={this.props.alt} src={tageslicht} />
            </span>
        );
    }
}
*/
