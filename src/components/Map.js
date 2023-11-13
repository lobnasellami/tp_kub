import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = () => {
  const position = [37.975019, 23.734822]; // Coordinates for Bizerte, Tunisia

  return (
    <MapContainer center={position} zoom={10} style={{ height: '400px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>Bizerte, Tunisia</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
