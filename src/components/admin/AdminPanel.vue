<script setup>
import { ref } from 'vue';
import { useAuthAdmin } from '../../composables/useAuthAdmin';
import AdminLogin from './AdminLogin.vue';
import AdminConfig from './AdminConfig.vue';
import AdminProyectos from './AdminProyectos.vue';
import AdminExperiencia from './AdminExperiencia.vue';
import AdminContribuciones from './AdminContribuciones.vue';

const emit = defineEmits(['volver']);
const { user, loading, logout } = useAuthAdmin();

const tabActiva = ref('config'); // 'config', 'proyectos', 'experiencia', 'contribuciones'

const handleLogout = async () => {
  await logout();
};
</script>

<template>
  <!-- Vista de Carga Inicial de Auth -->
  <div v-if="loading" class="min-h-screen flex items-center justify-center bg-[var(--fondo-negro)] text-[var(--gris-claro)]">
    <div class="text-center">
      <i class="bi bi-arrow-repeat animate-spin text-4xl text-[var(--verde-cian)] block mb-3"></i>
      <p class="text-sm font-semibold">Verificando sesión de administrador...</p>
    </div>
  </div>

  <!-- Vista de Login si no hay usuario autenticado -->
  <AdminLogin 
    v-else-if="!user" 
    @volver="emit('volver')" 
  />

  <!-- Panel de Administración Autenticado -->
  <div v-else class="min-h-screen bg-[var(--fondo-negro)] text-[var(--gris-claro)] font-['Outfit',sans-serif]">
    <!-- Barra Superior -->
    <header class="sticky top-0 z-40 bg-[rgba(var(--gris-oscuroRGB),0.9)] border-b border-gray-800 backdrop-blur-md px-4 lg:px-8 py-3.5 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-[var(--verde-cian)]/20 text-[var(--verde-cian)] flex items-center justify-center font-bold border border-[var(--verde-cian)]/40">
          <i class="bi bi-terminal-fill text-lg"></i>
        </div>
        <div>
          <h1 class="text-base font-bold font-['Rubik'] text-white m-0 tracking-wide">
            CMD <span class="text-[var(--verde-cian)]">Panel</span>
          </h1>
          <p class="text-[11px] text-gray-400 m-0">{{ user.email }}</p>
        </div>
      </div>

      <div class="flex items-center gap-2 sm:gap-3">
        <button 
          @click="emit('volver')"
          class="py-1.5 px-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
        >
          <i class="bi bi-box-arrow-up-right text-[var(--verde-cian)]"></i>
          <span class="hidden sm:inline">Ver Portafolio</span>
        </button>

        <button 
          @click="handleLogout"
          class="py-1.5 px-3 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-800/40 text-red-300 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
        >
          <i class="bi bi-door-closed"></i>
          <span class="hidden sm:inline">Cerrar Sesión</span>
        </button>
      </div>
    </header>

    <!-- Contenido Principal & Navegación por Tabs -->
    <main class="max-w-6xl mx-auto px-4 py-8">
      <!-- Barra de Pestañas -->
      <nav class="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-gray-800 no-scrollbar">
        <button 
          @click="tabActiva = 'config'"
          :class="tabActiva === 'config' ? 'bg-[var(--verde-cian)] text-white shadow-lg shadow-[var(--verde-cian)]/20' : 'bg-gray-900/60 text-gray-400 hover:bg-gray-800 hover:text-gray-200'"
          class="py-2.5 px-4 rounded-xl text-xs font-semibold transition flex items-center gap-2 whitespace-nowrap cursor-pointer"
        >
          <i class="bi bi-toggles"></i>
          Secciones Activas
        </button>

        <button 
          @click="tabActiva = 'proyectos'"
          :class="tabActiva === 'proyectos' ? 'bg-[var(--verde-cian)] text-white shadow-lg shadow-[var(--verde-cian)]/20' : 'bg-gray-900/60 text-gray-400 hover:bg-gray-800 hover:text-gray-200'"
          class="py-2.5 px-4 rounded-xl text-xs font-semibold transition flex items-center gap-2 whitespace-nowrap cursor-pointer"
        >
          <i class="bi bi-folder2-open"></i>
          Proyectos & Storage
        </button>

        <button 
          @click="tabActiva = 'experiencia'"
          :class="tabActiva === 'experiencia' ? 'bg-[var(--verde-cian)] text-white shadow-lg shadow-[var(--verde-cian)]/20' : 'bg-gray-900/60 text-gray-400 hover:bg-gray-800 hover:text-gray-200'"
          class="py-2.5 px-4 rounded-xl text-xs font-semibold transition flex items-center gap-2 whitespace-nowrap cursor-pointer"
        >
          <i class="bi bi-briefcase"></i>
          Experiencia Laboral
        </button>

        <button 
          @click="tabActiva = 'contribuciones'"
          :class="tabActiva === 'contribuciones' ? 'bg-[var(--verde-cian)] text-white shadow-lg shadow-[var(--verde-cian)]/20' : 'bg-gray-900/60 text-gray-400 hover:bg-gray-800 hover:text-gray-200'"
          class="py-2.5 px-4 rounded-xl text-xs font-semibold transition flex items-center gap-2 whitespace-nowrap cursor-pointer"
        >
          <i class="bi bi-stars"></i>
          Contribuciones
        </button>
      </nav>

      <!-- Componente Renderizado según Pestaña -->
      <transition mode="out-in" enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 translate-y-2" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <component 
          :is="tabActiva === 'config' ? AdminConfig : tabActiva === 'proyectos' ? AdminProyectos : tabActiva === 'experiencia' ? AdminExperiencia : AdminContribuciones"
        />
      </transition>
    </main>
  </div>
</template>
