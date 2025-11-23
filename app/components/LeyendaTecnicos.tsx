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
          Técnicos en Campo
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

      <div
        className="mb-3 p-2.5 rounded-lg border text-center"
        style={{
          backgroundColor: 'rgba(131, 238, 205, 0.15)',
          borderColor: '#83EECD',
        }}
      >
        <p className="text-sm font-bold" style={{ color: '#83EECD' }}>
          Total: {tecnicos.length} técnicos
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded-full border-2 shadow-lg flex items-center justify-center"
              style={{ backgroundColor: '#10B981', borderColor: '#83EECD' }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <span className="text-sm font-medium" style={{ color: 'white' }}>
              Disponible
            </span>
          </div>
          <span
            className="text-sm font-bold px-2 py-1 rounded min-w-[28px] text-center"
            style={{
              color: '#83EECD',
              backgroundColor: 'rgba(131, 238, 205, 0.2)',
            }}
          >
            {disponibles}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded-full border-2 shadow-lg flex items-center justify-center"
              style={{ backgroundColor: '#3B82F6', borderColor: '#83EECD' }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <span className="text-sm font-medium" style={{ color: 'white' }}>
              En Ruta
            </span>
          </div>
          <span
            className="text-sm font-bold px-2 py-1 rounded min-w-[28px] text-center"
            style={{
              color: '#83EECD',
              backgroundColor: 'rgba(131, 238, 205, 0.2)',
            }}
          >
            {enRuta}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded-full border-2 shadow-lg flex items-center justify-center"
              style={{ backgroundColor: '#EF4444', borderColor: '#83EECD' }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <span className="text-sm font-medium" style={{ color: 'white' }}>
              En Servicio
            </span>
          </div>
          <span
            className="text-sm font-bold px-2 py-1 rounded min-w-[28px] text-center"
            style={{
              color: '#83EECD',
              backgroundColor: 'rgba(131, 238, 205, 0.2)',
            }}
          >
            {enServicio}
          </span>
        </div>
      </div>

      <p className="text-xs mt-3 italic" style={{ color: 'rgba(131, 238, 205, 0.7)' }}>
        * Ubicaciones simuladas en tiempo real
      </p>
    </div>
  );
}
