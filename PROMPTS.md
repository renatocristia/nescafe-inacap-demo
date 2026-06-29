# 🤖 PROMPTS.md — Registro de uso de IA

**Herramienta utilizada:** Claude (Anthropic), usado como asistente de
desarrollo dentro del chat de Claude.ai/Claude Code. Cumple el mismo rol que
ChatGPT/Copilot/Gemini sugeridos en la pauta: generación de código, sugerencias
de seguridad y validaciones, y mejora de UX. *(Si tu docente exige
específicamente ChatGPT/Copilot/Gemini, confírmalo antes de entregar; el
registro de abajo es el historial real de la conversación con la IA usada).*

Este archivo documenta, en orden cronológico, los prompts reales que se usaron
para construir esta aplicación, qué generó la IA en cada paso y qué mejoras
concretas aportó al código.

---

## Iteración 1 — Punto de partida

**Prompt utilizado:**
> Se adjuntó la pauta de la Sumativa 3 (PDF/imagen con los criterios 3.1.1 a
> 3.1.4) y se pidió ayuda para construir la SPA solicitada.

**Qué hizo la IA:** Identificó los cuatro criterios evaluados, detectó que
faltaba definir la problemática concreta (tareas / pedidos / inventario) y la
API a consumir, y devolvió un selector de opciones en vez de asumir una
elección arbitraria.

**Mejora aportada:** Evitó construir una app genérica que no calzara con lo
que el equipo realmente necesitaba — ahorra retrabajo.

---

## Iteración 2 — Definición del dominio

**Prompts utilizados:**
> "Pedidos y Despachos" (selección de tipo de app)
> "JSONPlaceholder (posts/users genérico)" (selección de API)

**Qué hizo la IA:** Quedó fijado el dominio (gestión de pedidos/despachos) y
la fuente de datos externa (JSONPlaceholder).

---

## Iteración 3 — Contexto real del negocio

**Prompt utilizado:**
> "quiero crear una aplicacion de despacho de cafe para inacap en el cual
> podremos comprar el cafe ahi y poder ir a buscarlo o que puedan ir a dejarlo
> a tu sala correspondiente"

**Qué hizo la IA:** Tradujo la idea en un modelo de datos concreto:
- Entidad `Pedido` con campos `modalidad` (`retiro` / `despacho`) y `sala`
  (obligatoria solo si la modalidad es despacho).
- Catálogo de productos de café con tamaños y precios.
- Reutilizó JSONPlaceholder `/users` no como entidad CRUD, sino como fuente
  para **autocompletar datos del cliente** (decisión de IA para que la API
  externa tuviera un rol con sentido dentro del flujo de pedidos, en vez de
  ser un dato decorativo).

**Mejora aportada (UX):** Validación condicional — el campo "sala" solo
aparece y se exige cuando el usuario elige "Despacho", evitando pedir datos
irrelevantes según el contexto.

---

## Iteración 4 — Branding específico

**Prompt utilizado:**
> "precisamente nescafe e inacap tenlo encuenta"

**Qué hizo la IA:**
- Ajustó el catálogo a productos tipo Nescafé (Clásico, Gold, Descafeinado,
  Cappuccino, Helado) y las sedes a "INACAP [sede]".
- Sugirió y aplicó un **disclaimer** en el footer ("Proyecto académico... no
  representa un servicio oficial de Nescafé®") como buena práctica para dejar
  claro que es un ejercicio educativo y no un producto comercial real.
- Mantuvo la paleta magenta/amarillo exigida explícitamente por la pauta de
  cotejo, combinándola con tonos café para que el diseño se sintiera coherente
  con el rubro (café) sin contradecir el requisito de colores.

**Mejora aportada (seguridad/criterio):** El disclaimer de marcas y la
ausencia de logos oficiales reproducidos son una recomendación directa de la
IA para un uso responsable de nombres de marcas de terceros en un proyecto
académico.

---

## Sugerencias transversales de la IA (aplicadas en todo el código)

Estas recomendaciones no vinieron de un solo prompt, sino que la IA las aplicó
de forma proactiva mientras generaba el código, como parte de "buenas
prácticas":

1. **Sanitización de inputs** (`utils/validaciones.js → sanitizarTexto`):
   se eliminan los caracteres `<` y `>` y se recorta la longitud de cualquier
   texto libre antes de guardarlo, para reducir el riesgo de inyección de
   HTML/markup en los datos persistidos.
2. **Validación exhaustiva antes de guardar:** nombre y correo con regex,
   cantidad limitada a un rango entero razonable (1–20), sala obligatoria
   condicional, comentario con tope de caracteres.
3. **Manejo de errores en `fetch`:** se verifica `response.ok`, se usa
   `try/catch/finally` y se muestran estados de carga (`Cargando…`) y de error
   amigables en vez de dejar la pantalla en blanco o lanzar una excepción no
   controlada.
4. **Manejo de errores en Local Storage:** lectura y escritura envueltas en
   `try/catch`, con `JSON.parse` protegido para que un dato corrupto no rompa
   toda la aplicación al recargar.
5. **Confirmación antes de eliminar:** se agregó `window.confirm` antes de
   borrar un pedido, para evitar pérdidas de datos accidentales.
6. **Feedback visual de UX:** alertas temporales (éxito/error) tras crear,
   editar o eliminar un pedido, en vez de cambios silenciosos de estado.

---

## Reflexión del equipo

> *(Sección para completar por el equipo antes de entregar)*
>
> Indiquen aquí, con sus palabras, qué partes del código entienden a
> cabalidad, qué les explicó la IA que no sabían antes, y si modificaron algo
> de lo generado. Recuerden que la pauta exige que **cada integrante** pueda
> explicar el código entregado, no solo copiarlo.
