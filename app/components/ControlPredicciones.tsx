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
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 mb-6">
      <h3 className="text-lg font-bold mb-3 text-gray-800">
        Control de Predicciones
      </h3>

      <div className="space-y-4">
        {/* Toggle Activo/Pausado */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Estado:</span>
          <button
            onClick={onToggleActivo}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activo
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-gray-500 hover:bg-gray-600 text-white"
            }`}
          >
            {activo ? "▶ Activo" : "⏸ Pausado"}
          </button>
        </div>

        {/* Input de Intervalo */}
        <div>
          <label
            htmlFor="intervalo"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Intervalo de actualización (segundos):
          </label>
          <input
            id="intervalo"
            type="number"
            min="1"
            max="60"
            value={inputValue}
            onChange={handleIntervaloChange}
            disabled={!activo}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <p className="text-xs text-gray-500 mt-1">
            Rango: 1-60 segundos
          </p>
        </div>

        {/* Última Actualización */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-200">
          <span className="text-sm text-gray-600">Última actualización:</span>
          <span className="text-sm font-mono text-gray-800">
            {formatearTiempo(ultimaActualizacion)}
          </span>
        </div>

        {/* Indicador de próxima actualización */}
        {activo && (
          <div className="flex items-center gap-2 text-sm text-blue-600">
            <div className="animate-pulse w-2 h-2 bg-blue-600 rounded-full"></div>
            Actualizando cada {intervalo}s
          </div>
        )}
      </div>
    </div>
  );
}
