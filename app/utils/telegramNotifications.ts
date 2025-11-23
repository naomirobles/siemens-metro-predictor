/**
 * Utilidades para enviar notificaciones de Telegram a técnicos
 */

import { Tecnico, Ubicacion } from "./tecnicosSimulator";

export interface NotificacionResult {
  success: boolean;
  error?: string;
}

/**
 * Envía notificación de ubicación asignada a un técnico vía Telegram
 *
 * @param tecnico - Técnico al que se le asigna la ubicación
 * @param destino - Coordenadas de la ubicación asignada
 * @returns Promesa con resultado del envío
 */
export async function enviarNotificacionUbicacion(
  tecnico: Tecnico,
  destino: Ubicacion
): Promise<NotificacionResult> {
  // Si el técnico no tiene chat ID de Telegram, no enviar
  if (!tecnico.telegramChatId) {
    return {
      success: false,
      error: "Técnico no tiene Telegram configurado",
    };
  }

  try {
    const response = await fetch("/api/telegram/send-location", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId: tecnico.telegramChatId,
        tecnicoId: tecnico.id,
        tecnicoNombre: tecnico.nombre,
        latitude: destino.lat,
        longitude: destino.lng,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Error al enviar notificación de Telegram:", result);
      return {
        success: false,
        error: result.error || "Error al enviar notificación",
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error en enviarNotificacionUbicacion:", error);
    return {
      success: false,
      error: "Error de conexión al enviar notificación",
    };
  }
}

/**
 * Verifica si un técnico tiene Telegram configurado
 *
 * @param tecnico - Técnico a verificar
 * @returns true si tiene chat ID configurado
 */
export function tieneTelegramConfigurado(tecnico: Tecnico): boolean {
  return !!tecnico.telegramChatId;
}
