# ☕ Café INACAP — App de Gestión de Pedidos

SPA de pedidos para la cafetería de INACAP, inspirada en Uber Eats pero adaptada al contexto universitario: las sedes están predefinidas (no hay búsqueda de ubicación). Los estudiantes eligen su sede, exploran el menú, hacen pedidos y los gestionan con CRUD + Local Storage.

## 📋 Tabla de Contenidos
- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [API](#-api-consumida)
- [Estructura](#-estructura-del-proyecto)
- [CRUD + Local Storage](#-crud--local-storage)
- [Seguridad](#-seguridad-y-validaciones)
- [Referencias IA](#-referencias-de-ia)

---

## ✨ Características

- **Splash animada** con logo y transición fade suave
- **Selector de sede** INACAP (8 sedes predefinidas, persistido en Local Storage)
- **Home** con hero, buscador, carrusel de categorías y productos destacados
- **Menú completo** con filtros por categoría sticky y buscador
- **Detalle de producto** en Bottom Sheet (Vaul) con selector de cantidad
- **Carrito** con cantidades editables, subtotal y confirmación de pedido
- **Historial de pedidos** con estados (En preparación → Listo → Entregado) y CRUD completo
- **Consumo de FakeStore API** con fetch, loading states y manejo de errores
- **Diseño café pastel** suave, mobile-first, responsive

## 🛠 Tecnologías

| Tecnología | Uso |
|-----------|-----|
| React 18 | Framework SPA, componentes, hooks, estado |
| Bootstrap 5 | Sistema de grilla, componentes base, utilidades CSS |
| Vite | Bundler y servidor de desarrollo |
| Framer Motion | Animaciones (fade, slide, micro-interacciones) |
| Vaul | Bottom Sheet del detalle de producto |
| Lucide React | Iconografía |
| FakeStore API | API REST de productos (consumo con fetch) |
| Local Storage | Persistencia de sede, carrito e historial de pedidos |

## 🚀 Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Abrir en el navegador
# http://localhost:5173
```

### Comandos disponibles
```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Preview del build
```

## 📱 Uso

1. **Splash** → Pantalla de bienvenida animada (2.4s)
2. **Selector de sede** → Elige tu sede INACAP (se guarda en Local Storage)
3. **Home** → Explora categorías y productos destacados
4. **Menú** → Filtra por categoría, busca productos, toca una card para ver detalles
5. **Detalle** → Bottom Sheet con imagen, descripción y selector de cantidad
6. **Carrito** → Ajusta cantidades, elimina productos, confirma pedido
7. **Mis Pedidos** → Visualiza historial, cambia estados, elimina pedidos

## 🌐 API Consumida

**FakeStore API** — `https://fakestoreapi.com/products`

Endpoint REST público que retorna un array de productos con: `id`, `title`, `price`, `description`, `category`, `image`, `rating`.

### Mapeo de datos
Los productos de FakeStore se mapean al dominio de cafetería:

| Categoría FakeStore | Categoría Café INACAP |
|---------------------|----------------------|
| electronics | ☕ Bebidas Calientes |
| jewelery | 🍰 Pasteles |
| men's clothing | 🥪 Snacks |
| women's clothing | 🥤 Bebidas Frías |

Se conservan `id`, `price` y `rating` de la API. Se adaptan `título`, `imagen` y `descripción` al contexto de cafetería para una experiencia de usuario coherente.

### Manejo de errores
- ✅ Validación de código HTTP (4xx, 5xx, 404)
- ✅ Validación de respuesta JSON
- ✅ Validación de formato (array no vacío)
- ✅ Detección de errores de red
- ✅ Mensajes descriptivos al usuario
- ✅ Botón de reintentar

## 📁 Estructura del Proyecto

```
src/
├── App.jsx                 # Wrapper de autenticación + router
├── CafeApp.jsx             # Estado global centralizado de la app
├── main.jsx                # Entry point (importa Bootstrap)
├── index.css               # Tema café pastel + estilos de componentes
├── api/
│   └── fakestore.js        # Cliente de API con manejo de errores
├── hooks/
│   └── useLocalStorage.js  # Hook de persistencia con validación
├── data/
│   ├── sedes.js            # Sedes predefinidas de INACAP
│   └── cafeData.js         # Categorías + mapeo de productos
├── components/
│   ├── Splash.jsx          # Pantalla de bienvenida animada
│   ├── SedeSelector.jsx    # Selector de sede
│   ├── BottomNav.jsx       # Navegación inferior (4 tabs)
│   ├── ProductCard.jsx     # Card de producto
│   ├── ProductDetailSheet.jsx # Bottom Sheet (Vaul)
│   ├── CategoryPill.jsx    # Pill de filtro de categoría
│   └── FeedbackToast.jsx   # Toast de notificaciones
└── pages/
    ├── Home.jsx            # Hero + categorías + destacados
    ├── Menu.jsx            # Menú completo con filtros
    ├── Cart.jsx            # Carrito con CRUD
    └── Orders.jsx          # Historial con CRUD
```

## 🔄 CRUD + Local Storage

El CRUD se aplica sobre los **pedidos** persistidos en Local Storage:

| Operación | Función | Descripción |
|-----------|---------|-------------|
| **Create** | `confirmOrder()` | Crea pedido desde carrito, valida integridad, guarda en LS |
| **Read** | `orders` (useLocalStorage) | Lee historial desde LS al iniciar |
| **Update** | `updateOrderStatus()` | Cambia estado: en_preparacion → listo → entregado |
| **Delete** | `deleteOrder()` | Elimina pedido del historial |

### Claves de Local Storage
- `cafe_inacap_sede` — Sede seleccionada
- `cafe_inacap_cart` — Carrito actual
- `cafe_inacap_orders` — Historial de pedidos

## 🔒 Seguridad y Validaciones

- **Sanitización de cantidades**: rango 1-99, previene NaN y negativos
- **Validación de integridad de productos**: verifica id, title, price antes de agregar
- **Validación de items del carrito**: filtra items inválidos antes de confirmar
- **Validación de sede**: verifica sede seleccionada antes de confirmar pedido
- **Local Storage seguro**: JSON.parse con try/catch, limpieza de datos corruptos
- **Inputs limitados**: `maxLength` en campos de búsqueda
- **Manejo de errores de API**: try/catch con mensajes descriptivos al usuario

## 🤖 Referencias de IA

Las herramientas de IA utilizadas (ChatGPT, GitHub Copilot, Gemini) asistieron en:

- **Estructura del proyecto** — Separación modular de responsabilidades
- **Manejo de errores** — Validación robusta de API y Local Storage
- **Seguridad** — Sanitización de inputs y validación de integridad
- **UX/UI** — Diseño café pastel, animaciones, estados de feedback
- **CRUD** — Implementación completa con validaciones
- **Mapeo de datos** — Adaptación de API al dominio de cafetería

Ver `PROMPTS.md` para el registro detallado de prompts y mejoras aplicadas.

## 👥 Equipo

Proyecto desarrollado para la Evaluación Sumativa 3 — Desarrollo de SPA con React + API + CRUD + Local Storage apoyado por IA.

---

**Café INACAP** — Tu café de campus ☕