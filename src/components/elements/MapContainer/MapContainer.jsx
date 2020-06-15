import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%'
};

const LoadingContainer = (props) => (
    <div>Fancy loading container!</div>
)

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popupOpened: false,
            itemPrice: 0,
            itemLocation: "",
            priceValid: 1,
            position: {
                lat: 43.07712,
                lng: 141.3489104
            }
        }
    }

    componentDidMount() {
        if(typeof(this.props.lat) !== "undefined") {
            this.setState({ position: {lat: this.props.lat, lng: this.props.lng} });
        }
    }

    sendData = () => {
        this.props.parentCallback(this.state.position);
    }

    onMarkerDragEnd = (coord) => {
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
    
        this.setState({ position: { lat: lat, lng: lng } }, () => {
            this.sendData();
        });
    }

    render() {
      return (
        <Map google={this.props.google}
            zoom={13}
            style={mapStyles}
            initialCenter={{
                lat: this.props.lat,
                lng: this.props.lng
            }} >
                <Marker
                    position={this.state.position}
                    draggable={true}
                    onDragend={(t, map, coord) => this.onMarkerDragEnd(coord)}
                    name="Item's Location"
                />
        </Map>
      );
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyBXiNp7PcyRfghiNb0Kb8CkZQMYAo4sb94"),
    LoadingContainer: LoadingContainer
})(MapContainer);