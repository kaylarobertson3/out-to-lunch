import React from "react";
import styled from "styled-components";
import { BREAKPOINT } from "@src/theme";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

const IGGpos = [52.50108, 13.31798];
const IGGpos2 = [52.50191, 13.31701];

// default icon
const DefaultIcon = (L.Marker.prototype.options.icon = L.icon({
  iconUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconAnchor: [13, 27],
  iconSize: [20, "auto"]
}));

// IGG icon
const IggIcon = (L.Marker.prototype.options.icon = L.icon({
  iconUrl: require("icons/igg.svg"),
  iconAnchor: [13, 27],
  iconSize: [30, 30]
}));

const LeafletWrapper = styled.div`
  margin-bottom: 2rem;
  .leaflet-container {
    width: 100%;
    height: 300px;

    ${BREAKPOINT.m`
      height: 600px;
    `};
  }

  .leaflet-popup {
    margin-bottom: 40px;
    left: -49px;
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
      zoom: 16
    };
  }

  render() {
    const { cardData } = this.props;

    return (
      <LeafletWrapper>
        <Map
          center={IGGpos}
          zoom={this.state.zoom}
          scrollWheelZoom={"center"}
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
              <span>IGG Office</span>
            </Popup>
          </Marker>

          <Marker icon={DefaultIcon} position={IGGpos2}>
            <Popup>
              <span>IGG Office</span>
            </Popup>
          </Marker>
        </Map>
      </LeafletWrapper>
    );
  }
}

export default MapContainer;

{
  /* <TileLayer
            url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"
            attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker icon={<img src="icons/igg.svg" />} position={IGGpos}>
            <Popup>
              <span>IGG Office</span>
            </Popup>
          </Marker> */
}
