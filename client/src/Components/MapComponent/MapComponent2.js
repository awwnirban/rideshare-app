import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import L from 'leaflet';
import './MapComponent.css';

// Fix for marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Main Map Component
const MapComponent = ({ startLat, startLong, endLat, endLong }) => {
    useEffect(() => {
        const map = L.map('map').setView([startLat, startLong], 13);

        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // Add markers for start and end points
        const startMarker = L.marker([startLat, startLong]).addTo(map).bindPopup('Start Point');
        const endMarker = L.marker([endLat, endLong]).addTo(map).bindPopup('End Point');

        // Initialize routing machine
        const routingControl = L.Routing.control({
            waypoints: [
                L.latLng(startLat, startLong),
                L.latLng(endLat, endLong),
            ],
            routeWhileDragging: true,
            geocoder: L.Control.Geocoder.nominatim(),
        }).addTo(map);

        // Clean up on component unmount
        return () => {
            map.removeControl(routingControl);
            map.remove();
        };
    }, [startLat, startLong, endLat, endLong]);

    return (
        <div className="map-c" style={{ height: '700px', width: '80%' }}>
            <div id="map" style={{ height: '100%', width: '100%' }} />
        </div>
    );
};

export default MapComponent;
