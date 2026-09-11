<script setup>
import { ref, computed } from 'vue';
import { logoTecno } from '../../helpers/informacion';
import { abrirPage } from '../../helpers/downloadFile';
import { animate } from 'animejs';

const filtroActivo = ref('todos');
const busqueda = ref('');

const categorias = [
  { id: 'todos', label: 'Todos', icono: 'bi-grid-fill' },
  { id: 'frontend', label: 'Frontend & UI', icono: 'bi-window-sidebar' },
  { id: 'backend', label: 'Backend & Core', icono: 'bi-cpu' },
  { id: 'cloud', label: 'Cloud & Bases de Datos', icono: 'bi-cloud-fill' },
  { id: 'iot', label: 'IoT & Robótica', icono: 'bi-robot' },
  { id: 'tools', label: 'Diseño & Herramientas', icono: 'bi-tools' }
];

// Mapeo enriquecido con categorías
const techCatalog = [
  { id: 'vue', nombre: 'Vue.js 3', categoria: 'frontend', logo: 'https://i.postimg.cc/XqhhDJdk/Vue_js_Logo_2_svg.png', desc: 'Framework reactivo progresivo', page: 'https://vuejs.org/' },
  { id: 'javascript', nombre: 'JavaScript ES6+', categoria: 'frontend', logo: 'https://i.postimg.cc/zGpQ90C8/Java_Script_logo.png', desc: 'Lenguaje base web moderno', page: 'https://developer.mozilla.org/es/docs/Web/JavaScript' },
  { id: 'flet', nombre: 'Flet Python', categoria: 'frontend', logo: logoTecno.flet?.logo, desc: 'UI Flutter para Python', page: 'https://flet.dev/' },
  { id: 'customtkinter', nombre: 'CustomTkinter', categoria: 'frontend', logo: logoTecno.customtkinter?.logo, desc: 'Modern Desktop UI Python', page: 'https://customtkinter.tomschimansky.com/' },
  
  { id: 'python', nombre: 'Python 3', categoria: 'backend', logo: logoTecno.python?.logo, desc: 'Scripting, backend, AI & IoT', page: 'https://www.python.org/' },
  { id: 'cpp', nombre: 'C / C++', categoria: 'backend', logo: logoTecno.cpp?.logo, desc: 'Sistemas embebidos y alta performance', page: 'https://isocpp.org/' },
  { id: 'csharp', nombre: 'C# .NET', categoria: 'backend', logo: logoTecno.csharp?.logo, desc: 'Desarrollo de software y lógica', page: 'https://dotnet.microsoft.com/' },
  
  { id: 'firebase', nombre: 'Firebase Suite', categoria: 'cloud', logo: logoTecno.firebase?.logo || 'https://www.gstatic.com/devrel-devsite/prod/v98d89a74aa9f7bbffcdce6bba46c59b21f37e4aeacbb2a69179d63dd8ef6cf37/firebase/images/touchicon-180.png', desc: 'Firestore, Auth, Storage, Rules', page: 'https://firebase.google.com/' },
  { id: 'netlify', nombre: 'Netlify', categoria: 'cloud', logo: 'https://www.netlify.com/v3/img/components/logomark.svg', desc: 'Despliegues CI/CD en edge', page: 'https://www.netlify.com/' },
  { id: 'namecheap', nombre: 'Namecheap DNS', categoria: 'cloud', logo: logoTecno.namecheap?.logo, desc: 'Gestión de dominios y DNS', page: 'https://www.namecheap.com/' },

  { id: 'arduino', nombre: 'Arduino', categoria: 'iot', logo: logoTecno.arduino?.logo, desc: 'Microcontroladores & sensórica', page: 'https://www.arduino.cc/' },
  { id: 'esp32', nombre: 'ESP32 & IoT', categoria: 'iot', logo: 'https://i.postimg.cc/zGpQ90C8/Java_Script_logo.png', desc: 'Protocolos WiFi, MQTT y sensores', page: 'https://www.espressif.com/' },
  { id: 'legospike', nombre: 'Lego Spike Prime', categoria: 'iot', logo: logoTecno.legospike?.logo, desc: 'Robótica educativa avanzada', page: 'https://education.lego.com/' },
  { id: 'scratch', nombre: 'Scratch & mBlock', categoria: 'iot', logo: logoTecno.scratch?.logo, desc: 'Pensamiento lógico y bloques', page: 'https://scratch.mit.edu/' },

  { id: 'figma', nombre: 'Figma', categoria: 'tools', logo: logoTecno.figma?.logo, desc: 'Diseño UX/UI y prototipado', page: 'https://www.figma.com/' },
  { id: 'framer', nombre: 'Framer', categoria: 'tools', logo: logoTecno.framer?.logo, desc: 'Animación y prototipado web', page: 'https://www.framer.com/' },
  { id: 'wordpress', nombre: 'WordPress & Elementor', categoria: 'tools', logo: logoTecno.wordpress?.logo, desc: 'CMS y portales empresariales', page: 'https://wordpress.org/' },
  { id: 'unity', nombre: 'Unity 3D', categoria: 'tools', logo: logoTecno.unity?.logo, desc: 'Simulación y videojuegos', page: 'https://unity.com/' }
];

