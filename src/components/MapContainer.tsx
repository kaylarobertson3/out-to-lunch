import React from "react";
import styled from "styled-components";
import { BREAKPOINT, FONT, COLOR } from "@src/theme";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

const IGGpos = [52.50108, 13.31798];

// default icon
const DefaultIcon = (L.Marker.prototype.options.icon = L.icon({
  iconUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconAnchor: [13, 27],
  iconSize: [20, "auto"]
}));

// IGG icon
const IggIcon = (L.Marker.prototype.options.icon = L.icon({
  iconUrl: require("icons/iggCircle.svg"),
  iconAnchor: [13, 27],
  iconSize: [30, 30]
}));

const LeafletWrapper = styled.div`
  width: 50%;
  height: 100vh;
  margin: 0 0 2rem 0;

  ${BREAKPOINT.m`
      margin: 0 0 1rem 1rem;
   `};

  .leaflet-container {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.08);
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
          <Marker icon={IggIcon} position={IGGpos}>
            <Popup>
              <p>IGG Office</p>
            </Popup>
          </Marker>

          {cardData.length >= 1 &&
            cardData.map((d, i) => {
              if (d.lat && d.long) {
                const latLong = [parseFloat(d.lat), parseFloat(d.long)];
                return (
                  <Marker
                    key={`map-marker-${i}`}
                    icon={DefaultIcon}
                    position={latLong}
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
            })}
        </Map>
      </LeafletWrapper>
    );
  }
}

export default MapContainer;
