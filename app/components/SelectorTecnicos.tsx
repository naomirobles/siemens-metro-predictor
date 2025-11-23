import { Tecnico, getColorPorEstado, getTextoEstado } from "@/app/utils/tecnicosSimulator";

interface Props {
  tecnicos: Tecnico[];
  tecnicoSeleccionado: string | null;
  onSeleccionar: (tecnicoId: string | null) => void;
  modoAsignacion: boolean;
  onToggleModoAsignacion: () => void;
}

export default function SelectorTecnicos({
  tecnicos,
  tecnicoSeleccionado,
  onSeleccionar,
  modoAsignacion,
  onToggleModoAsignacion,
}: Props) {
  return (
    <div
      className="p-5 rounded-xl shadow-2xl border flex flex-col h-[60vh] lg:h-[75vh]"
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
        Asignar Ubicación
      </h3>

      <button
        onClick={onToggleModoAsignacion}
        className="w-full py-2.5 px-4 rounded-lg font-semibold transition-all transform hover:scale-105 mb-3"
        style={{
          backgroundColor: modoAsignacion ? '#83EECD' : 'rgba(131, 238, 205, 0.2)',
          color: modoAsignacion ? '#020026' : '#83EECD',
          border: `2px solid ${modoAsignacion ? '#83EECD' : 'rgba(131, 238, 205, 0.5)'}`,
        }}
      >
        {modoAsignacion ? "Modo Asignación: ACTIVO" : "Activar Modo Asignación"}
      </button>

      {modoAsignacion && (
        <div
          className="mb-3 p-2.5 rounded-lg border"
          style={{
            backgroundColor: 'rgba(131, 238, 205, 0.15)',
            borderColor: '#83EECD',
          }}
        >
          <p className="text-xs font-medium" style={{ color: '#83EECD' }}>
            {tecnicoSeleccionado
              ? "Haz clic en el mapa para asignar ubicación"
              : "Selecciona un técnico y luego haz clic en el mapa"}
          </p>
        </div>
      )}

      <p className="text-sm font-medium mb-2" style={{ color: 'white' }}>
        Selecciona un técnico:
      </p>

      <div className="space-y-2 overflow-y-auto pr-2 flex-1 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-[#83EECD] scrollbar-track-transparent">
        {tecnicos.map((tecnico) => {
          const isSelected = tecnico.id === tecnicoSeleccionado;
          const color = getColorPorEstado(tecnico.estado);

          return (
            <button
              key={tecnico.id}
              onClick={() =>
                onSeleccionar(isSelected ? null : tecnico.id)
              }
              className="w-full p-2.5 rounded-lg border-2 transition-all text-left transform hover:scale-102"
              style={{
                borderColor: isSelected ? '#83EECD' : 'rgba(131, 238, 205, 0.3)',
                backgroundColor: isSelected
                  ? 'rgba(131, 238, 205, 0.2)'
                  : 'rgba(255, 255, 255, 0.05)',
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3.5 h-3.5 rounded-full border-2 shadow-sm"
                    style={{ backgroundColor: color, borderColor: '#83EECD' }}
                  ></div>
                  <span className="font-semibold text-sm" style={{ color: 'white' }}>
                    {tecnico.id}
                  </span>
                </div>
                {tecnico.destino && (
                  <span
                    className="text-xs px-1.5 py-0.5 rounded font-medium"
                    style={{
                      backgroundColor: 'rgba(131, 238, 205, 0.3)',
                      color: '#83EECD',
                    }}
                  >
                    En Ruta
                  </span>
                )}
              </div>
              <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                {tecnico.nombre}
              </p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  {tecnico.especialidad}
                </p>
                <p
                  className="text-xs font-medium"
                  style={{ color }}
                >
                  {getTextoEstado(tecnico.estado)}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {tecnicoSeleccionado && (
        <button
          onClick={() => onSeleccionar(null)}
          className="w-full mt-3 py-2 px-4 rounded-lg transition-all text-sm font-medium"
          style={{
            backgroundColor: 'rgba(131, 238, 205, 0.1)',
            color: '#83EECD',
            border: '1px solid rgba(131, 238, 205, 0.3)',
          }}
        >
          Deseleccionar
        </button>
      )}
    </div>
  );
}
