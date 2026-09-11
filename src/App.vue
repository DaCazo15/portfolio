<script setup>
import { computed, defineAsyncComponent, onMounted, onUnmounted } from 'vue';
import Nav from './components/Nav.vue';
import About from './components/About.vue';
import Experiencia from './components/Experiencia.vue';
import Contribuciones from './components/Contribuciones.vue';
import Proyectos from './components/Proyectos.vue';
import StackSection from './components/stack/StackSection.vue';
import TourGuide from './components/onboarding/TourGuide.vue';

import usePage from './composables/usePage';
import useAnchoViewport from './composables/useAnchoViewport';
import { useFirestoreCollection } from './composables/useFirestoreCollection';

// Carga perezosa (lazy-loading) del panel de administración
const AdminPanel = defineAsyncComponent(() => import('./components/admin/AdminPanel.vue'));

const { page, setPage } = usePage();
const { ancho } = useAnchoViewport();
const { data: config } = useFirestoreCollection('config', { autoFetch: true });

const esMovil = computed(() => ancho.value <= 790);

const seccionesActivas = computed(() => {
  return config.value?.seccionesActivas || {
    about: true,
    experiencia: true,
    stack: true,
    contribuciones: true,
    proyectos: true
  };
});

// Atajo de teclado global: Ctrl + Shift + A para abrir/cerrar CMD
const handleKeyDown = (e) => {
  if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
    e.preventDefault();
    setPage(page.admin ? 'inicio' : 'admin');
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

<template>
  <!-- Vista Lazy-Loaded del Panel de Administración -->
  <template v-if="page.admin">
    <Suspense>
      <template #default>
        <AdminPanel @volver="setPage('inicio')" />
      </template>
      <template #fallback>
        <div class="min-h-screen flex items-center justify-center bg-[var(--fondo-negro)] text-white">
          <div class="text-center">
            <i class="bi bi-arrow-repeat animate-spin text-4xl text-[var(--verde-cian)] block mb-3"></i>
            <p class="text-sm font-semibold">Cargando módulo de administración...</p>
          </div>
        </div>
      </template>
    </Suspense>
  </template>

  <!-- Portafolio Público -->
  <template v-else>
    <Nav 
      @setPage="setPage" 
      :esMovil="esMovil" 
      :seccionesActivas="seccionesActivas"
    />

    <!-- Sección Inicio / About -->
    <div 
      v-if="page.inicio && seccionesActivas.about !== false" 
      class="inicio" 
      :class="{ mobile: esMovil }"
    >
      <About :esMovil="esMovil" />
    </div>

    <!-- Sección Experiencia -->
    <div 
      class="inicio experiencia" 
      v-if="page.experiencia && seccionesActivas.experiencia !== false"
    >
      <Experiencia />
    </div>

    <!-- Sección Stack & Métricas -->
    <div 
      class="inicio" 
      v-if="page.stack && seccionesActivas.stack !== false"
    >
      <StackSection :esMovil="esMovil" />
    </div>

    <!-- Sección Contribuciones -->
    <div 
      class="inicio" 
      v-if="page.contribuciones && seccionesActivas.contribuciones !== false"
    >
      <Contribuciones :page="page.contribuciones" />
    </div>

    <!-- Sección Proyectos -->
    <div 
      class="inicio" 
      v-if="page.proyectos && seccionesActivas.proyectos !== false"
    >
      <Proyectos :page="page.proyectos" />
    </div>

    <!-- Onboarding Tour con Driver.js -->
    <TourGuide />

    <!-- Footer con acceso a CMD y atajo -->
    <footer class="w-full py-6 text-center text-xs text-gray-500 border-t border-gray-900 bg-[var(--fondo-negro)] mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 px-4">
      <span>© {{ new Date().getFullYear() }} Daniel Cazorla. Todos los derechos reservados.</span>
      <div class="flex items-center gap-2">
        <button 
          @click="setPage('admin')" 
          title="Acceso CMD (o presiona Ctrl+Shift+A)"
          class="opacity-60 text-xs font-mono px-2 py-1 rounded flex items-center gap-1.5"
        >
          <i class="bi bi-terminal-fill text-[var(--verde-cian)]"></i>
        </button>
      </div>
    </footer>
  </template>
</template>

<style scoped>
  .inicio {
    position: relative;
    padding-top: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--gris-medio);
    box-sizing: border-box;
    overflow: hidden;
  }
  .inicio.experiencia {
    padding-top: 0;
  }
  .inicio.mobile {
    padding-top: 0;
  }
</style>
