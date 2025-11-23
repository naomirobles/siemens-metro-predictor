/**
 * Simulador de modelo de Machine Learning
 * Genera predicciones aleatorias entre 0 y 1 para cada estación
 */

export interface Prediccion {
  estacion: string;
  probabilidad: number; // Valor entre 0 y 1
}

export interface PrediccionConFalla {
  probabilidad: number; // Valor entre 0 y 1
  fallaMasProbable: string; // Nombre de la falla más probable
}

/**
 * Simula un modelo de ML generando una predicción aleatoria
 * para cada estación del metro
 *
 * @param estaciones - Array de nombres de estaciones
 * @returns Array de predicciones con probabilidades entre 0 y 1
 */
export function generarPredicciones(estaciones: string[]): Map<string, number> {
  const predicciones = new Map<string, number>();

  estaciones.forEach((estacion) => {
    // Genera un número aleatorio entre 0 y 1
    const probabilidad = Math.random();
    predicciones.set(estacion, probabilidad);
  });

  return predicciones;
}

/**
 * Obtiene predicciones desde la API de Machine Learning
 *
 * @returns Map con predicciones que incluyen probabilidad y tipo de falla
 */
export async function obtenerPrediccionesAPI(): Promise<Map<string, PrediccionConFalla>> {
  try {
    const response = await fetch('http://localhost:8000/iteracion');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const predicciones = new Map<string, PrediccionConFalla>();

    // Extraer solo los datos relevantes: estación, falla más probable y su probabilidad
    if (data.estados_estaciones && Array.isArray(data.estados_estaciones)) {
      data.estados_estaciones.forEach((estado: any) => {
        predicciones.set(estado.estacion, {
          probabilidad: estado.falla_mas_probable_prob / 100, // Convertir de % a 0-1
          fallaMasProbable: estado.falla_mas_probable,
        });
      });
    }

    return predicciones;
  } catch (error) {
    console.error('Error al obtener predicciones de la API:', error);
    // Retornar mapa vacío en caso de error
    return new Map();
  }
}

/**
 * Obtiene el color del marcador basado en la probabilidad
 * Verde: probabilidad baja (< 0.4)
 * Amarillo: probabilidad media (0.4 - 0.7)
 * Rojo: probabilidad alta (> 0.7)
 *
 * @param probabilidad - Valor entre 0 y 1
 * @returns Color en formato hexadecimal
 */
export function getColorPorProbabilidad(probabilidad: number): string {
  if (probabilidad < 0.4) {
    return "#10B981"; // Verde (baja probabilidad)
  } else if (probabilidad < 0.7) {
    return "#F59E0B"; // Amarillo (probabilidad media)
  } else {
    return "#EF4444"; // Rojo (alta probabilidad)
  }
}

/**
 * Formatea el porcentaje para mostrar en UI
 *
 * @param probabilidad - Valor entre 0 y 1
 * @returns String formateado (ej: "75.3%")
 */
export function formatearPorcentaje(probabilidad: number): string {
  return `${(probabilidad * 100).toFixed(1)}%`;
}
