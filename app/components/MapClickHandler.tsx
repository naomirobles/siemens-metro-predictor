"use client";

import { useMapEvents } from "react-leaflet";

interface Props {
  onMapClick: (lat: number, lng: number) => void;
  enabled: boolean;
}

export default function MapClickHandler({ onMapClick, enabled }: Props) {
  useMapEvents({
    click: (e) => {
      if (enabled) {
        onMapClick(e.latlng.lat, e.latlng.lng);
      }
    },
  });

  return null;
}
