//

//Hier wird nur die Onlinekarte angezeigt (kein Routenplaner in dieser Version möglich)
//momentan ist es statisch, aber schon für dynamisch vorbereitet (siehe state, componentDidMount etc.)
//so kann man irgendwann dynamisch GPS Daten reinladen

//Achtung!
//hier wurde angenommen, dass die Daten vom Backend unter die Namen "dataLat" und "dataLon" reingeladen werden
//(siehe Wiki Tabelle)

//no api key needed
import React, { Component } from "react";
import Map from "pigeon-maps";
import Marker from "pigeon-marker";

const width = (window.innerWidth * 38) / 100;
const height = (window.innerHeight * 70) / 100;

class Maps extends Component {
  constructor() {
    super();
    this.state = {
      lat: 48.149066,
      lon: 11.567544
    };
  }

  componentDidMount() {
    this.props.socketinit.on("dataLat", datalat =>
      this.setState({ lat: datalat })
    );
    this.props.socketinit.on("dataLon", datalon =>
      this.setState({ lon: datalon })
    );
  }

  render() {
    const { lat } = this.state;
    const { lon } = this.state;
    return (
      <Map
        center={[lat, lon]}
        zoom={16}
        width={width}
        height={height}
        touchEvents
      >
        {/*hier können dynamisch GPS Daten vom Auto reingeladen werden */}
        <Marker
          anchor={[lat, lon]}
          payload={1}
          onClick={({ event, anchor, payload }) => {}}
        />
      </Map>
    );
  }
}
export default Maps;
