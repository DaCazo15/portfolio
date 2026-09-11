# Reglas de Diseño y Estilos (`model/design-rules.md`)

Este documento establece los estándares de diseño visual, tokens, comportamiento responsive y uso de CSS/Tailwind en todo el proyecto. Debe ser consultado y respetado en todas las fases de desarrollo.

---

## 1. Filosofía y Enfoque Mobile-First

- **Estrategia Responsive**: Diseñar y maquetar siempre comenzando desde la vista móvil y expandiendo progresivamente hacia pantallas de mayor resolución.
- **Breakpoints Sagrados**:
  - **Móvil / Tablet**: `791px` (`@media (max-width: 791px)`) — Define la vista compacta para móviles, reordenamiento de layouts verticales y simplificación de navegación.
  - **Escritorio / Laptop**: `1231px` (`@media (max-width: 1231px)`) — Punto de inflexión para distribución de columnas, espaciados y disposición de paneles.
  - **Prohibición**: No alterar, eliminar ni añadir breakpoints arbitrarios que entren en conflicto con estos dos límites ya establecidos en `src/style.css`.

---

## 2. Paleta de Colores y Tokens CSS

Los estilos base conviven en `src/style.css` y se apoyan en variables CSS nativas:

| Token CSS | Valor | Uso Principal |
| :--- | :--- | :--- |
| `--fondo-negro` | `rgb(0, 11, 16)` | Fondo general del viewport (`html`, `body`). |
| `--gris-oscuro` | `#242424` | Fondos de tarjetas, paneles y contenedores secundarios. |
| `--gris-oscuroRGB`| `36, 36, 36` | Utilizado para opacidades y efectos glassmorphism con `rgba()`. |
| `--gris-claro` | `#e7e7e7` | Color principal de texto y contraste legible sobre fondos oscuros. |
| `--verde-cian` | `#008686` | Acentos visuales, títulos secundarios (`h3`), botones principales y enlaces activos. |
| `--verde-cian-oscuro` | `#015f5f` | Estados hover, bordes de acento y gradientes sutiles. |

---

## 3. Tipografía

- **Títulos (`h1`, `h2`, `h3`, encabezados)**: `Rubik` (cargado vía `@fontsource/rubik`), definido como `var(--font-titulo)`.
- **Cuerpo y lectura**: `Outfit` y `Inter` (cargados vía `@fontsource/outfit` e `@fontsource/inter`).
- **Jerarquía y legibilidad**: Mantener contraste accesible, uso de `text-wrap: balance` en títulos y evitar tamaños de fuente fijos no escalables.

---

## 4. Convivencia con Tailwind CSS (v4)

- **Uso estricto como utilidades**: Tailwind debe usarse para agilizar espaciados rápidos (`p-*`, `m-*`, `gap-*`), flexbox/grid (`flex`, `grid`, `items-center`), y estados dinámicos puntuales.
- **Prohibición de reescritura masiva**: No reescribir ni eliminar los estilos existentes de `src/style.css`.
- **Evitar `@apply` indiscriminado**: Mantener las clases de componentes claras y legibles; preferir clases CSS semánticas consolidadas o utilidades atómicas.
- **Identidad visual no destructiva**: Todo nuevo componente o panel administrativo debe respetar la estética oscura (`--fondo-negro`, `--gris-oscuro`, `--verde-cian`) para conservar una experiencia visual coherente y premium.
