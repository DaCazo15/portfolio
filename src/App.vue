<script setup>
import { computed, defineAsyncComponent } from 'vue';
import Nav from './components/Nav.vue';
import About from './components/About.vue';
import Experiencia from './components/Experiencia.vue';
import Contribuciones from './components/Contribuciones.vue';
import Proyectos from './components/Proyectos.vue';
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
    contribuciones: true,
    proyectos: true
  };
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

    <!-- Footer discreto con acceso a CMD -->
    <footer class="w-full py-6 text-center text-xs text-gray-600 border-t border-gray-900 bg-[var(--fondo-negro)] mt-12 flex items-center justify-center gap-4">
      <span>© {{ new Date().getFullYear() }} Daniel Cazorla. Todos los derechos reservados.</span>
      <button 
        @click="setPage('admin')" 
        title="Acceso CMD"
        class="opacity-40 hover:opacity-100 hover:text-[var(--verde-cian)] transition text-sm cursor-pointer p-1"
      >
        <i class="bi bi-terminal"></i>
      </button>
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
