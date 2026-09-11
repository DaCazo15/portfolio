# Reglas de Firebase y Esquema de Datos (`model/firebase-rules.md`)

Este documento define la arquitectura de datos para Cloud Firestore, Firebase Authentication, Cloud Storage y las políticas de seguridad asociadas.

---

## 1. Esquema de Colecciones Firestore

### A. Configuración Global (`config/site`)
Documento único que almacena las preferencias de visibilidad del sitio:
```json
{
  "seccionesActivas": {
    "about": true,
    "experiencia": true,
    "contribuciones": true,
    "proyectos": true
  },
  "ultimaActualizacion": "Timestamp"
}
```

### B. Proyectos (`proyectos/{id}`)
Colección que alimenta la sección de proyectos, el carrusel de destacados y las gráficas:
```json
{
  "titulo": "Nombre del Proyecto",
  "descripcion": "Descripción detallada del proyecto o reto abordado",
  "tecnologias": ["Vue.js", "Firebase", "TailwindCSS"],
  "imagenes": [
    "https://firebasestorage.googleapis.com/.../proyecto_1.webp"
  ],
  "repoUrl": "https://github.com/...",
  "demoUrl": "https://...",
  "destacado": true,
  "orden": 1,
  "fechaCreacion": "Timestamp"
}
```

### C. Experiencia Laboral (`experiencia/{id}`)
Colección con los registros históricos laborales (migrados desde `Data.xlsx` / `Data_2.xlsx`):
```json
{
  "empresa": "Nombre Empresa",
  "cargo": "Rol desempeñado",
  "periodo": "2023 - Presente",
  "descripcion": "Logros y funciones clave",
  "orden": 1
}
```

### D. Contribuciones (`contribuciones/{id}`)
Colección con las contribuciones académicas/comunitarias (migradas desde `Data_3.xlsx`):
```json
{
  "titulo": "Título de la contribución o paper",
  "tipo": "Académica / Open Source",
  "descripcion": "Resumen de la contribución",
  "enlace": "https://...",
  "orden": 1
}
```

---

## 2. Autenticación (Firebase Auth)

- **Acceso Exclusivo de Administrador**: Acceso mediante credenciales de correo electrónico y contraseña (`signInWithEmailAndPassword`).
- **Sin Registro Público**: No se expone ningún formulario de registro ni auto-creación de usuarios en la interfaz.
- **Validación por UID**: La administración está estrictamente reservada para el `OWNER_UID` autorizado.

---

## 3. Reglas de Seguridad (Firestore y Storage)

### Reglas Firestore (`firestore.rules`)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Variable con el UID del propietario administrador
    function isOwner() {
      return request.auth != null && request.auth.uid == "OWNER_UID_REPLACE_ME";
    }

    // Lectura pública para visitantes del portafolio
    match /{document=**} {
      allow read: if true;
      allow write: if isOwner();
    }
  }
}
```

### Reglas Storage (`storage.rules`)
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    function isOwner() {
      return request.auth != null && request.auth.uid == "OWNER_UID_REPLACE_ME";
    }

    match /proyectos/{allPaths=**} {
      allow read: if true;
      allow write: if isOwner()
                   && request.resource.size < 5 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```

---

## 4. Convenciones de Firebase Storage

- **Rutas de Carga**: `proyectos/{proyectoId}/{timestamp}_{filename}`
- **Optimización Previa**: Las imágenes deben subirse preferentemente en formatos ligeros (`.webp`, `.png`, `.jpg`), con un peso máximo recomendado por archivo de 5 MB.
- **Sin Controles de Layout Visual**: El CMS solo permite subir o eliminar imágenes de la lista; el frontend maneja la relación de aspecto, encuadre y presentación de forma homogénea y responsive.
