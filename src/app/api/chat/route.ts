// src/app/api/chat/route.ts

import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Inicializa el cliente de OpenAI fuera del handler para reutilizarlo
// Lee la clave API directamente desde las variables de entorno del servidor
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Maneja las solicitudes POST para interactuar con la API de chat de OpenAI.
 * Espera un cuerpo JSON con una propiedad 'message'.
 * @param request La solicitud entrante de Next.js.
 * @returns Una respuesta JSON con la réplica del asistente o un mensaje de error.
 */
export async function POST(request: NextRequest) {
  // Verifica si la clave API está configurada
  if (!process.env.OPENAI_API_KEY) {
    console.error("Error: OPENAI_API_KEY no está configurada en las variables de entorno.");
    return NextResponse.json(
      { error: "La configuración del servidor está incompleta. Falta la clave API." },
      { status: 500 } // Internal Server Error
    );
  }

  try {
    // Extrae el mensaje del cuerpo de la solicitud
    const body = await request.json();
    const userMessage = body.message;

    // Validación básica del mensaje
    if (!userMessage || typeof userMessage !== 'string' || userMessage.trim() === '') {
      return NextResponse.json(
        { error: "El mensaje proporcionado es inválido o está vacío." },
        { status: 400 } // Bad Request
      );
    }

    // Realiza la llamada a la API de Completions de Chat de OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Puedes cambiar a "gpt-4" o el modelo que prefieras
      messages: [
        // Opcionalmente, puedes añadir un mensaje de sistema para guiar al modelo
        // { role: "system", content: "Eres un asistente útil." },
        { role: "user", content: userMessage },
      ],
      // Otros parámetros opcionales (temperature, max_tokens, etc.)
      // temperature: 0.7,
      // max_tokens: 150,
    });

    // Extrae la respuesta del asistente
    const assistantResponse = completion.choices[0]?.message?.content;

    if (!assistantResponse) {
       console.error("Error: No se recibió contenido en la respuesta de OpenAI:", completion);
       return NextResponse.json(
         { error: "No se pudo obtener una respuesta del asistente." },
         { status: 500 }
       );
    }

    // Devuelve la respuesta del asistente al cliente
    return NextResponse.json({ response: assistantResponse });

  } catch (error) {
    console.error("Error al procesar la solicitud de chat:", error);

    // Manejo de errores específicos de OpenAI si es necesario
    if (error instanceof OpenAI.APIError) {
      return NextResponse.json(
        { error: `Error de API OpenAI: ${error.status} ${error.name} ${error.message}` },
        { status: error.status || 500 }
      );
    }

    // Error genérico del servidor
    return NextResponse.json(
      { error: "Ocurrió un error interno en el servidor al procesar tu solicitud." },
      { status: 500 }
    );
  }
}