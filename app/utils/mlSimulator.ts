/**
 * Simulador de modelo de Machine Learning
 * Genera predicciones aleatorias entre 0 y 1 para cada estación
 */

export interface Prediccion {
  estacion: string;
  probabilidad: number; // Valor entre 0 y 1
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
