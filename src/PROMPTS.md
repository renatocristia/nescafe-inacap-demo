# PROMPTS.md — Registro de Prompts utilizados con IA

## Herramientas de IA utilizadas
- **ChatGPT (GPT-4)** — Generación de código base, validaciones y manejo de errores
- **GitHub Copilot** — Autocompletado y sugerencias de componentes
- **Gemini** — Revisión de seguridad y optimización de UX

---

## Prompt 1: Estructura inicial del proyecto

**Prompt:**
> "Actúa como experto en React. Necesito crear una SPA de gestión de pedidos para una cafetería universitaria (Café INACAP). La app debe tener: splash animada, selector de sede, home con hero y categorías, menú completo, carrito con CRUD, e historial de pedidos persistido en Local Storage. Usa Bootstrap 5, colores café pastel suave, y consumo de FakeStore API. Dame la estructura de archivos y el estado global centralizado en App."

**Mejoras aplicadas:**
- Estructura modular: separación de datos (`data/`), API (`api/`), hooks (`hooks/`), componentes (`components/`) y páginas (`pages/`)
- Estado global centralizado en `CafeApp.jsx` con `useState` y `useLocalStorage`
- Patrón de navegación por estado de pantalla con transiciones fade usando Framer Motion

---

## Prompt 2: Consumo de API con manejo de errores

**Prompt:**
> "Escribe una función para consumir https://fakestoreapi.com/products usando fetch nativo. Incluye manejo de errores robusto: validar código HTTP, validar que la respuesta sea JSON válido, validar que sea un array, y dar mensajes de error descriptivos al usuario. Usa try/catch y distingue errores de red de errores HTTP."

**Mejoras aplicadas:**
- Validación de `response.ok` con mensajes específicos por rango de código (4xx, 5xx, 404)
- Detección de errores de red (`TypeError` en fetch) con mensaje de conexión
- Validación de `response.json()` con try/catch anidado
- Validación de integridad: `Array.isArray(data)` y `data.length > 0`
- Mensajes de error orientados al usuario final

**Código resultante:** `src/api/fakestore.js`

---

## Prompt 3: Hook useLocalStorage con validación

**Prompt:**
> "Crea un hook personalizado useLocalStorage en React que persista estado en Local Storage. Incluye validación de seguridad: maneja JSON.parse con try/catch, limpia datos corruptos, valida que los datos no sean null/undefined, y maneja errores de escritura. Sigue buenas prácticas de React con useState y useEffect."

**Mejoras aplicadas:**
- `JSON.parse` envuelto en try/catch para evitar crashes con datos corruptos
- Limpieza automática de claves corruptas con `localStorage.removeItem`
- Validación de `null`/`undefined` después del parseo
- Manejo de errores en escritura (cuota excedida, modo privado)
- `useCallback` en el setter para evitar re-renders innecesarios
- Inicialización lazy con función en `useState` para leer solo una vez

**Código resultante:** `src/hooks/useLocalStorage.js`

---

## Prompt 4: Validación y sanitización de inputs

**Prompt:**
> "¿Qué validaciones de seguridad debo aplicar en un formulario de carrito de compras en React? Necesito validar cantidades de productos, prevenir valores negativos, limitar a un máximo, y sanitizar inputs antes de guardar en Local Storage. Dame una función de sanitización."

**Mejoras aplicadas:**
- Función `sanitizeQuantity()` que valida rango (1-99), previene NaN y valores negativos
- Validación de integridad de productos antes de agregar al carrito (id, title, price)
- Validación de items del carrito antes de confirmar pedido
- `maxLength` en inputs de búsqueda para prevenir overflow
- Validación de sede seleccionada antes de confirmar pedido

**Código resultante:** Funciones de validación en `CafeApp.jsx`

---

## Prompt 5: Componente ProductDetailSheet con Vaul

**Prompt:**
> "Crea un bottom sheet en React usando la librería Vaul que muestre el detalle de un producto de cafetería. Debe tener: imagen grande, nombre, descripción, rating, selector de cantidad con botones + y -, y botón 'Agregar al carrito' que calcule el total. Incluye animaciones suaves y reseteo de estado al abrir."

