"use client";

import { useEffect, useState } from "react";
import { GeoJSON } from "react-leaflet";
import L from "leaflet";
import linea1 from "@/app/data/linea1.json";
import { estiloLinea } from "@/app/components/EstilosLeaflet";
import {
  getColorPorProbabilidad,
  formatearPorcentaje,
  PrediccionConFalla,
} from "@/app/utils/mlSimulator";

interface Props {
  predicciones: Map<string, PrediccionConFalla>;
  key?: number; // Para forzar re-render cuando cambian las predicciones
}

export default function Linea1Layer({ predicciones }: Props) {
  const [, forceUpdate] = useState(0);

  // Forzar actualización cuando cambien las predicciones
  useEffect(() => {
    forceUpdate((prev) => prev + 1);
  }, [predicciones]);

  return (
    <GeoJSON
      data={linea1 as any}
      style={() => estiloLinea}
      pointToLayer={(feature, latlng) => {
        const nombreEstacion = feature.properties?.estacion;

        if (!nombreEstacion) {
          return L.circleMarker(latlng);
        }

        // Obtener predicción para esta estación
        const prediccion = predicciones.get(nombreEstacion);
        const probabilidad = prediccion?.probabilidad ?? 0;
        const fallaMasProbable = prediccion?.fallaMasProbable ?? "Sin datos";
        const color = getColorPorProbabilidad(probabilidad);

        // Crear marcador con color basado en la probabilidad
        const marker = L.circleMarker(latlng, {
          radius: 8,
          fillColor: color,
          color: "#ffffff",
          weight: 2,
          opacity: 1,
          fillOpacity: 0.9,
        });

        // Tooltip con nombre, probabilidad y falla más probable
        const tooltipContent = `
          <div style="text-align: center;">
            <strong>${nombreEstacion}</strong><br/>
            <span style="color: ${color}; font-weight: bold;">
              ${formatearPorcentaje(probabilidad)}
            </span><br/>
            <span style="font-size: 0.9em; color: #666;">
              ${fallaMasProbable}
            </span>
          </div>
        `;

        marker.bindTooltip(tooltipContent, {
          permanent: true,
          direction: "top",
          offset: L.point(0, -12),
          className: "custom-tooltip",
        });

        return marker;
      }}
    />
  );
}
