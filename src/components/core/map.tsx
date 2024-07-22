'use client';

import { LatLngExpression, LatLngTuple, LeafletEvent } from 'leaflet';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet';

import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';

interface MapProps {
  posix: LatLngExpression | LatLngTuple;
  zoom?: number;
  onClick?: (e: LeafletEvent) => void;
  onMove?: (e: LeafletEvent) => void;
}

const defaults = {
  zoom: 19,
};

function LocationMarker({
  onClick,
  onMove,
}: {
  onClick?: (e: LeafletEvent) => void;
  onMove?: (e: LeafletEvent) => void;
}) {
  const [position, setPosition] = useState<any>(null);
  const map = useMapEvents({
    click(e) {
      map.locate();
      onClick?.(e);
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
    move: (e) => {
      onMove?.(e);
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

const Map = (Map: MapProps) => {
  const { zoom = defaults.zoom, posix } = Map;

  return (
    <MapContainer
      center={posix}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <Marker position={posix} draggable={false}>
        <Popup>Hey ! I study here</Popup>
      </Marker> */}
      <LocationMarker onClick={Map.onClick} onMove={Map.onMove} />
    </MapContainer>
  );
};

export default Map;
