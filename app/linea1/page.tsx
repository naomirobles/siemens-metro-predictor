"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import LeyendaPredicciones from "@/app/components/LeyendaPredicciones";
import LeyendaTecnicos from "@/app/components/LeyendaTecnicos";
import SelectorTecnicos from "@/app/components/SelectorTecnicos";
import ControlPredicciones from "@/app/components/ControlPredicciones";
import Toast from "@/app/components/Toast";
import linea1 from "@/app/data/linea1.json";
import tecnicosIniciales from "@/app/data/tecnicos.json";
import { generarPredicciones } from "@/app/utils/mlSimulator";
import { actualizarPosicionesTecnicos, Tecnico } from "@/app/utils/tecnicosSimulator";
import { enviarNotificacionUbicacion } from "@/app/utils/telegramNotifications";

const MapaMetro = dynamic(() => import("@/app/components/MapaMetro"), {
  ssr: false,
});

const Linea1Layer = dynamic(() => import("@/app/components/Linea1Layer"), {
  ssr: false,
});

const TecnicosLayer = dynamic(() => import("@/app/components/TecnicosLayer"), {
  ssr: false,
});

const MapClickHandler = dynamic(() => import("@/app/components/MapClickHandler"), {
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
  const [tecnicos, setTecnicos] = useState<Tecnico[]>(tecnicosIniciales as Tecnico[]);
  const [actualizandoTecnicos, setActualizandoTecnicos] = useState(false);
  const [tecnicoSeleccionado, setTecnicoSeleccionado] = useState<string | null>(null);
  const [modoAsignacion, setModoAsignacion] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

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

  // Función para actualizar posiciones de técnicos
  const actualizarTecnicos = () => {
    setActualizandoTecnicos(true);
    const nuevosTecnicos = actualizarPosicionesTecnicos(tecnicos);
    setTecnicos(nuevosTecnicos);

    // Desactivar indicador después de 500ms
    setTimeout(() => setActualizandoTecnicos(false), 500);
  };

  // Función para asignar destino a un técnico
  const asignarDestino = async (lat: number, lng: number) => {
    if (!tecnicoSeleccionado) return;

    // Encontrar el técnico seleccionado
    const tecnicoActual = tecnicos.find((t) => t.id === tecnicoSeleccionado);
    if (!tecnicoActual) return;

    // Actualizar estado con el nuevo destino
    const nuevosTecnicos = tecnicos.map((tecnico) => {
      if (tecnico.id === tecnicoSeleccionado) {
        return {
          ...tecnico,
          destino: { lat, lng },
        };
      }
      return tecnico;
    });

    setTecnicos(nuevosTecnicos);

    // Enviar notificación de Telegram
    const resultado = await enviarNotificacionUbicacion(tecnicoActual, { lat, lng });

    if (resultado.success) {
      console.log(`✅ Notificación enviada a ${tecnicoActual.nombre} via Telegram`);
      setToast({
        message: `Ubicación enviada a ${tecnicoActual.nombre} via Telegram`,
        type: "success",
      });
    } else {
      console.warn(`⚠️ No se pudo enviar notificación: ${resultado.error}`);
      setToast({
        message: resultado.error || "No se pudo enviar la notificación",
        type: "error",
      });
    }

    setTecnicoSeleccionado(null);
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

  // Actualizar posiciones de técnicos periódicamente (cada 3 segundos)
  useEffect(() => {
    if (!activo) return;

    const intervalId = setInterval(() => {
      actualizarTecnicos();
    }, 3000); // Actualizar técnicos cada 3 segundos

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activo, tecnicos]);

  return (
    <div className="p-6 **bg-[#020026] text-white** min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Línea 1 del Metro CDMX</h1>
      <p className="text-gray-600 mb-6 **text-gray-300**">
        Monitoreo en tiempo real con predicciones de Machine Learning
      </p>

      <div className="flex gap-6">
        <div className="flex-1">
          <MapaMetro>
            <Linea1Layer predicciones={predicciones} key={keyCounter} />
            <TecnicosLayer
              tecnicos={tecnicos}
              tecnicoSeleccionado={tecnicoSeleccionado}
              onSeleccionarTecnico={(id) => {
                if (modoAsignacion) {
                  setTecnicoSeleccionado(tecnicoSeleccionado === id ? null : id);
                }
              }}
            />
            <MapClickHandler
              onMapClick={asignarDestino}
              enabled={modoAsignacion && tecnicoSeleccionado !== null}
            />
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
          <SelectorTecnicos
            tecnicos={tecnicos}
            tecnicoSeleccionado={tecnicoSeleccionado}
            onSeleccionar={setTecnicoSeleccionado}
            modoAsignacion={modoAsignacion}
            onToggleModoAsignacion={() => setModoAsignacion(!modoAsignacion)}
          />
          <LeyendaPredicciones actualizando={actualizando} />
          <LeyendaTecnicos tecnicos={tecnicos} actualizando={actualizandoTecnicos} />
        </div>
      </div>

      {/* Toast de notificaciones */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}