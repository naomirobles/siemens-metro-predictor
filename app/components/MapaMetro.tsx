"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface Props {
  children: React.ReactNode;
}

export default function MapaMetro({ children }: Props) {
  return (
    <MapContainer
      center={[19.41, -99.12]}
      zoom={12}
      style={{ width: "100%", height: "600px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {children}
    </MapContainer>
  );
}
