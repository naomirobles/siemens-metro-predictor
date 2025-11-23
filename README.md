# Siemens Metro Predictor

Sistema de monitoreo predictivo en tiempo real para la Línea 1 del Metro de la Ciudad de México, utilizando Machine Learning para anticipar fallas y optimizar la gestión de técnicos.

## Descripción

**Siemens Metro Predictor** es una plataforma web desarrollada para el hackathon de Siemens que combina análisis predictivo basado en ML con visualización geoespacial interactiva. El sistema procesa datos de redes sociales (Twitter) para detectar patrones de fallas en estaciones del metro y permite la coordinación eficiente de técnicos de mantenimiento.

### Características Principales

**Predicción de Fallas en Tiempo Real**
- Análisis de probabilidades de incidentes por estación
- Clasificación de tipos de falla (mecánica, eléctrica, software, etc.)
- Sistema de alertas automáticas para probabilidades críticas (>70%)
- Visualización con código de colores: Verde (<40%), Amarillo (40-70%), Rojo (>70%)

**Mapa Interactivo**
- Visualización geográfica de la Línea 1 completa
- Marcadores dinámicos con información de cada estación
- Tooltips con probabilidades y tipo de falla más probable
- Integración con Leaflet y OpenStreetMap

**Gestión de Técnicos**
- Rastreo en tiempo real de 6 técnicos especializados
- Estados: Disponible, En Ruta, En Servicio
- Asignación visual de destinos mediante click en mapa
- Notificaciones automáticas vía Telegram con ubicación GPS

**Actualizaciones Automáticas**
- Polling configurable (1-60 segundos)
- Sincronización con API de predicciones ML
- Simulación de movimiento de técnicos
- Historial de última actualización

**Autenticación**
- Sistema de login seguro con Clerk
- Protección de rutas con middleware
- Páginas públicas y privadas diferenciadas

---

## Tecnologías

