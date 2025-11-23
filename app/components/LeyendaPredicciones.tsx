interface Props {
  actualizando?: boolean;
}

export default function LeyendaPredicciones({ actualizando }: Props) {
  return (
    <div
      className="p-5 rounded-xl shadow-2xl border h-full"
      style={{
        backgroundColor: 'rgba(2, 0, 38, 0.8)',
        borderColor: '#83EECD',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3
          className="text-lg font-bold"
          style={{ color: '#83EECD' }}
        >
          Predicciones ML
        </h3>
        {actualizando && (
          <div className="flex items-center gap-2 text-xs" style={{ color: '#83EECD' }}>
            <div
              className="animate-ping w-2 h-2 rounded-full"
              style={{ backgroundColor: '#83EECD' }}
            ></div>
            <span className="font-medium">Actualizando</span>
          </div>
        )}
      </div>

      <p className="text-xs mb-3" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
        Probabilidad de incidente en estación:
      </p>

      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full border-2 shadow-lg"
            style={{ backgroundColor: '#10B981', borderColor: '#83EECD' }}
          ></div>
          <span className="text-sm font-medium" style={{ color: 'white' }}>
            Baja (&lt; 40%)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full border-2 shadow-lg"
            style={{ backgroundColor: '#F59E0B', borderColor: '#83EECD' }}
          ></div>
          <span className="text-sm font-medium" style={{ color: 'white' }}>
            Media (40% - 70%)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full border-2 shadow-lg"
            style={{ backgroundColor: '#EF4444', borderColor: '#83EECD' }}
          ></div>
          <span className="text-sm font-medium" style={{ color: 'white' }}>
            Alta (&gt; 70%)
          </span>
        </div>
      </div>

    </div>
  );
}
