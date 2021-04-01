//

import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import { Container, Row, Col } from "react-bootstrap";

//import Tageslicht from "./Components/tageslicht";
//kein Tageslicht einstellbar (Hardware), deshalb nicht verwendet
import Abblendlicht from "./Components/Abblendlicht";
import Fernlicht from "./Components/Fernlicht";
import Standlicht from "./Components/Standlicht";
import Maps from "./Components/Maps";
import Sensor from "./Components/Sensor";
//import Weather from "./Components/Weather";
//eigentlich wollten wir noch Wetterdaten anzeigen, aber haben es danach doch verworfen
import RLicht from "./Components/RLight";
import NLicht from "./Components/NLight";
import DLicht from "./Components/DLight";
import Welcome from "./Components/Welcome";
import First from "./Components/LayerOne";
import Second from "./Components/LayerTwo";

//damit keine weiße Ränder zu sehen sind
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
    super();
    var ipAddressOfBackend =  (process.env.REACT_APP_ENV === "test") ? "localhost" : "192.168.1.129"; // IP von Backend ist "192.168.1.129" für Raspberry, "localhost" für PC. Getestet wird lokal am PC
    this.state = {
      login: 2, //0: bitte einloggen, 1: herzlich willkommen, 2: Anzeige
      endpoint: `http://${ipAddressOfBackend}:5001` // Backend sendet Daten an den Port 5001
      //müssen es nur einmal reinladen und geben alles mit "socketinit={socket}" an die Components weiter
    };
  }
  componentDidMount() {
    this.socket.on("dataLogin", datalogin =>
      this.setState({ login: datalogin })
    );
  }
  render() {
    //um sich mit Backend zu verbinden (wirklich so lassen und nicht ineinander einsetzen!)
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    this.socket = socket;
    //um die State als Variable  zu verwenden
    const { login } = this.state;
    return (
      <div style={{ textAlign: "center", fontFamily: "sans-serif" }}>
        {(() => {
          switch (
            login //switch case ist momentan eine blöde Idee, aber es funktioniert
          ) {
            case 0:
              return (
                <First
                  socketinit={socket} //Seite für Anmeldung, sehr wichtig!
                />
              );
            case 1:
              return (
                <Second
                  socketinit={socket} //Übergangsseite zur Begrüßung, bitte unbeding timplementieren!
                />
              );
            case 2: //tatsächlich funktionale Seite, bausteinartig mit Bootstrap zusammengesetzt, keine große Magie
              return (
                <Container fluid styles={styles.grid}>
                  <Row>
                    {" "}
                    <p></p>{" "}
                  </Row>
                  <Row>
                    {" "}
                    <p></p>{" "}
                  </Row>
                  <Row fluid styles={styles.row}>
                    {/*<Col md={2} fluid styles={styles.col}>*/}
                    {/*<Tageslicht socketinit={socket} />*/}
                    {/*</Col>*/}
                    <Col md={1} fluid styles={styles.col}>
                      <p> </p>
                    </Col>

                    <Col md={2} fluid styles={styles.col}>
                      <Abblendlicht socketinit={socket} />
                    </Col>

                    <Col md={2} fluid styles={styles.col}>
                      <Fernlicht socketinit={socket} />
                    </Col>

                    <Col md={2} fluid styles={styles.col}>
                      <Standlicht socketinit={socket} />
                    </Col>

                    <Col fluid styles={styles.col}>
                      {/* <Weather />*/}
                      <Welcome socketinit={socket} />
                    </Col>
                  </Row>

                  <Row fluid styles={styles.row}>
                    {" "}
                    <p></p>{" "}
                  </Row>
                  <Row fluid styles={styles.row}>
                    {" "}
                    <p></p>{" "}
                  </Row>

                  <Row fluid styles={styles.row}>
                    <Col md={2} fluid styles={styles.col}>
                      <Row fluid styles={styles.row}>
                        <Col md={1} fluid styles={styles.col}>
                          <p> </p>
                        </Col>
                        <Col md={11} fluid styles={styles.col}>
                          <RLicht socketinit={socket} />
                        </Col>
                      </Row>

                      <Row fluid styles={styles.row}>
                        {" "}
                        <p></p>{" "}
                      </Row>

                      <Row fluid styles={styles.row}>
                        <Col md={1} fluid styles={styles.col}>
                          <p> </p>
                        </Col>
                        <Col md={11} fluid styles={styles.col}>
                          <NLicht socketinit={socket} />
                        </Col>
                      </Row>

                      <Row fluid styles={styles.row}>
                        {" "}
                        <p></p>{" "}
                      </Row>

                      <Row fluid styles={styles.row}>
                        <Col md={1} fluid styles={styles.col}>
                          <p> </p>
                        </Col>
                        <Col md={11} fluid styles={styles.col}>
                          <DLicht socketinit={socket} />
                        </Col>
                      </Row>
                    </Col>
                    <Col md={5} fluid styles={styles.col}>
                      <Sensor socketinit={socket} />
                    </Col>
                    <Col md={3} fluid styles={styles.col}>
                      <Maps socketinit={socket} />
                    </Col>
                  </Row>
                </Container>
              );
            default:
              //ein switch case braucht immer einen default, nicht vergessen!
              return <p>Fehler</p>;
          }
        })()}
      </div>
    );
  }
}
export default App;
