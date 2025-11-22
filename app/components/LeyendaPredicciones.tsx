interface Props {
  actualizando?: boolean;
}

export default function LeyendaPredicciones({ actualizando }: Props) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-gray-800">
          Predicciones ML
        </h3>
        {actualizando && (
          <div className="flex items-center gap-2 text-xs text-green-600">
            <div className="animate-ping w-2 h-2 bg-green-600 rounded-full"></div>
            <span>Actualizando</span>
          </div>
        )}
      </div>
      <p className="text-sm text-gray-600 mb-3">
        Probabilidad de incidente en estación:
      </p>
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-[#10B981] border-2 border-white shadow-sm"></div>
          <span className="text-sm text-gray-700">
            Baja (&lt; 40%)
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-[#F59E0B] border-2 border-white shadow-sm"></div>
          <span className="text-sm text-gray-700">
            Media (40% - 70%)
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-[#EF4444] border-2 border-white shadow-sm"></div>
          <span className="text-sm text-gray-700">
            Alta (&gt; 70%)
          </span>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-3 italic">
        * Valores generados aleatoriamente para simulación
      </p>
    </div>
  );
}
