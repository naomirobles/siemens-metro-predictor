"use client";

import { GeoJSON } from "react-leaflet";
import L from "leaflet";
import linea1 from "@/app/data/linea1.json";
import { estiloLinea, estiloEstacion } from "@/app/components/EstilosLeaflet";

export default function Linea1Layer() {
  return (
    <GeoJSON
      data={linea1 as any}
      style={() => estiloLinea}
      pointToLayer={(feature, latlng) => {
        const marker = L.circleMarker(latlng, estiloEstacion);
        if (feature.properties?.estacion) {
          marker.bindTooltip(feature.properties.estacion, {
            permanent: true,
            direction: "top",
            offset: L.point(0, -10),
          });
        }
        return marker;
      }}
    />
  );
}
