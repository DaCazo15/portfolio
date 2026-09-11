<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import gsap from 'gsap';
import { animate } from 'animejs';
import { useFirestoreCollection } from '../../composables/useFirestoreCollection';
import { logosProyectos } from '../../helpers/informacion';
import { abrirPage } from '../../helpers/downloadFile';

const emit = defineEmits(['ver-todos']);

const { data: todosProyectos } = useFirestoreCollection('proyectos', {
  autoFetch: true,
  realtime: true
});

// Proyectos destacados con fallback a los 3 más representativos
const proyectosDestacados = computed(() => {
  if (!todosProyectos.value || todosProyectos.value.length === 0) return [];
  const destacados = todosProyectos.value.filter((p) => p.destacado);
  if (destacados.length > 0) {
    return destacados.sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));
  }
  return todosProyectos.value.slice(0, 3);
});

const indiceActual = ref(0);
const enReproduccion = ref(true);
let intervaloAutoplay = null;
const slideContainerRef = ref(null);

// Manejo de gestos táctiles en móvil (swipe)
let touchStartX = 0;
let touchEndX = 0;

const slideActual = computed(() => {
  if (!proyectosDestacados.value.length) return null;
  return proyectosDestacados.value[indiceActual.value] || proyectosDestacados.value[0];
});

// Animación GSAP de transición estilo Hero
const animarTransicion = (direccion = 1) => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!slideContainerRef.value || reduceMotion) return;

  const tl = gsap.timeline();
  tl.fromTo(
    slideContainerRef.value.querySelector('.hero-content'),
    {
      opacity: 0,
      x: direccion * -30,
      filter: 'blur(4px)'
    },
    {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      duration: 0.45,
      ease: 'power2.out'
    }
  );

  tl.fromTo(
    slideContainerRef.value.querySelector('.hero-media'),
    {
      opacity: 0,
      scale: 0.94,
      y: 15
    },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.45,
      ease: 'power2.out'
    },
    '<'
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
  }, 5500);
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

const handleTouchStart = (e) => {
  touchStartX = e.changedTouches[0].screenX;
};

const handleTouchEnd = (e) => {
  touchEndX = e.changedTouches[0].screenX;
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) > 40) {
    if (diff > 0) {
      siguiente();
    } else {
      anterior();
    }
  }
};

// Micro-interacciones con Anime.js en controles
const handleBtnHover = (e) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  animate(e.currentTarget, {
    scale: 1.08,
    duration: 200,
    ease: 'outBack'
  });
};

