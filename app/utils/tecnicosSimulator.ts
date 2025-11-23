/**
 * Simulador de ubicación de técnicos en tiempo real
 * Simula el movimiento de técnicos por el área del metro
 */

export type EstadoTecnico = "disponible" | "en_ruta" | "en_servicio";

export interface Tecnico {
  id: string;
  nombre: string;
  especialidad: string;
  estado: EstadoTecnico;
  ubicacion: {
    lat: number;
    lng: number;
  };
  estacionCercana: string;
}

/**
 * Simula un pequeño movimiento del técnico
 * Los técnicos se mueven de forma aleatoria en un radio pequeño
 *
 * @param tecnico - Técnico actual
 * @returns Técnico con ubicación actualizada
 */
export function simularMovimiento(tecnico: Tecnico): Tecnico {
  // Movimiento aleatorio pequeño (aproximadamente 100-500 metros)
  const deltaLat = (Math.random() - 0.5) * 0.005; // ~500m max
  const deltaLng = (Math.random() - 0.5) * 0.005;

  // 30% de probabilidad de cambiar de estado
  let nuevoEstado = tecnico.estado;
  if (Math.random() < 0.3) {
    const estados: EstadoTecnico[] = ["disponible", "en_ruta", "en_servicio"];
    nuevoEstado = estados[Math.floor(Math.random() * estados.length)];
  }

  return {
    ...tecnico,
    estado: nuevoEstado,
    ubicacion: {
      lat: tecnico.ubicacion.lat + deltaLat,
      lng: tecnico.ubicacion.lng + deltaLng,
    },
  };
}

/**
 * Actualiza las posiciones de todos los técnicos
 *
 * @param tecnicos - Array de técnicos actuales
 * @returns Array de técnicos con posiciones actualizadas
 */
export function actualizarPosicionesTecnicos(tecnicos: Tecnico[]): Tecnico[] {
  return tecnicos.map(simularMovimiento);
}

/**
 * Obtiene el color del marcador basado en el estado del técnico
 * Verde: disponible
 * Azul: en ruta
 * Rojo: en servicio
 *
 * @param estado - Estado actual del técnico
 * @returns Color en formato hexadecimal
 */
export function getColorPorEstado(estado: EstadoTecnico): string {
  switch (estado) {
    case "disponible":
      return "#10B981"; // Verde
    case "en_ruta":
      return "#3B82F6"; // Azul
    case "en_servicio":
      return "#EF4444"; // Rojo
    default:
      return "#6B7280"; // Gris
  }
}

/**
 * Obtiene la etiqueta de texto para el estado
 *
 * @param estado - Estado del técnico
 * @returns Texto descriptivo del estado
 */
export function getTextoEstado(estado: EstadoTecnico): string {
  switch (estado) {
    case "disponible":
      return "Disponible";
    case "en_ruta":
      return "En Ruta";
    case "en_servicio":
      return "En Servicio";
    default:
      return "Desconocido";
  }
}

/**
 * Obtiene un ícono de técnico en SVG
 *
 * @param estado - Estado del técnico
 * @returns String con SVG del ícono
 */
export function getIconoTecnico(estado: EstadoTecnico): string {
  const color = getColorPorEstado(estado);
  return `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="${color}" stroke="white" stroke-width="2"/>
      <path d="M12 8v5l3 3" stroke="white" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `;
}
