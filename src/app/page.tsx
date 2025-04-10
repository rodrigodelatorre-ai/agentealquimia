"use client"; // Marca este componente como Client Component para interactividad

import { useState, FormEvent, ChangeEvent, useRef, useEffect } from 'react';

// Define la estructura de un mensaje en el chat
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]); // Estado para almacenar los mensajes del chat
  const [input, setInput] = useState<string>(''); // Estado para el input del usuario
  const [isLoading, setIsLoading] = useState<boolean>(false); // Estado para indicar si se está esperando respuesta
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  const messagesEndRef = useRef<HTMLDivElement | null>(null); // Ref para hacer scroll automático al final

  // Efecto para hacer scroll al último mensaje cuando se añaden nuevos mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /**
   * Maneja el envío del formulario (cuando el usuario presiona Enter o el botón Enviar).
   * @param e Evento del formulario.
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario (recargar página)
    const userInput = input.trim();
    if (!userInput) return; // No envía si el input está vacío

    // Añade el mensaje del usuario al estado
    const newUserMessage: Message = { role: 'user', content: userInput };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInput(''); // Limpia el input
    setIsLoading(true); // Muestra indicador de carga
    setError(null); // Limpia errores anteriores

    try {
      // Llama al API Route creado anteriormente
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }), // Envía el mensaje del usuario
      });

      if (!response.ok) {
        // Intenta leer el cuerpo del error si la respuesta no es OK
        const errorData = await response.json().catch(() => ({ error: "Error desconocido del servidor" }));
        throw new Error(errorData.error || `Error del servidor: ${response.status}`);
      }

      const data = await response.json();

      // Añade la respuesta del asistente al estado
      if (data.response) {
        const assistantMessage: Message = { role: 'assistant', content: data.response };
        setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      } else {
        throw new Error("No se recibió una respuesta válida del asistente.");
      }

    } catch (err: unknown) {
      console.error("Error al contactar la API:", err);
      // Muestra un mensaje de error al usuario
      const errorMessage = err instanceof Error ? err.message : "Ocurrió un error inesperado.";
      setError(errorMessage);
      // Opcional: Añadir un mensaje de error al chat
      // setMessages((prevMessages) => [...prevMessages, { role: 'assistant', content: `Error: ${errorMessage}` }]);
    } finally {
      setIsLoading(false); // Oculta el indicador de carga
    }
  };

  /**
   * Maneja los cambios en el input de texto.
   * @param e Evento de cambio del input.
   */
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // Opcional: Ajustar altura del textarea automáticamente
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Encabezado (opcional) */}
      <header className="bg-gray-800 p-4 shadow-md text-center">
        <h1 className="text-xl font-semibold">Agente Alquimia IA</h1>
      </header>

      {/* Área de Mensajes */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-lg lg:max-w-xl px-4 py-2 rounded-lg shadow ${
                msg.role === 'user'
                  ? 'bg-blue-600' // Estilo para mensajes del usuario
                  : 'bg-gray-700' // Estilo para mensajes del asistente
              }`}
            >
              {/* Podríamos usar react-markdown aquí para renderizar markdown si es necesario */}
              <p className="whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {/* Indicador de carga */}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-gray-700 px-4 py-2 rounded-lg shadow animate-pulse">
               <p>Pensando...</p> {/* O un spinner */}
             </div>
          </div>
        )}
         {/* Mensaje de error */}
         {error && (
           <div className="flex justify-center">
             <div className="bg-red-700 text-white px-4 py-2 rounded-lg shadow">
               <p>Error: {error}</p>
             </div>
           </div>
         )}
        {/* Elemento vacío para hacer scroll automático al final */}
        <div ref={messagesEndRef} />
      </div>

      {/* Área de Input */}
      <div className="p-4 bg-gray-800 border-t border-gray-700">
        <form onSubmit={handleSubmit} className="flex items-end space-x-2">
          <textarea
            value={input}
            onChange={handleInputChange}
            placeholder="Pregunta lo que quieras..."
            className="flex-1 p-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden max-h-40" // Estilo del input, similar a la imagen
            rows={1} // Empieza con una fila, se ajusta automáticamente
            onKeyDown={(e) => {
              // Envía con Enter, nueva línea con Shift+Enter
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as any); // TypeScript necesita una aserción aquí
              }
            }}
            disabled={isLoading} // Deshabilita mientras carga
          />
          <button
            type="submit"
            className={`p-2 rounded-lg text-white ${isLoading ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            disabled={isLoading}
          >
            {/* Icono de enviar (ejemplo, podrías usar un SVG) */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}