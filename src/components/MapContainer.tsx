import React from "react";
import styled from "styled-components";
import { BREAKPOINT, FONT, COLOR } from "@src/theme";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Map, Popup, TileLayer, Marker } from "react-leaflet";
// import Marker from "@src/components/Marker";

const IGGpos = [52.50108, 13.31798];

// default icon
const DefaultIcon = (L.Marker.prototype.options.icon = L.icon({
  iconUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconAnchor: [13, 27],
  iconSize: [20, "auto"]
}));

// IGG icon
const IggIcon = (L.Marker.prototype.options.icon = L.icon({
  iconUrl: require("@public/assets/icons/iggCircle.svg"),
  iconAnchor: [13, 27],
  iconSize: [30, 30]
}));

const LeafletWrapper = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0 0 2rem 0;

  ${BREAKPOINT.m`
      margin: 0 0 1rem 1rem;
      width: 50%;
   `};

  .leaflet-container {
    width: 100%;
    height: 300px;
    border-radius: 10px;
    box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.08);

    ${BREAKPOINT.m`
      height: 900px;
   `};
  }

  .leaflet-popup {
    margin-bottom: 40px;
    left: -49px;

    p {
      font: normal 700 13px/1.2 ${FONT.sansSerif};
      margin: 0;
    }
  }

  .leaflet-popup-content-wrapper {
    border-radius: 5px;
  }

  .leaflet-control-attribution {
    background: ${COLOR.white};
    font-family: ${FONT.sansSerif};
    color: ${COLOR.darkGray};
  }
`;

// // Create your own class, extending from the Marker class.
// class ExtendedMarker extends Marker {
//   leafletElement: any;
//   // "Hijack" the component lifecycle.
//   componentDidMount() {
//     // Call the Marker class componentDidMount (to make sure everything behaves as normal)
//     super.componentDidMount();

//     // Access the marker element and open the popup.
//     this.leafletElement.openPopup();
//   }
// }

class MapContainer extends React.Component<
  {
    cardData: any;
  },
  {
    lat: number;
    long: number;
    zoom: number;
  }
> {
  constructor(props) {
    super(props);
    this.state = {
      lat: 52.50108,
      long: 13.31798,
      zoom: 14
    };
  }

  render() {
    const { cardData } = this.props;
    console.log("CardData", cardData);

    const markers = cardData.map((d, i) => {
      if (d.lat && d.long) {
        const latLong = [parseFloat(d.lat), parseFloat(d.long)];
        return (
          <Marker
            key={`marker-${d.name}`}
            ref={`marker-${d.name}`}
            icon={DefaultIcon}
            position={latLong}
            onClick={e => {
              console.log("marker clicked");
            }}
          >
            <Popup>
              <p>{d.name}</p>
              <p>{d.rating}</p>
              <p>{d.price}</p>
              <p>{d.distance}</p>
              Open in google maps =>
            </Popup>
          </Marker>
        );
      }
    });
    console.log("markers", markers);

    return (
      <LeafletWrapper>
        <Map
          center={IGGpos}
          zoom={this.state.zoom}
          scrollWheelZoom={false}
          touchZoom={false}
          zoomSnap={0}
          minZoom={14}
          maxZoom={17}
        >
          <TileLayer
            url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"
            attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {cardData.length >= 1 && markers}
        </Map>
        <button
          onClick={e => {
            console.log("clicked");
            // const ref = "marker-Aki Tatsu Sushi";
            // ref.context.map.openPopup();
          }}
        >
          BUTTON
        </button>
      </LeafletWrapper>
    );
  }
}

export default MapContainer;
