import { NextRequest, NextResponse } from "next/server";

interface TelegramLocationRequest {
  chatId: string;
  tecnicoId: string;
  tecnicoNombre: string;
  latitude: number;
  longitude: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: TelegramLocationRequest = await request.json();
    const { chatId, tecnicoId, tecnicoNombre, latitude, longitude } = body;

    const botToken = process.env.TELEGRAM_BOT_TOKEN;

    if (!botToken) {
      return NextResponse.json(
        { error: "Token de Telegram no configurado" },
        { status: 500 }
      );
    }

    // Enviar mensaje de texto con información
    const messageText = `📍 *Nueva ubicación asignada*\n\n` +
      `Técnico: ${tecnicoNombre} (${tecnicoId})\n` +
      `Coordenadas: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}\n\n` +
      `🗺️ [Ver en Google Maps](https://www.google.com/maps?q=${latitude},${longitude})\n\n` +
      `⏰ Asignado: ${new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })}`;

    const sendMessageResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: messageText,
          parse_mode: "Markdown",
        }),
      }
    );

    const messageResult = await sendMessageResponse.json();

    if (!sendMessageResponse.ok) {
      console.error("Error enviando mensaje de Telegram:", messageResult);
      return NextResponse.json(
        { error: "Error al enviar mensaje", details: messageResult },
        { status: 500 }
      );
    }

    // Enviar ubicación GPS nativa de Telegram
    const sendLocationResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendLocation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          latitude: latitude,
          longitude: longitude,
        }),
      }
    );

    const locationResult = await sendLocationResponse.json();

    if (!sendLocationResponse.ok) {
      console.error("Error enviando ubicación de Telegram:", locationResult);
      return NextResponse.json(
        { error: "Error al enviar ubicación", details: locationResult },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Ubicación enviada exitosamente a Telegram",
      messageId: messageResult.result?.message_id,
      locationId: locationResult.result?.message_id,
    });
  } catch (error) {
    console.error("Error en API de Telegram:", error);
    return NextResponse.json(
      { error: "Error interno del servidor", details: String(error) },
      { status: 500 }
    );
  }
}
