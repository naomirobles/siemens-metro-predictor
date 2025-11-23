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
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
      <h3 className="text-lg font-bold text-gray-800 mb-3">
        Asignar Ubicación
      </h3>

      <button
        onClick={onToggleModoAsignacion}
        className={`w-full py-2 px-4 rounded-md font-medium transition-colors mb-3 ${
          modoAsignacion
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        {modoAsignacion ? "Modo Asignación: ACTIVO" : "Activar Modo Asignación"}
      </button>

      {modoAsignacion && (
        <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-800">
            {tecnicoSeleccionado
              ? "Haz clic en el mapa para asignar ubicación"
              : "Selecciona un técnico y luego haz clic en el mapa"}
          </p>
        </div>
      )}

      <p className="text-sm text-gray-600 mb-3">Selecciona un técnico:</p>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {tecnicos.map((tecnico) => {
          const isSelected = tecnico.id === tecnicoSeleccionado;
          const color = getColorPorEstado(tecnico.estado);

          return (
            <button
              key={tecnico.id}
              onClick={() =>
                onSeleccionar(isSelected ? null : tecnico.id)
              }
              className={`w-full p-3 rounded-md border-2 transition-all text-left ${
                isSelected
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: color }}
                  ></div>
                  <span className="font-semibold text-gray-800">
                    {tecnico.id}
                  </span>
                </div>
                {tecnico.destino && (
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                    Asignado
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-700">{tecnico.nombre}</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-gray-500">{tecnico.especialidad}</p>
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
          className="w-full mt-3 py-2 px-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm"
        >
          Deseleccionar
        </button>
      )}
    </div>
  );
}
