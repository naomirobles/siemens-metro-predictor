"use client";

import { useState } from "react";

interface Props {
  intervalo: number;
  onIntervaloChange: (intervalo: number) => void;
  activo: boolean;
  onToggleActivo: () => void;
  ultimaActualizacion?: Date;
}

export default function ControlPredicciones({
  intervalo,
  onIntervaloChange,
  activo,
  onToggleActivo,
  ultimaActualizacion,
}: Props) {
  const [inputValue, setInputValue] = useState(intervalo.toString());

  const handleIntervaloChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0 && numValue <= 60) {
      onIntervaloChange(numValue);
    }
  };

  const formatearTiempo = (date?: Date) => {
    if (!date) return "Nunca";
    return date.toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div
      className="p-5 rounded-xl shadow-2xl border h-full"
      style={{
        backgroundColor: 'rgba(2, 0, 38, 0.8)',
        borderColor: '#83EECD',
        backdropFilter: 'blur(10px)',
      }}
    >
      <h3
        className="text-lg font-bold mb-3"
        style={{ color: '#83EECD' }}
      >
        Control de Predicciones
      </h3>

      <div className="space-y-3">
        {/* Toggle Activo/Pausado */}
        <button
          onClick={onToggleActivo}
          className="w-full px-4 py-2.5 rounded-lg font-semibold transition-all transform hover:scale-105"
          style={{
            backgroundColor: activo ? '#83EECD' : 'rgba(131, 238, 205, 0.3)',
            color: activo ? '#020026' : '#83EECD',
            border: `2px solid ${activo ? '#83EECD' : 'rgba(131, 238, 205, 0.5)'}`,
          }}
        >
          {activo ? "▶ Activo" : "⏸ Pausado"}
        </button>

        {/* Input de Intervalo */}
        <div>
          <label
            htmlFor="intervalo"
            className="block text-xs font-medium mb-1.5"
            style={{ color: 'white' }}
          >
            Intervalo (seg):
          </label>
          <input
            id="intervalo"
            type="number"
            min="1"
            max="60"
            value={inputValue}
            onChange={handleIntervaloChange}
            disabled={!activo}
            className="w-full px-3 py-2 rounded-lg text-sm font-medium transition-all disabled:cursor-not-allowed"
            style={{
              backgroundColor: activo ? 'rgba(255, 255, 255, 0.1)' : 'rgba(131, 238, 205, 0.05)',
              border: `2px solid ${activo ? '#83EECD' : 'rgba(131, 238, 205, 0.3)'}`,
              color: 'white',
              outline: 'none',
            }}
          />
        </div>

        {/* Última Actualización */}
        <div className="flex items-center justify-between text-xs">
          <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Última act:
          </span>
          <span
            className="font-mono font-semibold"
            style={{ color: '#83EECD' }}
          >
            {formatearTiempo(ultimaActualizacion)}
          </span>
        </div>

        {/* Indicador de próxima actualización */}
        {activo && (
          <div className="flex items-center gap-2 text-xs" style={{ color: '#83EECD' }}>
            <div
              className="animate-pulse w-2 h-2 rounded-full"
              style={{ backgroundColor: '#83EECD' }}
            ></div>
            Actualizando cada {intervalo}s
          </div>
        )}
      </div>
    </div>
  );
}
