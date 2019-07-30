import React from "react";
import styled from "styled-components";
import { COLOR, BREAKPOINT } from "@src/theme";
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

const LeafletWrapper = styled.div`
margin-bottom: 2rem;
    .leaflet-container {
        width: 100%;
        height: 300px;

        ${BREAKPOINT.m`
            height: 600px;
        `};
    }
`

class MapContainer extends React.Component<{
    cardData: any;
}, {
    lat: number,
    long: number,
    zoom: number
}>{
    constructor(props) {
        super(props);
        this.state = {
            lat: 52.5001075,
            long: 13.3181012,
            zoom: 13
        }
    }

    render() {
        const { cardData } = this.props;
        const position = [this.state.lat, this.state.long]
        return (
            <LeafletWrapper>
                <Map center={position} zoom={this.state.zoom}>
                    <TileLayer
                        url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"
                        attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

                    />
                    <Marker position={position}>
                        <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
                    </Marker>
                </Map>
            </LeafletWrapper>
        )
    }
}


export default MapContainer
