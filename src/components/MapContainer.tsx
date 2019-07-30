import React from "react";
import styled from "styled-components";
import { BREAKPOINT } from "@src/theme";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

let DefaultIcon = L.icon({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

const IGGpos = [52.50108, 13.31798];
L.Marker.prototype.options.icon = DefaultIcon;

const LeafletWrapper = styled.div`
  margin-bottom: 2rem;
  .leaflet-container {
    width: 100%;
    height: 300px;

    ${BREAKPOINT.m`
      height: 600px;
    `};
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
      zoom: 13
    };
  }

  render() {
    const { cardData } = this.props;
    return (
      <LeafletWrapper>
        <Map center={IGGpos} zoom={this.state.zoom}>
          <TileLayer
            url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"
            attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={IGGpos}>
            <Popup>
              <span>popup</span>
            </Popup>
          </Marker>
        </Map>
      </LeafletWrapper>
    );
  }
}

export default MapContainer;
