"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import LeyendaPredicciones from "@/app/components/LeyendaPredicciones";
import ControlPredicciones from "@/app/components/ControlPredicciones";
import linea1 from "@/app/data/linea1.json";
import { generarPredicciones } from "@/app/utils/mlSimulator";

const MapaMetro = dynamic(() => import("@/app/components/MapaMetro"), {
  ssr: false,
});

const Linea1Layer = dynamic(() => import("@/app/components/Linea1Layer"), {
  ssr: false,
});

export default function Linea1Page() {
  const [intervalo, setIntervalo] = useState(5); // segundos
  const [activo, setActivo] = useState(true);
  const [predicciones, setPredicciones] = useState<Map<string, number>>(
    new Map()
  );
  const [ultimaActualizacion, setUltimaActualizacion] = useState<Date>();
  const [keyCounter, setKeyCounter] = useState(0);
  const [actualizando, setActualizando] = useState(false);

  // Obtener lista de estaciones
  const estaciones = linea1.features
    .filter((f) => f.geometry.type === "Point" && f.properties.estacion)
    .map((f) => f.properties.estacion as string);

  // Función para actualizar predicciones
  const actualizarPredicciones = () => {
    setActualizando(true);
    const nuevasPredicciones = generarPredicciones(estaciones);
    setPredicciones(nuevasPredicciones);
    setUltimaActualizacion(new Date());
    setKeyCounter((prev) => prev + 1); // Forzar re-render del mapa

    // Desactivar indicador después de 500ms
    setTimeout(() => setActualizando(false), 500);
  };

  // Generar predicciones iniciales
  useEffect(() => {
    actualizarPredicciones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Actualizar predicciones periódicamente
  useEffect(() => {
    if (!activo) return;

    const intervalId = setInterval(() => {
      actualizarPredicciones();
    }, intervalo * 1000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intervalo, activo]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Línea 1 del Metro CDMX</h1>
      <p className="text-gray-600 mb-6">
        Monitoreo en tiempo real con predicciones de Machine Learning
      </p>

      <div className="flex gap-6">
        <div className="flex-1">
          <MapaMetro>
            <Linea1Layer predicciones={predicciones} key={keyCounter} />
          </MapaMetro>
        </div>

        <div className="w-80 space-y-6">
          <ControlPredicciones
            intervalo={intervalo}
            onIntervaloChange={setIntervalo}
            activo={activo}
            onToggleActivo={() => setActivo(!activo)}
            ultimaActualizacion={ultimaActualizacion}
          />
          <LeyendaPredicciones actualizando={actualizando} />
        </div>
      </div>
    </div>
  );
}