const handleBtnLeave = (e) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  animate(e.currentTarget, {
    scale: 1,
    duration: 200,
    ease: 'outQuad'
  });
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
    class="w-full max-w-6xl mx-auto px-3 sm:px-4 py-8"
    @mouseenter="detenerAutoplay"
    @mouseleave="iniciarAutoplay"
  >
    <!-- Encabezado sutil del Hero -->
    <div class="flex items-center justify-between mb-3 px-1">
      <div class="flex items-center gap-2">
        <span class="flex h-3 w-3 relative">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--verde-cian)] opacity-75"></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-[var(--verde-cian)]"></span>
        </span>
        <span class="text-xs uppercase font-extrabold tracking-widest text-[var(--verde-cian)] font-['Outfit']">
          Featured Projects Showcase
        </span>
      </div>

      <!-- Control de pausa/play -->
      <button 
        @click="toggleAutoplay" 
        :title="enReproduccion ? 'Pausar rotación automática' : 'Reanudar rotación automática'"
        class="w-7 h-7 rounded-full bg-[var(--gris-oscuro)] border border-gray-700 hover:border-[var(--verde-cian)] text-gray-300 hover:text-[var(--verde-cian)] flex items-center justify-center transition cursor-pointer text-xs shadow-md"
      >
        <i :class="enReproduccion ? 'bi bi-pause-fill' : 'bi bi-play-fill'"></i>
      </button>
    </div>

    <!-- Bloque de color sólido a pantalla con esquinas redondeadas grandes (2rem) -->
    <div 
      class="hero-container relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[var(--gris-oscuro)] via-[#151c20] to-[var(--fondo-negro)] border border-[var(--verde-cian)]/30 shadow-2xl"
      @touchstart.passive="handleTouchStart"
      @touchend.passive="handleTouchEnd"
    >
      <!-- Aura Neón de Fondo -->
      <div class="absolute -top-32 -right-32 w-80 h-80 bg-[var(--verde-cian)]/15 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-32 -left-32 w-80 h-80 bg-[var(--verde-cian-oscuro)]/20 rounded-full blur-3xl pointer-events-none"></div>

      <!-- Slide Activo -->
      <div 
        ref="slideContainerRef"
        v-if="slideActual"
        class="p-6 sm:p-10 md:p-12 flex flex-col md:flex-row gap-8 items-center justify-between min-h-[360px] relative z-10"
      >
        <!-- Columna Izquierda: Tipografía Display Outfit en Mayúsculas y Línea de Acento -->
        <div class="hero-content flex-1 text-left space-y-4 w-full">
          <!-- Línea de Acento tipo Call-To-Action -->
          <div class="accent-line flex items-center gap-2">
            <span class="w-8 h-[2px] bg-[var(--verde-cian)] inline-block"></span>
            <span class="text-xs sm:text-sm font-bold tracking-widest text-[var(--verde-cian)] uppercase font-['Outfit']">
              EXPLORA EL PROYECTO & DEMO
            </span>
          </div>

          <!-- Título Display en Mayúsculas (Outfit 700/900 clamp(2.5rem, 6vw, 5rem)) -->
          <h1 
            class="hero-title text-white m-0 text-left font-extrabold uppercase font-['Outfit'] leading-none tracking-tight drop-shadow-md"
            v-html="slideActual.titulo || slideActual.Name"
          ></h1>

          <!-- Descripción del Proyecto -->
          <p class="text-xs sm:text-sm md:text-base text-gray-300 line-clamp-3 md:line-clamp-4 leading-relaxed m-0 text-left max-w-xl">
            {{ slideActual.descripcion || slideActual.Descripcion }}
          </p>

          <!-- Badges de Tecnologías -->
          <div class="flex flex-wrap gap-2 pt-1">
            <span 
              v-for="tech in (slideActual.tecnologias || slideActual.Tecnologias || [])" 
              :key="tech"
              class="px-2.5 py-1 rounded-md text-[11px] bg-[var(--fondo-negro)]/80 text-[var(--gris-claro)] uppercase tracking-wider font-mono border border-gray-700/80 shadow-sm"
            >
              {{ tech }}
            </span>
          </div>

          <!-- Botones CTA Pequeños Sólidos / Contorno -->
          <div class="flex flex-wrap items-center gap-3 pt-3">
            <button 
              v-if="slideActual.demoUrl"
              @click="abrirPage(slideActual.demoUrl)"
              @mouseenter="handleBtnHover"
              @mouseleave="handleBtnLeave"
              class="py-2.5 px-6 rounded-xl bg-[var(--verde-cian)] hover:bg-[var(--verde-cian-oscuro)] text-white font-bold text-xs uppercase tracking-wider transition duration-200 flex items-center gap-2 shadow-lg shadow-[var(--verde-cian)]/30 cursor-pointer"
            >
              <i class="bi bi-box-arrow-up-right text-sm"></i>
              Probar Demo
            </button>

            <button 
              v-if="slideActual.repoUrl"
              @click="abrirPage(slideActual.repoUrl)"
              @mouseenter="handleBtnHover"
              @mouseleave="handleBtnLeave"
              class="py-2.5 px-5 rounded-xl bg-transparent hover:bg-gray-800/80 text-[var(--gris-claro)] text-xs font-semibold uppercase tracking-wider transition duration-200 flex items-center gap-2 border border-[var(--verde-cian)]/60 hover:border-[var(--verde-cian)] cursor-pointer"
            >
              <i class="bi bi-github text-sm"></i>
              Ver Código
            </button>
          </div>
        </div>

        <!-- Columna Derecha: Mockup / Imagen del Proyecto con degradado sutil hacia el fondo oscuro -->
        <div class="hero-media w-full md:w-96 h-60 md:h-72 rounded-2xl overflow-hidden bg-black/70 border border-[var(--verde-cian)]/30 flex items-center justify-center relative shrink-0 shadow-2xl group">
          <img 
            v-if="slideActual.imagenes && slideActual.imagenes.length"
            :src="slideActual.imagenes[0]" 
            :alt="slideActual.titulo" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <img 
            v-else-if="logosProyectos[slideActual.Abreviatura]"
            :src="logosProyectos[slideActual.Abreviatura].img" 
            :alt="slideActual.Abreviatura"
            class="w-36 h-36 object-contain filter drop-shadow-2xl group-hover:scale-110 transition-transform duration-300"
          />
          <div v-else class="text-center text-gray-400">
            <i class="bi bi-terminal-fill text-5xl block mb-2 text-[var(--verde-cian)]"></i>
            <span class="text-xs uppercase font-bold tracking-widest text-gray-300 font-['Outfit']">Project Artifact</span>
          </div>

          <!-- Degradado sutil hacia el fondo oscuro para integración visual -->
          <div class="absolute inset-0 bg-gradient-to-t from-[var(--fondo-negro)]/80 via-transparent to-transparent pointer-events-none"></div>
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[var(--fondo-negro)]/40 pointer-events-none hidden md:block"></div>
        </div>
      </div>

      <!-- Flechas de navegación del carrusel: verticalmente centradas (ocultas en móvil) -->
      <button 
        @click="anterior"
        @mouseenter="handleBtnHover"
        @mouseleave="handleBtnLeave"
        aria-label="Proyecto anterior"
        class="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[rgba(var(--gris-oscuroRGB),0.6)] hover:bg-[var(--gris-oscuro)] text-[var(--verde-cian)] border border-[var(--verde-cian)]/40 hover:border-[var(--verde-cian)] items-center justify-center transition cursor-pointer text-lg shadow-xl backdrop-blur-sm"
      >
        <i class="bi bi-chevron-left"></i>
      </button>

      <button 
        @click="siguiente"
        @mouseenter="handleBtnHover"
        @mouseleave="handleBtnLeave"
        aria-label="Siguiente proyecto"
        class="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[rgba(var(--gris-oscuroRGB),0.6)] hover:bg-[var(--gris-oscuro)] text-[var(--verde-cian)] border border-[var(--verde-cian)]/40 hover:border-[var(--verde-cian)] items-center justify-center transition cursor-pointer text-lg shadow-xl backdrop-blur-sm"
      >
        <i class="bi bi-chevron-right"></i>
      </button>
    </div>

    <!-- Puntos de paginación abajo centrados -->
    <div class="flex items-center justify-center gap-2.5 mt-5">
      <button 
        v-for="(_, idx) in proyectosDestacados" 
        :key="idx"
        @click="irAIndice(idx)"
        :class="idx === indiceActual ? 'w-8 bg-[var(--verde-cian)] shadow-md shadow-[var(--verde-cian)]/60' : 'w-2.5 bg-[var(--gris-claro)]/30 hover:bg-[var(--gris-claro)]/60'"
        class="h-2.5 rounded-full transition-all duration-300 cursor-pointer"
        :title="`Proyecto ${idx + 1}`"
      ></button>
    </div>
  </section>
</template>

<style scoped>
.hero-title {
  font-size: clamp(2.2rem, 5.5vw, 4.5rem);
}
@media (max-width: 791px) {
  .hero-title {
    font-size: clamp(1.8rem, 7vw, 2.5rem);
  }
}
</style>

