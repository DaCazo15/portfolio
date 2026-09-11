<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import gsap from 'gsap';
import { animate } from 'animejs';
import { useFirestoreCollection } from '../../composables/useFirestoreCollection';
import { logosProyectos, logoTecno, logoDespliegue } from '../../helpers/informacion';
import { abrirPage } from '../../helpers/downloadFile';

const emit = defineEmits(['ver-todos']);

const { data: todosProyectos, loading } = useFirestoreCollection('proyectos', {
  autoFetch: true,
  realtime: true
});

// Proyectos destacados con fallback a los 3 más recientes
const proyectosDestacados = computed(() => {
  if (!todosProyectos.value || todosProyectos.value.length === 0) return [];
  const destacados = todosProyectos.value.filter((p) => p.destacado);
  if (destacados.length > 0) {
    return destacados.sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));
  }
  // Fallback: los 3 primeros
  return todosProyectos.value.slice(0, 3);
});

const indiceActual = ref(0);
const enReproduccion = ref(true);
let intervaloAutoplay = null;
const slideContainerRef = ref(null);

// Manejo de touch swipe
let touchStartX = 0;
let touchEndX = 0;

const slideActual = computed(() => {
  if (!proyectosDestacados.value.length) return null;
  return proyectosDestacados.value[indiceActual.value] || proyectosDestacados.value[0];
});

// Animación GSAP de transición de slide
const animarTransicion = (direccion = 1) => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!slideContainerRef.value || reduceMotion) return;

  const tl = gsap.timeline();
  tl.fromTo(
    slideContainerRef.value,
    {
      opacity: 0,
      x: direccion * 35,
      scale: 0.98
    },
    {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 0.45,
      ease: 'power2.out'
    }
  );
};

const siguiente = () => {
  if (!proyectosDestacados.value.length) return;
  indiceActual.value = (indiceActual.value + 1) % proyectosDestacados.value.length;
  nextTick(() => animarTransicion(1));
};

const anterior = () => {
  if (!proyectosDestacados.value.length) return;
  indiceActual.value =
    (indiceActual.value - 1 + proyectosDestacados.value.length) % proyectosDestacados.value.length;
  nextTick(() => animarTransicion(-1));
};

const irAIndice = (idx) => {
  if (idx === indiceActual.value) return;
  const dir = idx > indiceActual.value ? 1 : -1;
  indiceActual.value = idx;
  nextTick(() => animarTransicion(dir));
};

const iniciarAutoplay = () => {
  detenerAutoplay();
  enReproduccion.value = true;
  intervaloAutoplay = setInterval(() => {
    siguiente();
  }, 5000);
};

const detenerAutoplay = () => {
  if (intervaloAutoplay) {
    clearInterval(intervaloAutoplay);
    intervaloAutoplay = null;
  }
  enReproduccion.value = false;
};

const toggleAutoplay = () => {
  if (enReproduccion.value) {
    detenerAutoplay();
  } else {
    iniciarAutoplay();
  }
};

// Micro-interacción Anime.js en hover de tarjeta
const handleHoverIn = (event) => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;
  animate(event.currentTarget, {
    translateY: -4,
    boxShadow: '0 12px 28px -4px rgba(0, 134, 134, 0.25)',
    duration: 250,
    ease: 'outQuad'
  });
};

const handleHoverOut = (event) => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;
  animate(event.currentTarget, {
    translateY: 0,
    boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.3)',
    duration: 250,
    ease: 'outQuad'
  });
};

// Touch events para swipe móvil
const handleTouchStart = (e) => {
  touchStartX = e.changedTouches[0].screenX;
};

const handleTouchEnd = (e) => {
  touchEndX = e.changedTouches[0].screenX;
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) > 45) {
    if (diff > 0) {
      siguiente();
    } else {
      anterior();
    }
  }
};

onMounted(() => {
  iniciarAutoplay();
});

onUnmounted(() => {
  detenerAutoplay();
});
</script>

