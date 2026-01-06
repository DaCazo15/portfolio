<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.postimg.cc/FKL1JvqG/isotipo-page.png" alt="Logo del proyecto"></a>
</p>

<h3 align="center">Portafolio Personal</h3>

---

<p align="center"> Un portafolio personal dinámico construido con Vue.js y Vite. Muestra mis proyectos, experiencia laboral y habilidades de una manera moderna e interactiva.
    <br> 
</p>

## 📝 Tabla de Contenidos

- [Acerca de](#acerca_de)
- [Características](#caracteristicas)
- [Primeros Pasos](#primeros_pasos)
- [Uso](#uso)
- [Construido Con](#construido_con)
- [Autores](#autores)

## 🧐 Acerca de <a name = "acerca_de"></a>

Este proyecto es mi portafolio personal, diseñado para ser un escaparate de mi trayectoria profesional y mis habilidades técnicas. Está desarrollado como una Single Page Application (SPA) utilizando Vue.js, lo que permite una navegación fluida y rápida sin recargar la página.

Una de las características clave de este portafolio es que todo el contenido (experiencia laboral, proyectos, etc.) se gestiona a través de un archivo `Data.xlsx`. Esto permite actualizar la información de manera sencilla y rápida sin necesidad de modificar el código fuente, simplemente editando una hoja de cálculo.

## ✨ Características <a name = "caracteristicas"></a>

- **Single Page Application (SPA):** Experiencia de usuario fluida y rápida.
- **Contenido Dinámico:** La información se carga desde un archivo Excel, facilitando las actualizaciones.
- **Diseño Responsivo:** Adaptable a diferentes tamaños de pantalla, desde móviles a ordenadores de escritorio.
- **Componentes Interactivos:** Secciones para "Sobre mí", "Experiencia" y "Tecnologías".
- **Descarga de Archivos:** Funcionalidad para descargar archivos, como mi CV.

## 🏁 Primeros Pasos <a name = "primeros_pasos"></a>

Estas instrucciones te permitirán obtener una copia del proyecto y ejecutarlo en tu máquina local para desarrollo y pruebas.

### Prerrequisitos

Necesitas tener Node.js y npm instalados en tu máquina.

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [npm](https://www.npmjs.com/) (viene con Node.js)

### Instalación

1.  Clona el repositorio:
    ```
    git clone https://github.com/DaCazo15/portfolio.git
    ```

2.  Navega al directorio del proyecto:
    ```
    cd portfolio
    ```

3.  Instala las dependencias:
    ```
    npm install
    ```

4.  Inicia el servidor de desarrollo:
    ```
    npm run dev
    ```

La aplicación estará disponible en `http://localhost:5173` (o el puerto que Vite especifique).

## 🎈 Uso <a name="uso"></a>

Una vez que el servidor de desarrollo esté en funcionamiento, abre tu navegador y navega a la URL proporcionada. Podrás explorar las diferentes secciones del portafolio. Para actualizar el contenido, modifica el archivo `public/data/Data.xlsx`.

## 🚀 Despliegue a Producción

Para compilar la aplicación para producción, ejecuta el siguiente comando:

```bash
npm run build
```

Esto creará una carpeta `dist` con los archivos estáticos de la aplicación.

Para previsualizar la compilación de producción localmente, puedes usar el comando `preview`:

```bash
npm run preview
```

## ⛏️ Construido Con <a name = "construido_con"></a>

- [Vue.js](https://vuejs.org/) - Framework Frontend
- [Vite](https://vitejs.dev/) - Herramienta de Construcción
- [xlsx](https://github.com/SheetJS/sheetjs) - Lectura y escritura de archivos Excel

## ✍️ Autores <a name = "autores"></a>

-   [@DaCazo15](https://github.com/DaCazo15) - Idea y Trabajo Inicial