const tecnologiasFiltradas = computed(() => {
  return techCatalog.filter((item) => {
    const matchCat = filtroActivo.value === 'todos' || item.categoria === filtroActivo.value;
    const matchBusqueda = !busqueda.value || 
      item.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      item.desc.toLowerCase().includes(busqueda.value.toLowerCase());
    return matchCat && matchBusqueda;
  });
});

const handleBadgeHover = (e) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  animate(e.currentTarget, {
    scale: 1.05,
    duration: 200,
    ease: 'outBack'
  });
};

const handleBadgeLeave = (e) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  animate(e.currentTarget, {
    scale: 1,
    duration: 200,
    ease: 'outQuad'
  });
};
</script>

<template>
  <div class="p-6 md:p-8 rounded-2xl bg-[rgba(var(--gris-oscuroRGB),0.65)] border border-gray-800 hover:border-[var(--verde-cian)]/40 backdrop-blur-md shadow-xl transition-all duration-300">
    <!-- Header con buscador y filtros -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-800">
      <div>
        <h3 class="text-base md:text-lg font-bold font-['Outfit'] text-[var(--gris-claro)] flex items-center gap-2 m-0 text-left">
          <i class="bi bi-collection-fill text-[var(--verde-cian)]"></i>
          Catálogo del Stack Tecnológico
        </h3>
        <p class="text-xs text-gray-400 mt-1 text-left">Explora el arsenal de herramientas y tecnologías dominadas</p>
      </div>

      <!-- Buscador -->
      <div class="relative w-full md:w-64">
        <i class="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
        <input 
          type="text" 
          v-model="busqueda"
          placeholder="Buscar tecnología..." 
          class="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[var(--fondo-negro)] border border-gray-700 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[var(--verde-cian)] transition"
        />
      </div>
    </div>

    <!-- Pestañas de Filtro -->
    <div class="flex flex-wrap gap-2 mb-6">
      <button 
        v-for="cat in categorias" 
        :key="cat.id"
        @click="filtroActivo = cat.id"
        :class="filtroActivo === cat.id ? 'bg-[var(--verde-cian)] text-white font-bold shadow-md shadow-[var(--verde-cian)]/30' : 'bg-gray-900/80 text-gray-400 hover:text-gray-200 border border-gray-800'"
        class="px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
      >
        <i :class="['bi', cat.icono, 'text-xs']"></i>
        <span>{{ cat.label }}</span>
      </button>
    </div>

    <!-- Grid de Tarjetas de Tecnologías -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      <div 
        v-for="item in tecnologiasFiltradas" 
        :key="item.id"
        @mouseenter="handleBadgeHover"
        @mouseleave="handleBadgeLeave"
        @click="abrirPage(item.page)"
        class="p-3.5 rounded-xl bg-[var(--fondo-negro)]/80 border border-gray-800/90 hover:border-[var(--verde-cian)]/60 transition-all flex flex-col items-center text-center cursor-pointer shadow-md group relative overflow-hidden"
      >
        <div class="w-10 h-10 flex items-center justify-center mb-2">
          <img 
            v-if="item.logo" 
            :src="item.logo" 
            :alt="item.nombre" 
            class="max-w-[34px] max-h-[34px] object-contain group-hover:scale-110 transition-transform duration-200"
          />
          <i v-else class="bi bi-cpu-fill text-2xl text-[var(--verde-cian)]"></i>
        </div>

        <span class="text-xs font-bold text-gray-200 font-['Outfit'] group-hover:text-[var(--verde-cian)] transition-colors line-clamp-1">
          {{ item.nombre }}
        </span>

        <span class="text-[10px] text-gray-500 mt-1 line-clamp-2 leading-tight">
          {{ item.desc }}
        </span>
      </div>
    </div>

    <!-- Fallback si no hay resultados -->
    <div v-if="tecnologiasFiltradas.length === 0" class="text-center py-10 text-gray-500 text-xs">
      <i class="bi bi-search text-2xl block mb-2 text-gray-600"></i>
      No se encontraron tecnologías que coincidan con "{{ busqueda }}".
    </div>
  </div>
</template>