<template>
  <section 
    v-if="proyectosDestacados && proyectosDestacados.length" 
    class="w-full max-w-4xl mx-auto px-4 py-8"
    @mouseenter="detenerAutoplay"
    @mouseleave="iniciarAutoplay"
  >
    <!-- Título de la sección -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <i class="bi bi-star-fill text-[var(--verde-cian)] text-lg"></i>
        <h2 class="text-xl md:text-2xl font-bold font-['Rubik'] text-[var(--gris-claro)] m-0 text-left">
          Proyectos Destacados
        </h2>
      </div>

      <div class="flex items-center gap-2">
        <!-- Control Play/Pause -->
        <button 
          @click="toggleAutoplay" 
          :title="enReproduccion ? 'Pausar rotación' : 'Reanudar rotación'"
          class="w-8 h-8 rounded-full bg-gray-900 border border-gray-700 hover:border-[var(--verde-cian)] text-gray-300 hover:text-[var(--verde-cian)] flex items-center justify-center transition cursor-pointer text-xs"
        >
          <i :class="enReproduccion ? 'bi bi-pause-fill' : 'bi bi-play-fill'"></i>
        </button>
      </div>
    </div>

    <!-- Contenedor del Carrusel -->
    <div 
      class="relative overflow-hidden rounded-2xl bg-[rgba(var(--gris-oscuroRGB),0.6)] border border-gray-800 shadow-xl backdrop-blur-sm"
      @touchstart.passive="handleTouchStart"
      @touchend.passive="handleTouchEnd"
    >
      <!-- Slide Activo -->
      <div 
        ref="slideContainerRef"
        v-if="slideActual"
        @mouseenter="handleHoverIn"
        @mouseleave="handleHoverOut"
        class="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center justify-between transition-all"
      >
        <!-- Información del Proyecto -->
        <div class="flex-1 text-left space-y-3">
          <div class="flex items-center gap-2.5">
            <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[var(--verde-cian)]/15 text-[var(--verde-cian)] border border-[var(--verde-cian)]/30">
              Proyecto #{{ indiceActual + 1 }} de {{ proyectosDestacados.length }}
            </span>
            <span 
              v-if="slideActual.despliegue && slideActual.despliegue !== 'null'"
              class="px-2 py-0.5 rounded-full text-[10px] text-gray-400 bg-black/40 border border-gray-800"
            >
              {{ slideActual.despliegue }}
            </span>
          </div>

          <h3 class="text-xl md:text-2xl font-bold font-['Rubik'] text-white m-0 text-left" v-html="slideActual.titulo || slideActual.Name"></h3>

          <p class="text-xs md:text-sm text-gray-300 line-clamp-3 leading-relaxed m-0 text-left">
            {{ slideActual.descripcion || slideActual.Descripcion }}
          </p>

          <!-- Badges de Tecnologías -->
          <div class="flex flex-wrap gap-1.5 pt-1">
            <span 
              v-for="tech in (slideActual.tecnologias || slideActual.Tecnologias || [])" 
              :key="tech"
              class="px-2 py-0.5 rounded-md text-[11px] bg-gray-800 text-gray-300 uppercase tracking-wider font-mono border border-gray-700"
            >
              {{ tech }}
            </span>
          </div>

          <!-- Botones de Acción -->
          <div class="flex items-center gap-3 pt-3">
            <button 
              v-if="slideActual.demoUrl"
              @click="abrirPage(slideActual.demoUrl)"
              class="py-2 px-4 rounded-xl bg-[var(--verde-cian)] hover:bg-[var(--verde-cian-oscuro)] text-white font-semibold text-xs transition flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <i class="bi bi-box-arrow-up-right"></i> Ver Demo
            </button>

            <button 
              v-if="slideActual.repoUrl"
              @click="abrirPage(slideActual.repoUrl)"
              class="py-2 px-4 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold transition flex items-center gap-1.5 border border-gray-700 cursor-pointer"
            >
              <i class="bi bi-github"></i> Repositorio
            </button>
          </div>
        </div>

        <!-- Imagen o Mockup del Proyecto -->
        <div class="w-full md:w-64 h-44 rounded-xl overflow-hidden bg-black/40 border border-gray-700 flex items-center justify-center relative shrink-0">
          <img 
            v-if="slideActual.imagenes && slideActual.imagenes.length"
            :src="slideActual.imagenes[0]" 
            :alt="slideActual.titulo" 
            class="w-full h-full object-cover"
          />
          <img 
            v-else-if="logosProyectos[slideActual.Abreviatura]"
            :src="logosProyectos[slideActual.Abreviatura].img" 
            :alt="slideActual.Abreviatura"
            class="w-24 h-24 object-contain filter drop-shadow-md"
          />
          <div v-else class="text-center text-gray-500">
            <i class="bi bi-code-slash text-4xl block mb-1 text-[var(--verde-cian)]/60"></i>
            <span class="text-[10px] uppercase font-bold tracking-wider">Proyecto</span>
          </div>
        </div>
      </div>

      <!-- Flechas de Navegación -->
      <button 
        @click="anterior"
        aria-label="Proyecto anterior"
        class="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-[var(--verde-cian)] text-white border border-gray-700 hover:border-[var(--verde-cian)] flex items-center justify-center transition cursor-pointer text-sm shadow-md"
      >
        <i class="bi bi-chevron-left"></i>
      </button>

      <button 
        @click="siguiente"
        aria-label="Siguiente proyecto"
        class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-[var(--verde-cian)] text-white border border-gray-700 hover:border-[var(--verde-cian)] flex items-center justify-center transition cursor-pointer text-sm shadow-md"
      >
        <i class="bi bi-chevron-right"></i>
      </button>
    </div>

    <!-- Indicadores (Dots) -->
    <div class="flex items-center justify-center gap-2 mt-4">
      <button 
        v-for="(_, idx) in proyectosDestacados" 
        :key="idx"
        @click="irAIndice(idx)"
        :class="idx === indiceActual ? 'w-6 bg-[var(--verde-cian)]' : 'w-2 bg-gray-700 hover:bg-gray-500'"
        class="h-2 rounded-full transition-all duration-300 cursor-pointer"
        :title="`Ir al slide ${idx + 1}`"
      ></button>
    </div>
  </section>
</template>
