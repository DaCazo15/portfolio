# Reglas de Código y Convenciones (`model/code-rules.md`)

Este documento establece las directrices de arquitectura de componentes Vue 3, nomenclatura, buenas prácticas de desarrollo, manejo de errores y convenciones de control de versiones.

---

## 1. Vue 3 & Composition API

- **Sintaxis**: Uso exclusivo de `<script setup>` con Composition API.
- **Tipado & Reactividad**:
  - Uso claro de `ref` para tipos primitivos o reasignaciones completas, y `reactive`/`computed` para datos derivados.
  - Desestructuración reactiva segura con `toRefs` o `toValue` según corresponda.
- **Modularización (Regla `vue-component-modularizer`)**:
  - Evitar componentes monolíticos (> 120-150 líneas en `<template>`).
  - Descomponer bloques delimitados por comentarios o responsabilidades distintas en subcomponentes ubicados en subcarpetas temáticas (ej: `src/components/admin/`, `src/components/carrusel/`, `src/components/charts/`).
  - El componente padre actúa como orquestador de estado y layout; los componentes hijos manejan renderizado y eventos locales.
  - Usar `defineProps` y `defineEmits` explícitos.

---

## 2. Nomenclatura y Estructura de Archivos

- **Componentes**: PascalCase (ej: `ProyectoCard.vue`, `AdminDashboard.vue`, `CarruselDestacados.vue`).
- **Composables**: camelCase con prefijo `use` (ej: `useFirestoreCollection.js`, `useAnchoViewport.js`, `useAuthAdmin.js`).
- **Helpers y Utilidades**: camelCase descriptivo (ej: `formatearFecha.js`, `downloadFile.js`).
- **Idioma del Código**:
  - **Comentarios y documentación**: En **español** claro y conciso.
  - **Identificadores y variables**: Nombres descriptivos y consistentes con el dominio del proyecto.

---

## 3. Manejo de Errores y Robustez

- **Prohibido silenciar `catch`**: Todo bloque `try / catch` debe gestionar el error, mostrar feedback visual claro al usuario (banners, toasts o textos de alerta en la UI) y registrar detalles informativos en la consola.
- **Estados de Carga**: Toda llamada asíncrona (Firebase Firestore, Storage, Auth) debe contar con indicadores visuales de carga (`cargando = ref(false)`) y fallbacks visuales si no hay datos.

---

## 4. Convención de Commits (Conventional Commits en Español)

Todos los mensajes de confirmación deben seguir el formato estandarizado en español:

- `feat: <descripción>` — Nueva característica o funcionalidad.
- `fix: <descripción>` — Corrección de errores o bugs.
- `refactor: <descripción>` — Reestructuración o modularización de código sin cambio funcional.
- `style: <descripción>` — Cambios visuales, formato o ajustes de CSS/Tailwind.
- `docs: <descripción>` — Actualización o creación de documentación y reglas (`model/`).
- `chore: <descripción>` — Configuración de paquetes, dependencias o tareas de build.
