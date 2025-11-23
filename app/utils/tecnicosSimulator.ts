/**
 * Simulador de ubicación de técnicos en tiempo real
 * Simula el movimiento de técnicos por el área del metro
 */

export type EstadoTecnico = "disponible" | "en_ruta" | "en_servicio";

export interface Ubicacion {
  lat: number;
  lng: number;
}

export interface Tecnico {
  id: string;
  nombre: string;
  especialidad: string;
  estado: EstadoTecnico;
  ubicacion: Ubicacion;
  estacionCercana: string;
  destino?: Ubicacion; // Ubicación objetivo asignada por el usuario
}

/**
 * Calcula la distancia entre dos ubicaciones (en grados, aproximado)
 */
function calcularDistancia(ubicacion1: Ubicacion, ubicacion2: Ubicacion): number {
  const deltaLat = ubicacion2.lat - ubicacion1.lat;
  const deltaLng = ubicacion2.lng - ubicacion1.lng;
  return Math.sqrt(deltaLat * deltaLat + deltaLng * deltaLng);
}

/**
 * Simula un pequeño movimiento del técnico
 * Si tiene un destino asignado, se mueve hacia él. Si no, se mueve aleatoriamente.
 *
 * @param tecnico - Técnico actual
 * @returns Técnico con ubicación actualizada
 */
export function simularMovimiento(tecnico: Tecnico): Tecnico {
  let nuevaUbicacion = { ...tecnico.ubicacion };
  let nuevoEstado = tecnico.estado;
  let nuevoDestino = tecnico.destino;

  // Si tiene un destino asignado, moverse hacia él
  if (tecnico.destino) {
    const distancia = calcularDistancia(tecnico.ubicacion, tecnico.destino);
    const umbralLlegada = 0.0005; // ~50 metros

    if (distancia <= umbralLlegada) {
      // Ha llegado al destino
      nuevaUbicacion = { ...tecnico.destino };
      nuevoDestino = undefined;
      nuevoEstado = "en_servicio";
    } else {
      // Moverse hacia el destino
      const velocidad = 0.001; // ~100m por actualización
      const factor = Math.min(velocidad / distancia, 1);

      nuevaUbicacion = {
        lat: tecnico.ubicacion.lat + (tecnico.destino.lat - tecnico.ubicacion.lat) * factor,
        lng: tecnico.ubicacion.lng + (tecnico.destino.lng - tecnico.ubicacion.lng) * factor,
      };
      nuevoEstado = "en_ruta";
    }
  } else {
    // Movimiento aleatorio pequeño (aproximadamente 100-500 metros)
    const deltaLat = (Math.random() - 0.5) * 0.005; // ~500m max
    const deltaLng = (Math.random() - 0.5) * 0.005;

    nuevaUbicacion = {
      lat: tecnico.ubicacion.lat + deltaLat,
      lng: tecnico.ubicacion.lng + deltaLng,
    };

    // 30% de probabilidad de cambiar de estado (solo si no tiene destino)
    if (Math.random() < 0.3) {
      const estados: EstadoTecnico[] = ["disponible", "en_ruta", "en_servicio"];
      nuevoEstado = estados[Math.floor(Math.random() * estados.length)];
    }
  }

  return {
    ...tecnico,
    estado: nuevoEstado,
    ubicacion: nuevaUbicacion,
    destino: nuevoDestino,
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
