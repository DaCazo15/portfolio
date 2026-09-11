<script setup>
import { ref } from 'vue';

const dominios = ref([
  {
    nombre: 'Frontend & UI/UX Architecture',
    icono: 'bi-window-fullscreen',
    nivel: 92,
    descripcion: 'Vue 3, TailwindCSS, JavaScript ES6+, Vite, SPA, Micro-interacciones & Accesibilidad',
    destacados: ['Vue 3 (Composition API)', 'Tailwind CSS', 'GSAP & Anime.js', 'Vite', 'Responsive & Mobile-First']
  },
  {
    nombre: 'Backend, Scripts & APIs',
    icono: 'bi-server',
    nivel: 88,
    descripcion: 'Python (Flet, CustomTkinter), Node.js, REST APIs, C++, Automatización de procesos',
    destacados: ['Python Desktop & CLI', 'C++ Core Systems', 'Node.js', 'Algoritmos & Estructuras', 'RESTful Services']
  },
  {
    nombre: 'Cloud, Database & Serverless',
    icono: 'bi-database-fill-gear',
    nivel: 85,
    descripcion: 'Firebase (Firestore, Auth, Storage, Security Rules), Netlify, GitHub Pages, Render, Vercel',
    destacados: ['Firebase Ecosystem', 'Firestore NoSQL', 'CI/CD Netlify', 'Git & GitHub Workflows', 'OAuth & Security Rules']
  },
  {
    nombre: 'IoT, Hardware & Inteligencia Artificial',
    icono: 'bi-cpu-fill',
    nivel: 82,
    descripcion: 'ESP32, Arduino, Robótica Educativa, Visión por Computador (OpenCV) y Redes Neuronales (Keras / TensorFlow)',
    destacados: ['ESP32 & Sensores IoT', 'Arduino C++', 'Robótica Educativa', 'Keras & TensorFlow AI', 'OpenCV Computer Vision']
  }
]);
</script>

<template>
  <div class="p-6 md:p-8 rounded-2xl bg-[rgba(var(--gris-oscuroRGB),0.65)] border border-gray-800 hover:border-[var(--verde-cian)]/40 backdrop-blur-md shadow-xl transition-all duration-300">
    <div class="flex items-center justify-between mb-6 pb-3 border-b border-gray-800/80">
      <div>
        <h3 class="text-base md:text-lg font-bold font-['Outfit'] text-[var(--gris-claro)] flex items-center gap-2 m-0 text-left">
          <i class="bi bi-diagram-3-fill text-[var(--verde-cian)]"></i>
          Especialización & Dominios de Ingeniería
        </h3>
        <p class="text-xs text-gray-400 mt-1 text-left">Nivel de madurez y tecnologías clave por ámbito de desarrollo</p>
      </div>
      <span class="text-xs font-mono text-[var(--verde-cian)] px-3 py-1 rounded-full bg-[var(--fondo-negro)] border border-[var(--verde-cian)]/30">
        4 Áreas Core
      </span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div 
        v-for="(dom, idx) in dominios" 
        :key="idx"
        class="p-4 rounded-xl bg-[var(--fondo-negro)]/70 border border-gray-800/80 hover:border-gray-700 transition flex flex-col justify-between"
      >
        <div>
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2.5">
              <i :class="['bi', dom.icono, 'text-[var(--verde-cian)] text-lg']"></i>
              <h4 class="text-sm font-bold font-['Outfit'] text-white m-0 text-left">
                {{ dom.nombre }}
              </h4>
            </div>
            <span class="text-xs font-bold font-mono text-[var(--verde-cian)]">
              {{ dom.nivel }}%
            </span>
          </div>

          <!-- Barra de Progreso -->
          <div class="w-full bg-gray-900 rounded-full h-2 mb-3 overflow-hidden border border-gray-800">
            <div 
              class="h-2 rounded-full bg-gradient-to-r from-[var(--verde-cian-oscuro)] to-[var(--verde-cian)] transition-all duration-700" 
              :style="{ width: `${dom.nivel}%` }"
            ></div>
          </div>

          <p class="text-xs text-gray-400 leading-relaxed m-0 text-left mb-3">
            {{ dom.descripcion }}
          </p>
        </div>

        <!-- Pills de Tecnologías Destacadas -->
        <div class="flex flex-wrap gap-1.5 pt-2 border-t border-gray-800/60">
          <span 
            v-for="tag in dom.destacados" 
            :key="tag"
            class="text-[10px] px-2 py-0.5 rounded-md bg-gray-900/80 text-gray-300 border border-gray-800"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