**Mejoras aplicadas:**
- Uso de `<Drawer>` de Vaul con `open` y `onOpenChange` controlados
- `useEffect` para resetear cantidad al cambiar de producto
- Botones de cantidad con `disabled` en límites (mín 1, máx 99)
- Cálculo de total en tiempo real
- Animación `whileTap` en botón de agregar (micro-interacción)
- Categoría mostrada como badge sobre la imagen

**Código resultante:** `src/components/ProductDetailSheet.jsx`

---

## Prompt 6: Diseño UX/UI con tema café pastel

**Prompt:**
> "Dame el CSS para una app de cafetería con estética café pastel suave y universitaria. Fondos crema (#FAF6F1), acentos en café cálido (#8B5E3C) y terracota (#C8856A), verde menta (#A8C5A0) para badges de estado. Cards con bordes redondeados 16px, sombras suaves, navegación inferior con 4 tabs. Mobile-first, max-width 480px centrado en desktop. Inspirado en Uber Eats pero cálido en lugar de dark."

**Mejoras aplicadas:**
- Sistema de variables CSS (`--cafe-*`) para consistencia de colores
- Overrides de variables de Bootstrap 5 (`--bs-primary`, `--bs-body-bg`, etc.)
- Sombras en capas (`--cafe-shadow`, `--cafe-shadow-md`, `--cafe-shadow-lg`)
- Scroll horizontal oculto para carruseles (categorías, destacados)
- Filtros de categoría sticky en el menú
- Estados de loading, error y vacío con feedback visual
- Responsive: grid de 2 columnas en móvil, 1 columna en pantallas <380px

**Código resultante:** Estilos en `src/index.css`

---

## Prompt 7: Mapeo de datos API al dominio de cafetería

**Prompt:**
> "Tengo productos de FakeStore API con categorías como 'electronics', 'jewelery', 'men's clothing', 'women's clothing'. Necesito mapearlos a un menú de cafetería con categorías: Bebidas Calientes, Pasteles, Snacks, Bebidas Frías. Conserva el id, price y rating de la API, pero asigna nombres de productos de cafetería e imágenes de Unsplash coherentes con cada categoría."

**Mejoras aplicadas:**
- Mapeo de categorías FakeStore → categorías cafetería
- Arrays de nombres de productos de cafetería por categoría (8 productos c/u)
- Imágenes de Unsplash temáticas por categoría (café, pasteles, snacks, bebidas frías)
- Descripciones de cafetería adaptadas al dominio
- Conservación de datos originales de la API (id, price, rating, ratingCount)
- Función `mapToCafeProduct()` pura y determinística

**Código resultante:** `src/data/cafeData.js`

---

## Prompt 8: CRUD de pedidos en Local Storage

**Prompt:**
> "Implementa un CRUD completo de pedidos en React con Local Storage. Los pedidos tienen: id, sede, items (array), total, status (en_preparacion, listo, entregado), y fecha. Necesito: crear (confirmar pedido desde carrito), leer (historial), actualizar (cambiar estado), y eliminar. Incluye validaciones de seguridad antes de crear."

**Mejoras aplicadas:**
- **Create**: `confirmOrder()` valida carrito no vacío, sede seleccionada e integridad de items
- **Read**: `orders` persistido en Local Storage, renderizado en historial
- **Update**: `updateOrderStatus()` cambia estado con flujo en_preparacion → listo → entregado
- **Delete**: `deleteOrder()` elimina pedido del historial
- Generación de ID único con timestamp (`ORD-${Date.now()}`)
- Feedback visual con toast en cada operación CRUD
- Validación de integridad de datos antes de persistir

**Código resultante:** Funciones CRUD en `CafeApp.jsx`, UI en `src/pages/Orders.jsx`

---

## Resumen de mejoras por IA

| Área | Antes (sin IA) | Después (con IA) |
|------|---------------|-----------------|
| **Manejo de errores** | try/catch básico | Errores tipificados, mensajes descriptivos, validación de formato |
| **Seguridad** | Sin validación | Sanitización de inputs, validación de integridad, límites de cantidad |
| **UX** | Sin feedback | Toasts, loading states, error states, empty states, animaciones |
| **Local Storage** | JSON.parse directo | Hook con validación, limpieza de corruptos, manejo de errores |
| **API** | fetch simple | Validación HTTP, JSON, formato, errores de red vs servidor |
| **Código** | Monolítico | Modular: data, api, hooks, components, pages |