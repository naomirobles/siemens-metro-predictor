import { Tecnico } from "@/app/utils/tecnicosSimulator";

interface Props {
  tecnicos: Tecnico[];
  actualizando?: boolean;
}

export default function LeyendaTecnicos({ tecnicos, actualizando }: Props) {
  // Contar técnicos por estado
  const disponibles = tecnicos.filter((t) => t.estado === "disponible").length;
  const enRuta = tecnicos.filter((t) => t.estado === "en_ruta").length;
  const enServicio = tecnicos.filter((t) => t.estado === "en_servicio").length;

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-gray-800">
          Técnicos en Campo
        </h3>
        {actualizando && (
          <div className="flex items-center gap-2 text-xs text-blue-600">
            <div className="animate-ping w-2 h-2 bg-blue-600 rounded-full"></div>
            <span>Actualizando</span>
          </div>
        )}
      </div>

      <div className="mb-3 p-3 bg-gray-50 rounded-md">
        <p className="text-sm font-semibold text-gray-700">
          Total: {tecnicos.length} técnicos
        </p>
      </div>

      <p className="text-sm text-gray-600 mb-3">Estado de técnicos:</p>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-[#10B981] border-2 border-white shadow-sm flex items-center justify-center">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <span className="text-sm text-gray-700">Disponible</span>
          </div>
          <span className="text-sm font-semibold text-gray-800">
            {disponibles}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-[#3B82F6] border-2 border-white shadow-sm flex items-center justify-center">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <span className="text-sm text-gray-700">En Ruta</span>
          </div>
          <span className="text-sm font-semibold text-gray-800">{enRuta}</span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-[#EF4444] border-2 border-white shadow-sm flex items-center justify-center">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <span className="text-sm text-gray-700">En Servicio</span>
          </div>
          <span className="text-sm font-semibold text-gray-800">
            {enServicio}
          </span>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-3 italic">
        * Ubicaciones simuladas en tiempo real
      </p>
    </div>
  );
}
