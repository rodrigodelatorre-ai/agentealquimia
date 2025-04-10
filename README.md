# Agente Alquimia IA

![Licencia](https://img.shields.io/badge/licencia-MIT-blue.svg)
![Versión](https://img.shields.io/badge/versión-1.0.0-green.svg)

Agente de IA conversacional con interfaz web estilo ChatGPT, construido con tecnologías modernas de desarrollo web y potenciado por la API de OpenAI.

![Vista previa de la aplicación](https://via.placeholder.com/800x400?text=Vista+Previa+Agente+Alquimia)

## 🚀 Características

- **Interfaz Moderna y Minimalista**: Diseño oscuro inspirado en ChatGPT, con enfoque en la experiencia de usuario.
- **Integración con OpenAI**: Utiliza modelos avanzados de IA a través de la API de OpenAI.
- **Manejo en Tiempo Real**: Respuestas fluidas con indicador de "pensando..." durante la generación.
- **Diseño Responsivo**: Adaptable a cualquier tamaño de pantalla (móvil, tablet, escritorio).
- **Seguridad Integrada**: Manejo seguro de la API key a través de variables de entorno.
- **Arquitectura Moderna**: Construido con Next.js 14 App Router y Server Components.

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes (serverless)
- **IA**: OpenAI API (modelo GPT-3.5 Turbo, configurable a GPT-4)
- **Herramientas de Desarrollo**: ESLint, Prettier

## 📋 Requisitos Previos

- Node.js 18.0.0 o superior
- npm o yarn
- Cuenta en OpenAI y API key

## 🔧 Instalación y Configuración

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/rodrigodelatorre-ai/agentealquimia.git
   cd agentealquimia
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configurar variables de entorno**
   - Crea un archivo `.env.local` en la raíz del proyecto
   - Añade tu API key de OpenAI:
     ```
     OPENAI_API_KEY=tu_api_key_aquí
     ```

4. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

5. **Accede a la aplicación**
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🔍 Estructura del Proyecto

```
agentealquimia/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── route.ts    # API Route para la comunicación con OpenAI
│   │   ├── page.tsx            # Página principal con la interfaz de chat
│   │   └── layout.tsx          # Layout principal de la aplicación
│   ├── components/            # Componentes reutilizables (para expansión futura)
│   ├── lib/                   # Utilidades y servicios (para expansión futura)
│   └── styles/                # Estilos globales adicionales
├── .env.local                 # Variables de entorno (no incluido en el repositorio)
├── .gitignore                 # Archivos y carpetas ignorados por git
├── package.json               # Dependencias y scripts
├── tsconfig.json              # Configuración de TypeScript
└── README.md                  # Documentación del proyecto
```

## 🧪 Posibles Mejoras Futuras

- **Streaming de Respuestas**: Implementar generación de texto en tiempo real (token por token).
- **Persistencia del Historial**: Guardar las conversaciones en localStorage o en una base de datos.
- **Múltiples Modelos**: Permitir al usuario elegir entre diferentes modelos de OpenAI.
- **Personalización**: Temas claros/oscuros y opciones de configuración.
- **Exportación de Chats**: Funcionalidad para exportar las conversaciones en diferentes formatos.
- **Autenticación de Usuarios**: Sistema de login para personalizar la experiencia.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir qué te gustaría cambiar o añadir.

---

Desarrollado con ❤️ por [Rodrigo De La Torre](https://github.com/rodrigodelatorre-ai)