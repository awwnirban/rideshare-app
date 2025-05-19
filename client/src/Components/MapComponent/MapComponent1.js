import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import "./MapComponent.css";

// Create a custom icon (optional)
const customIcon = new L.Icon({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startLat: this.props.startLat,
      startLong: this.props.startLong,
      endLat: this.props.endLat,
      endLong: this.props.endLong,
    };
  }

  render() {
    const { startLat, startLong, endLat, endLong } = this.state;

    return (
      <div className="map-c" style={{ height: "700px" }}>
        <MapContainer 
          center={[startLat, startLong]} 
          zoom={7} 
          style={{ height: "100%", width: "80%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[startLat, startLong]} icon={customIcon}>
            <Popup>Start Location</Popup>
          </Marker>
          <Marker position={[endLat, endLong]} icon={customIcon}>
            <Popup>End Location</Popup>
          </Marker>
        </MapContainer>
      </div>
    );
  }
}

export default MapComponent;
