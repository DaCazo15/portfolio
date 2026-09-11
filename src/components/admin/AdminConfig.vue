<script setup>
import { ref, watch } from 'vue';
import { useFirestoreCollection } from '../../composables/useFirestoreCollection';

const { data: config, updateConfigSite, loading } = useFirestoreCollection('config', { autoFetch: true });

const guardando = ref(false);
const mensajeExito = ref('');

const secciones = ref({
  about: true,
  experiencia: true,
  contribuciones: true,
  proyectos: true
});

watch(config, (nuevaConfig) => {
  if (nuevaConfig && nuevaConfig.seccionesActivas) {
    secciones.value = { ...secciones.value, ...nuevaConfig.seccionesActivas };
  }
}, { immediate: true });

const guardarCambios = async () => {
  guardando.value = true;
  mensajeExito.value = '';
  try {
    await updateConfigSite({
      seccionesActivas: secciones.value
    });
    mensajeExito.value = 'Configuración guardada exitosamente.';
    setTimeout(() => {
      mensajeExito.value = '';
    }, 3500);
  } catch (err) {
    console.error('Error al guardar configuración:', err);
  } finally {
    guardando.value = false;
  }
};
</script>

<template>
  <div class="bg-[rgba(var(--gris-oscuroRGB),0.7)] border border-gray-800 rounded-2xl p-6 md:p-8 backdrop-blur-md">
    <div class="flex items-center justify-between pb-4 mb-6 border-b border-gray-800">
      <div>
        <h2 class="text-xl font-bold font-['Rubik'] text-[var(--gris-claro)] flex items-center gap-2 m-0 text-left">
          <i class="bi bi-toggles text-[var(--verde-cian)]"></i>
          Visibilidad de Secciones
        </h2>
        <p class="text-xs text-gray-400 mt-1">Activa o desactiva las secciones visibles para el público</p>
      </div>

      <button 
        @click="guardarCambios" 
        :disabled="guardando"
        class="py-2 px-4 rounded-xl bg-[var(--verde-cian)] hover:bg-[var(--verde-cian-oscuro)] text-white font-semibold text-xs transition duration-200 shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
      >
        <i v-if="!guardando" class="bi bi-check2-circle text-base"></i>
        <i v-else class="bi bi-arrow-repeat animate-spin text-base"></i>
        {{ guardando ? 'Guardando...' : 'Guardar Estado' }}
      </button>
    </div>

    <!-- Mensaje de éxito -->
    <div v-if="mensajeExito" class="mb-6 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
      <i class="bi bi-check-circle-fill text-emerald-400 text-sm"></i>
      <span>{{ mensajeExito }}</span>
    </div>

    <!-- Switches Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <!-- About -->
      <label class="flex items-center justify-between p-4 rounded-xl bg-[var(--fondo-negro)] border border-gray-800 hover:border-[var(--verde-cian)]/40 transition cursor-pointer">
        <div class="flex items-center gap-3">
          <i class="bi bi-person-badge text-xl text-[var(--verde-cian)]"></i>
          <div>
            <span class="block text-sm font-semibold text-[var(--gris-claro)]">Sobre Mí (About)</span>
            <span class="text-xs text-gray-400">Presentación y perfil profesional</span>
          </div>
        </div>
        <input 
          type="checkbox" 
          v-model="secciones.about" 
          class="w-5 h-5 accent-[var(--verde-cian)] cursor-pointer"
        />
      </label>

      <!-- Experiencia -->
      <label class="flex items-center justify-between p-4 rounded-xl bg-[var(--fondo-negro)] border border-gray-800 hover:border-[var(--verde-cian)]/40 transition cursor-pointer">
        <div class="flex items-center gap-3">
          <i class="bi bi-briefcase text-xl text-[var(--verde-cian)]"></i>
          <div>
            <span class="block text-sm font-semibold text-[var(--gris-claro)]">Experiencia Laboral</span>
            <span class="text-xs text-gray-400">Historial de cargos y roles</span>
          </div>
        </div>
        <input 
          type="checkbox" 
          v-model="secciones.experiencia" 
          class="w-5 h-5 accent-[var(--verde-cian)] cursor-pointer"
        />
      </label>

      <!-- Contribuciones -->
      <label class="flex items-center justify-between p-4 rounded-xl bg-[var(--fondo-negro)] border border-gray-800 hover:border-[var(--verde-cian)]/40 transition cursor-pointer">
        <div class="flex items-center gap-3">
          <i class="bi bi-stars text-xl text-[var(--verde-cian)]"></i>
          <div>
            <span class="block text-sm font-semibold text-[var(--gris-claro)]">Contribuciones</span>
            <span class="text-xs text-gray-400">Proyectos académicos y comunitarios</span>
          </div>
        </div>
        <input 
          type="checkbox" 
          v-model="secciones.contribuciones" 
          class="w-5 h-5 accent-[var(--verde-cian)] cursor-pointer"
        />
      </label>

      <!-- Proyectos -->
      <label class="flex items-center justify-between p-4 rounded-xl bg-[var(--fondo-negro)] border border-gray-800 hover:border-[var(--verde-cian)]/40 transition cursor-pointer">
        <div class="flex items-center gap-3">
          <i class="bi bi-code-square text-xl text-[var(--verde-cian)]"></i>
          <div>
            <span class="block text-sm font-semibold text-[var(--gris-claro)]">Proyectos</span>
            <span class="text-xs text-gray-400">Catálogo de proyectos desarrollados</span>
          </div>
        </div>
        <input 
          type="checkbox" 
          v-model="secciones.proyectos" 
          class="w-5 h-5 accent-[var(--verde-cian)] cursor-pointer"
        />
      </label>
    </div>
  </div>
</template>
