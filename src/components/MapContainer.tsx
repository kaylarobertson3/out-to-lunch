import {IGG_MAP_POSITION} from '@src/constants';
import {BREAKPOINT, COLOR, FONT} from '@src/theme';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import styled from 'styled-components';

// default icon
const DefaultIcon = (L.Marker.prototype.options.icon = L.icon({
  iconUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconAnchor: [13, 27],
  iconSize: [20, null],
}));

// IGG icon
const IggIcon = (L.Marker.prototype.options.icon = L.icon({
  iconUrl: require('@public/assets/icons/iggCircle.svg'),
  iconAnchor: [13, 27],
  iconSize: [30, 30],
}));

const LeafletWrapper = styled.div`
  width: 100%;
  margin: 0 0 2rem 0;
  display: none;

  ${BREAKPOINT.m`
      margin: 0 0 1rem 3rem;
      display: block;
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

    .leaflet-popup-content-wrapper {
      color: black;
    }
    border: 1px solid ${COLOR.black};

  }

  .leaflet-popup {
    margin-bottom: 40px;
    left: -49px;

    p {
      /* font: normal 700 13px/1.2 ${FONT.sansSerif}; */
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

const DirectionsBtn = styled.a`
  p {
    text-decoration: underline;
  }
`;

interface MapContainerProps {
  cardData: any;
  clickedPos: string;
}

const MapContainer = ({cardData, clickedPos}: MapContainerProps) => {
  return (
    <LeafletWrapper>
      <Map
        center={[IGG_MAP_POSITION.lat, IGG_MAP_POSITION.lng]}
        zoom={IGG_MAP_POSITION.zoom}
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
        <Marker icon={IggIcon} position={[IGG_MAP_POSITION.lat, IGG_MAP_POSITION.lng]}>
          <Popup position={[IGG_MAP_POSITION.lat, IGG_MAP_POSITION.lng]}>
            <p>IGG Office</p>
          </Popup>
        </Marker>
        {cardData.map((d, i) => {
          if (d.lat && d.long) {
            const lat = d.lat;
            const lng = d.long;
            const link = `https://www.google.com/maps/search/?api=1&query=${d.lat},${d.long}`;
            return (
              <div key={`marker-${d.name}`}>
                <Marker icon={DefaultIcon} position={[lat, lng]}>
                  <Popup position={[lat, lng]}>
                    <p>{d.name}</p>
                    <DirectionsBtn href={link}>
                      <p>Get directions</p>
                    </DirectionsBtn>
                  </Popup>
                </Marker>
                {clickedPos === d.name && (
                  <Popup position={[lat, lng]}>
                    <p>{d.name}</p>
                    <DirectionsBtn href={link}>
                      <p>Get directions</p>
                    </DirectionsBtn>
                  </Popup>
                )}
              </div>
            );
          }
        })}
      </Map>
    </LeafletWrapper>
  );
};

export default MapContainer;
