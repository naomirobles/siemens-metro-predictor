"use client";

import { useEffect } from "react";
import { Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import { Tecnico, getColorPorEstado, getTextoEstado } from "@/app/utils/tecnicosSimulator";

interface Props {
  tecnicos: Tecnico[];
}

export default function TecnicosLayer({ tecnicos }: Props) {
  // Forzar actualización cuando cambien los técnicos
  useEffect(() => {
    // Este efecto se ejecuta cada vez que cambian los técnicos
  }, [tecnicos]);

  // Crear ícono personalizado para cada técnico
  const crearIconoTecnico = (estado: string) => {
    const color = getColorPorEstado(estado as any);

    return L.divIcon({
      html: `
        <div style="
          background-color: ${color};
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="white"/>
          </svg>
        </div>
      `,
      className: "tecnico-marker",
      iconSize: [30, 30],
      iconAnchor: [15, 15],
      popupAnchor: [0, -15],
    });
  };

  return (
    <>
      {tecnicos.map((tecnico) => (
        <Marker
          key={tecnico.id}
          position={[tecnico.ubicacion.lat, tecnico.ubicacion.lng]}
          icon={crearIconoTecnico(tecnico.estado)}
        >
          <Tooltip direction="top" offset={[0, -15]} opacity={0.9}>
            <div style={{ textAlign: "center", minWidth: "120px" }}>
              <strong>{tecnico.id}</strong>
            </div>
          </Tooltip>

          <Popup>
            <div style={{ minWidth: "200px" }}>
              <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", fontWeight: "bold" }}>
                {tecnico.nombre}
              </h3>
              <div style={{ fontSize: "14px", lineHeight: "1.6" }}>
                <p style={{ margin: "4px 0" }}>
                  <strong>ID:</strong> {tecnico.id}
                </p>
                <p style={{ margin: "4px 0" }}>
                  <strong>Especialidad:</strong> {tecnico.especialidad}
                </p>
                <p style={{ margin: "4px 0" }}>
                  <strong>Estado:</strong>{" "}
                  <span
                    style={{
                      color: getColorPorEstado(tecnico.estado),
                      fontWeight: "bold",
                    }}
                  >
                    {getTextoEstado(tecnico.estado)}
                  </span>
                </p>
                <p style={{ margin: "4px 0" }}>
                  <strong>Estación cercana:</strong> {tecnico.estacionCercana}
                </p>
                <p style={{ margin: "8px 0 0 0", fontSize: "12px", color: "#666" }}>
                  Lat: {tecnico.ubicacion.lat.toFixed(4)}, Lng:{" "}
                  {tecnico.ubicacion.lng.toFixed(4)}
                </p>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}
