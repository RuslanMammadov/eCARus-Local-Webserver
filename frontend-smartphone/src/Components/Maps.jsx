

// Hier wird nur die Onlinekarte angezeigt (kein Routenplaner in dieser Version möglich)
// momentan ist es statisch, aber schon für dynamisch vorbereitet (siehe state, componentDidMount etc.)
// so kann man irgendwann dynamisch GPS Daten reinladen

// Achtung!
// hier wurde angenommen, dass die Daten vom Backend unter die Namen "dataLat" und "dataLon" reingeladen werden
// (siehe Wiki Tabelle)

// no api key needed

import React, { Component } from "react";
import Map from "pigeon-maps";
import Marker from "pigeon-marker";

const width = (window.innerWidth * 20) / 100;
const height = (window.innerHeight * 65) / 100; //sieht statisch blöd aus, aber dynamisch ist es schön!

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
        zoom={15}
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

// hier sind ein paar missglückte Versuche, könnt es euch anschauen wenn ihr wollt

/*import React, { Component } from "react";
import ReactGoogleMapLoader from "react-google-maps-loader";
import ReactGoogleMap from "react-google-map";

class Maps extends Component {
  render() {
    return (
      <ReactGoogleMapLoader
        params={{
          key: "AIzaSyB0z-asRTvaacllJ2EemEjyl3wZGAm7MJM",
          libraries: "places,geometry"
        }}
        render={googleMaps =>
          googleMaps && (
            <div style={{ height: "100%", width: "99%" }}>
              <ReactGoogleMap
                googleMaps={googleMaps}
                center={{ lat: 48.150111, lng: 11.567981 }}
                zoom={15}
              />
            </div>
          )
        }
      />
    );
  }
}

export default Maps;*/

/*import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class Maps extends Component {
  render() {
    return (
      <Map google={this.props.google} zoom={14}>
        <Marker onClick={this.onMarkerClick} name={"Current location"} />

        <InfoWindow onClose={this.onInfoWindowClose}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

const api = "AIzaSyB9s2HLiM7IPUE1MYzlz3DD6juxME_PlA4";

export default GoogleApiWrapper({
  apiKey: api
})(Maps);*/

/*import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 48.135125,
      lng: 11.581981
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100%", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key:
              "https://maps.googleapis.com/maps/api/js?key=AIzaSyB9s2HLiM7IPUE1MYzlz3DD6juxME_PlA4"
          }} //api key from an account that we just made, if it is expired just do a new one (check out https://developers.google.com/maps/documentation/javascript/get-api-key)
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent lat={48.135125} lng={11.581981} text="München" />
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
*/
