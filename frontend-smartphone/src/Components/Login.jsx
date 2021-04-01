//

//bisher nur Anzeige möglich, Daten senden und empfangen noch nicht möglich

//wird als erstes angezeigt, um sich anzumelden
//mbd ist quasi genauso wie bootstrap, hier funktioniert es aber schöner als Bootstrap
//ziemlich viel ist selbsterklärend
//falls ihr doch Orobleme habt: https://mdbootstrap.com/docs/react/forms/basic/

import React, { Component } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBModalFooter
} from "mdbreact";

class Login extends Component {
  render() {
    return (
      <div align="center">
        <MDBContainer>
          <br />
          <br />
          <br />
          <MDBRow>
            <MDBCol md="9">
              <MDBCard>
                <MDBCardBody className="mx-4">
                  <div className="text-center">
                    <h3 className="dark-grey-text mb-5">
                      <strong>Bitte anmelden!</strong>
                      <br />
                      <p>eCARus 2.0</p>
                    </h3>
                  </div>
                  <MDBInput
                    label="Benutzername"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    label="Passwort"
                    group
                    type="password"
                    validate
                    containerClass="mb-0"
                  />
                  <br />
                  <MDBCard>
                    <MDBCardBody>
                      <div className="text-center mb-3">
                        <MDBBtn //was passieren soll, wenn man etwas eingibt
                          type="button"
                          gradient="blue"
                          rounded
                          className="btn-block z-depth-1a"
                        >
                          <strong>Los geht's!</strong>
                        </MDBBtn>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCardBody>
                <MDBModalFooter className="mx-5 pt-3 mb-1">
                  <p className="font-small grey-text d-flex justify-content-end">
                    Noch kein Mitglied?
                    <a
                      href="#!" //hier muss natürlich eine Adresse angegeben werden, die zur zweiten Seite (Übergangsseite) leitet
                      className="blue-text ml-1"
                    >
                      Hier anmelden!
                    </a>
                  </p>
                </MDBModalFooter>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

export default Login;