### Frontend
- **[Next.js 16](https://nextjs.org/)** - Framework React con App Router
- **[React 19](https://react.dev/)** - Librería de UI
- **[TypeScript 5](https://www.typescriptlang.org/)** - Tipado estático
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework de estilos utility-first
- **[Leaflet](https://leafletjs.com/)** + **[React-Leaflet](https://react-leaflet.js.org/)** - Mapas interactivos

### Backend & Servicios
- **API de Predicciones ML** - Python FastAPI (puerto 8000)
- **[Clerk](https://clerk.com/)** - Autenticación y gestión de usuarios
- **[Telegram Bot API](https://core.telegram.org/bots/api)** - Notificaciones push

### Datos
- **GeoJSON** - Geometría de estaciones y rutas
- **REST APIs** - Comunicación con servicios externos

---

## Prerequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** 20.x o superior
- **npm** / **yarn** / **pnpm** / **bun**
- **API de Predicciones ML** corriendo en `http://localhost:8000`
- Cuentas configuradas:
  - [Clerk](https://dashboard.clerk.com/) (para autenticación)
  - [Telegram Bot](https://core.telegram.org/bots#how-do-i-create-a-bot) (para notificaciones)

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/siemens-metro-predictor.git
cd siemens-metro-predictor
```

### 2. Instalar dependencias

```bash
npm install
# o
yarn install
# o
pnpm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/linea1
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/linea1

# Telegram Bot
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz

# API de Predicciones ML (opcional, por defecto localhost:8000)
NEXT_PUBLIC_ML_API_URL=http://localhost:8000
```

### 4. Iniciar servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## Configuración

### API de Predicciones ML

La aplicación espera que la API de predicciones esté disponible en `http://localhost:8000/iteracion` con el siguiente formato de respuesta:

```json
{
  "timestamp": "2025-11-23 05:03:39",
  "estados_estaciones": [
    {
      "estacion": "Observatorio",
      "hora": "05:00",
      "falla_mas_probable": "Falla de software/comunicaciones",
      "falla_mas_probable_prob": 18.395,
      "alerta": false
    }
  ],
  "alertas_criticas": [],
  "numero_tweets": 1
}
```

### Telegram Bot

1. Crea un bot con [@BotFather](https://t.me/botfather)
2. Obtén el token del bot
3. Agrega el token a `.env.local`
4. Configura los `telegramChatId` de cada técnico en `app/data/tecnicos.json`

Para obtener el Chat ID de un usuario:
```bash
curl https://api.telegram.org/bot<TU_TOKEN>/getUpdates
```

---

## Uso

### Navegación Principal

1. **Página de Inicio** (`/`) - Landing page con información del proyecto
2. **Sign In** (`/sign-in`) - Autenticación de usuarios
3. **Dashboard** (`/linea1`) - Mapa y predicciones (requiere autenticación)

### Panel de Predicciones

- **Intervalo**: Configura frecuencia de actualización (1-60 segundos)
- **Pausa/Reanudar**: Control manual de actualizaciones automáticas
- **Actualizar Ahora**: Forzar actualización inmediata

### Gestión de Técnicos

1. Activa el **Modo Asignación** en el panel de técnicos
2. Selecciona un técnico de la lista
3. Haz click en el mapa para asignar destino
4. El técnico recibirá una notificación en Telegram con la ubicación

### Sistema de Alertas

Cuando una estación supera el **70% de probabilidad de falla**:
- Se muestra una notificación roja en pantalla
- El marcador en el mapa cambia a color rojo
- La alerta permanece hasta que la probabilidad disminuya

---

## Estructura del Proyecto

```
siemens-metro-predictor/
├── app/
│   ├── api/
│   │   └── telegram/
│   │       └── send-location/          # API route para notificaciones
│   ├── components/                     # Componentes React
│   │   ├── ControlPredicciones.tsx     # Panel de control de actualización
│   │   ├── EstilosLeaflet.tsx          # Estilos para mapas
│   │   ├── Header.tsx                  # Encabezado con logo
│   │   ├── LeyendaPredicciones.tsx     # Leyenda de colores
│   │   ├── LeyendaTecnicos.tsx         # Lista de técnicos
│   │   ├── Linea1Layer.tsx             # Capa de estaciones en mapa
│   │   ├── MapaMetro.tsx               # Contenedor del mapa Leaflet
│   │   ├── MapClickHandler.tsx         # Manejo de clicks en mapa
│   │   ├── SelectorTecnicos.tsx        # Selector de técnicos
│   │   ├── TecnicosLayer.tsx           # Capa de técnicos en mapa
│   │   └── Toast.tsx                   # Notificaciones toast
│   ├── contexts/
│   │   └── ThemeContext.tsx            # Context de tema (dark/light)
│   ├── data/
│   │   ├── linea1.json                 # GeoJSON de Línea 1
│   │   └── tecnicos.json               # Datos de técnicos
│   ├── utils/
│   │   ├── mlSimulator.ts              # Cliente API de predicciones
│   │   ├── tecnicosSimulator.ts        # Simulador de movimiento
│   │   └── telegramNotifications.ts    # Cliente API de Telegram
│   ├── linea1/
│   │   └── page.tsx                    # Dashboard principal
│   ├── sign-in/
│   │   └── [[...sign-in]]/page.tsx     # Página de login
│   ├── sign-up/
│   │   └── [[...sign-up]]/page.tsx     # Página de registro
│   ├── layout.tsx                      # Layout raíz
│   ├── page.tsx                        # Home page
│   └── globals.css                     # Estilos globales
├── public/                             # Assets estáticos
├── middleware.ts                       # Middleware de autenticación
├── next.config.ts                      # Configuración Next.js
├── tailwind.config.ts                  # Configuración Tailwind
├── tsconfig.json                       # Configuración TypeScript
└── package.json
```

---

## API Reference

### Endpoint de Predicciones ML

```http
GET http://localhost:8000/iteracion
```

**Respuesta:**
```typescript
interface EstadoEstacion {
  estacion: string;
  hora: string;
  falla_mas_probable: string;
  falla_mas_probable_prob: number;
  alerta: boolean;
}

interface ResponseAPI {
  timestamp: string;
  estados_estaciones: EstadoEstacion[];
  alertas_criticas: any[];
  numero_tweets: number;
}
```

### Endpoint de Telegram

```http
POST /api/telegram/send-location
```

**Body:**
```json
{
  "chatId": "123456789",
  "tecnicoNombre": "Juan Pérez",
  "latitude": 19.432608,
  "longitude": -99.133209,
  "estacionDestino": "Observatorio"
}
```

**Respuesta:**
```json
{
  "success": true,
  "messageId": 123,
  "locationId": 124
}
```

---

## Arquitectura

### Flujo de Datos

```
┌─────────────────┐
│  Twitter API    │
│  (Scraping)     │
└────────┬────────┘
         │
         v
┌─────────────────┐       ┌──────────────────┐
│  ML Model API   │◄──────┤  Next.js App     │
│  (FastAPI)      │       │  (Frontend)      │
│  Port 8000      │──────►│  Port 3000       │
└─────────────────┘       └──────────────────┘
         │                         │
         │                         │
         v                         v
┌─────────────────┐       ┌──────────────────┐
│  Modelo ML      │       │  Telegram Bot    │
│  (Scikit-learn) │       │  (Notificaciones)│
└─────────────────┘       └──────────────────┘
```

### Componentes Clave

1. **Polling System**: `useEffect` con `setInterval` para actualizaciones periódicas
2. **State Management**: React hooks (`useState`, `useEffect`) sin Redux
3. **Map Rendering**: Leaflet con marcadores dinámicos y tooltips
4. **Real-time Updates**: Cambio de estado cada 3-60 segundos configurable
5. **Alert System**: Detección automática de umbrales críticos

---

## Paleta de Colores

El proyecto utiliza un tema cyberpunk/futurista:

| Color | Hex | Uso |
|-------|-----|-----|
| Cyan principal | `#83EECD` | Acentos, bordes, títulos |
| Azul oscuro | `#020026` | Fondos, overlays |
| Verde (OK) | `#10B981` | Probabilidad baja, estado disponible |
| Amarillo (Alerta) | `#F59E0B` | Probabilidad media |
| Rojo (Crítico) | `#EF4444` | Probabilidad alta, en servicio |
| Azul (En ruta) | `#3B82F6` | Técnicos en movimiento |

---

## Desarrollo

### Comandos Disponibles

```bash
# Desarrollo
npm run dev           # Inicia servidor de desarrollo

# Producción
npm run build         # Genera build optimizado
npm run start         # Inicia servidor de producción

# Calidad de código
npm run lint          # Ejecuta ESLint
```

### Variables de Entorno

| Variable | Descripción | Requerida |
|----------|-------------|-----------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key | Sí |
| `CLERK_SECRET_KEY` | Clerk secret key | Sí |
| `TELEGRAM_BOT_TOKEN` | Token del bot de Telegram | Sí |
| `NEXT_PUBLIC_ML_API_URL` | URL de la API ML | No (default: localhost:8000) |

### Notas Técnicas

**Multiplicador de Probabilidades**: Las probabilidades recibidas de la API se multiplican por **2.5** para efectos de demostración en el hackathon. Esto genera una distribución visual más balanceada:

```typescript
// app/utils/mlSimulator.ts
const probabilidadAumentada = Math.min((estado.falla_mas_probable_prob / 100) * 2.5, 1.0);
```

Para producción, eliminar o ajustar este multiplicador.

---

## Licencia

Proyecto desarrollado para el **Hackathon de Siemens 2025**.

---

## Equipo

Desarrollado por **[Tu Nombre/Equipo]** para Siemens México.

---

## Agradecimientos

- **Siemens** por la oportunidad del hackathon
- **Metro CDMX** por los datos de la Línea 1
- **OpenStreetMap** contributors por los mapas base
- **Clerk** por la solución de autenticación

---

## Soporte

Para preguntas o issues:
- Abre un issue en GitHub
- Contacta al equipo de desarrollo

---

**Hecho con dedicación para mejorar el transporte público de la CDMX**
