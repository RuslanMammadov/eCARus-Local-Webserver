//import der verwendeten Bibliotheken etc.
import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import { Container, Row, Col } from "react-bootstrap";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
//Loginseite
import Login from "./Components/Login";
//Übergangsseite
import Welcome from "./Components/Welcome";
//Audiodatein abspielen
import SensorSounds from "./Components/SensorSound";
import TurnSignalSounds from "./Components/TurnSignalSound";
//Obere Reihe, von links nach rechts, statisch
import TurnSignalDemoLeft from "./Components/TurnSignalLeft";
import Clock from "./Components/Clock";
import TurnSignalDemoRight from "./Components/TurnSignalRight";
//Untere Reihe, links, erste Ebene
import Battery from "./Components/Battery";
//Untere Reihe, links, von oben nach unten, von links nach rechts, zweite Ebene
import RNDSmall from "./Components/RNDSmall";
import BatterySmall from "./Components/BatterySmall";
import BatterySmallExtension from "./Components/BatterySmallExtenstion";
import LightsSmall from "./Components/LightsSmall";
//Untere Reihe, mitte, statisch
import Speedometer from "./Components/Speedometer";
//Untere Reihe, rechts, von oben nach unten, erste Ebene
import RND from "./Components/RND";
import Lights from "./Components/Lights";
//Untere Reihe, rechts, zweite Ebene
import Map from "./Components/Maps";

//falls es mehr Ebenen werden soll (oder "customized")
const maxSlides = 1;

//styles, damit kein blöder weißer Rand übrig bleibt
const styles = {
  grid: {
    paddingLeft: 0,
    paddingRight: 0
  },
  row: {
    marginLeft: 0,
    marginRight: 0
  },
  col: {
    paddingLeft: 0,
    paddingRight: 0
  }
};

class App extends Component {
  constructor() {
    //Anfangsdaten
    super();
    var ipAddressOfBackend =  (process.env.REACT_APP_ENV === "test") ? "localhost" : "192.168.1.129"; // IP von Backend ist "192.168.1.129" für Raspberry, "localhost" für PC. Getestet wird lokal am PC
    this.state = {
      login: 2, //wegen des switch cases, wenn stattdessen verschiedene Seiten verwendet werden kann das weg
      touch: 0, //wichtig, damit Touchpad Frontend steuern kann
      endpoint: `http://${ipAddressOfBackend}:5000` // Backend sendet Daten an den Port 5000
    };
  }

  componentDidMount() {
    this.socket.on("dataTouch", datatouch =>
      this.setState({ touch: datatouch })
    );
    this.socket.on("dataLogin", datalogin =>
      this.setState({ login: datalogin })
    );
  }

  render() {
    //muss man nur einmal machen, die Daten werden durch "socketinit={socket}" weiter an die Components gegeben
    var socket;
    if (!this.socket) {
      const { endpoint } = this.state;
      socket = socketIOClient(endpoint);
      this.socket = socket;
    }

    //um variablen direkt bei Namen zu verwenden
    const { touch } = this.state;
    const { login } = this.state;

    //ab jetzt relativ selbsterklärend
    //mit bootstrap einfach wie Bausteine aneinander reihen

    return (
      <div>
        {(() => {
          switch (login) {
            case 0: //einloggen
              return <Login socketinit={socket} />;
            case 1: //Begrüßung
              return <Welcome socketinit={socket} />;
            case 2: //tatsächliche Seite, die angezeigt werden soll
              return (
                <CarouselProvider
                  naturalSlideHeight={170}
                  naturalSlideWidth={125}
                  totalSlides={maxSlides + 1}
                  interval={0}
                  //infinite={true} //should be infinite loop, but somehow doesn't work
                  currentSlide={touch}
                >
                  <Container fluid styles={styles.grid}>
                    <Row>
                      <p></p>
                    </Row>
                    <Row>
                      <p></p>
                      {/* */}
                    </Row>
                    <Row>
                      <p></p>
                    </Row>
                    <Row>
                      <TurnSignalSounds socketinit={socket} />
                      {/* <SensorSounds socketinit={socket} />*/}
                    </Row>
                    <Row styles={styles.row}>
                      <Col xs={4} styles={styles.col}>
                        <TurnSignalDemoLeft socketinit={socket} />
                      </Col>
                      <Col xs={4} styles={styles.col}>
                        <Clock />
                      </Col>
                      <Col xs={4} styles={styles.col}>
                        <TurnSignalDemoRight socketinit={socket} />
                      </Col>
                    </Row>
                    <Row>
                      <h1> </h1>
                    </Row>
                    <Row styles={styles.row}>
                      <Col xs={3} styles={styles.col}>
                        <Slider>
                          <Slide index={0}>
                            <p></p>
                            <Battery socketinit={socket} />
                          </Slide>
                          <Slide index={1}>
                            <p></p>
                            <p></p>
                            <Col xs={3} styles={styles.col}>
                              <RNDSmall socketinit={socket} />
                              <p></p>
                              <p></p>
                              <BatterySmall socketinit={socket} />
                              <BatterySmallExtension socketinit={socket} />
                              <p></p>
                              <p></p>
                              <LightsSmall socketinit={socket} />
                            </Col>
                          </Slide>
                        </Slider>
                      </Col>
                      <Col xs={6} styles={styles.col}>
                        <Speedometer socketinit={socket} />
                      </Col>
                      <Col xs={3} styles={styles.col}>
                        <Slider>
                          <Slide index={0}>
                            <p></p>
                            <p></p>
                            <RND socketinit={socket} />
                            <p></p>
                            <Lights socketinit={socket} />
                          </Slide>
                          <Slide index={1}>
                            <Map socketinit={socket} />
                          </Slide>
                        </Slider>
                      </Col>
                    </Row>
                  </Container>
                </CarouselProvider>
              );
            default:
              return <p>Fehler</p>;
          }
        })()}
      </div>
    );
  }
}

export default App;
