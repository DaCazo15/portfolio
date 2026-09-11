<script setup>
import { ref, watch } from 'vue';
import { useFirestoreCollection } from '../../composables/useFirestoreCollection';

const { data: config, updateConfigSite, loading } = useFirestoreCollection('config', { autoFetch: true });

const guardando = ref(false);
const mensajeExito = ref('');

const secciones = ref({
  about: true,
  experiencia: true,
  stack: true,
  contribuciones: true,
  proyectos: true
});

const widgets = ref({
  graficaBarras: true,
  graficaDona: true,
  dominiosHabilidad: true,
  mallaInteractiva: true,
  metricasKpi: true
});

watch(config, (nuevaConfig) => {
  if (nuevaConfig) {
    if (nuevaConfig.seccionesActivas) {
      secciones.value = { ...secciones.value, ...nuevaConfig.seccionesActivas };
    }
    if (nuevaConfig.widgetsStack) {
      widgets.value = { ...widgets.value, ...nuevaConfig.widgetsStack };
    }
  }
}, { immediate: true });

const guardarCambios = async () => {
  guardando.value = true;
  mensajeExito.value = '';
  try {
    await updateConfigSite({
      seccionesActivas: secciones.value,
      widgetsStack: widgets.value
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

      <!-- Stack -->
      <label class="flex items-center justify-between p-4 rounded-xl bg-[var(--fondo-negro)] border border-gray-800 hover:border-[var(--verde-cian)]/40 transition cursor-pointer">
        <div class="flex items-center gap-3">
          <i class="bi bi-layers text-xl text-[var(--verde-cian)]"></i>
          <div>
            <span class="block text-sm font-semibold text-[var(--gris-claro)]">Stack & Datos</span>
            <span class="text-xs text-gray-400">Gráficas interactivas y tecnologías</span>
          </div>
        </div>
        <input 
          type="checkbox" 
          v-model="secciones.stack" 
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

    <!-- Sección de Widgets de Stack -->
    <div class="mt-10 pt-8 border-t border-gray-800">
      <div class="mb-5">
        <h3 class="text-lg font-bold font-['Rubik'] text-[var(--gris-claro)] flex items-center gap-2 m-0 text-left">
          <i class="bi bi-grid-1x2-fill text-[var(--verde-cian)]"></i>
          Widgets de la Sección "Stack"
        </h3>
        <p class="text-xs text-gray-400 mt-1">Habilita o deshabilita los diferentes componentes analíticos del Stack</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- Widget 1: KPIs -->
        <label class="flex items-center justify-between p-4 rounded-xl bg-[var(--fondo-negro)] border border-gray-800 hover:border-[var(--verde-cian)]/40 transition cursor-pointer">
          <div class="flex items-center gap-3">
            <i class="bi bi-speedometer2 text-lg text-[var(--verde-cian)]"></i>
            <div>
              <span class="block text-xs font-semibold text-[var(--gris-claro)]">Tarjetas de KPIs</span>
              <span class="text-[11px] text-gray-400">Métricas globales resumidas</span>
            </div>
          </div>
          <input 
            type="checkbox" 
            v-model="widgets.metricasKpi" 
            class="w-4 h-4 accent-[var(--verde-cian)] cursor-pointer"
          />
        </label>

        <!-- Widget 2: Gráfica Barras -->
        <label class="flex items-center justify-between p-4 rounded-xl bg-[var(--fondo-negro)] border border-gray-800 hover:border-[var(--verde-cian)]/40 transition cursor-pointer">
          <div class="flex items-center gap-3">
            <i class="bi bi-bar-chart-fill text-lg text-[var(--verde-cian)]"></i>
            <div>
              <span class="block text-xs font-semibold text-[var(--gris-claro)]">Frecuencia de Tecnologías</span>
              <span class="text-[11px] text-gray-400">Gráfica de barras Chart.js</span>
            </div>
          </div>
          <input 
            type="checkbox" 
            v-model="widgets.graficaBarras" 
            class="w-4 h-4 accent-[var(--verde-cian)] cursor-pointer"
          />
        </label>

        <!-- Widget 3: Gráfica Dona -->
        <label class="flex items-center justify-between p-4 rounded-xl bg-[var(--fondo-negro)] border border-gray-800 hover:border-[var(--verde-cian)]/40 transition cursor-pointer">
          <div class="flex items-center gap-3">
            <i class="bi bi-pie-chart-fill text-lg text-[var(--verde-cian)]"></i>
            <div>
              <span class="block text-xs font-semibold text-[var(--gris-claro)]">Distribución Despliegues</span>
              <span class="text-[11px] text-gray-400">Gráfica de dona Chart.js</span>
            </div>
          </div>
          <input 
            type="checkbox" 
            v-model="widgets.graficaDona" 
            class="w-4 h-4 accent-[var(--verde-cian)] cursor-pointer"
          />
        </label>

        <!-- Widget 4: Dominios de Habilidad -->
        <label class="flex items-center justify-between p-4 rounded-xl bg-[var(--fondo-negro)] border border-gray-800 hover:border-[var(--verde-cian)]/40 transition cursor-pointer">
          <div class="flex items-center gap-3">
            <i class="bi bi-diagram-3-fill text-lg text-[var(--verde-cian)]"></i>
            <div>
              <span class="block text-xs font-semibold text-[var(--gris-claro)]">Dominios Técnicos</span>
              <span class="text-[11px] text-gray-400">Frontend, Backend, IoT & AI</span>
            </div>
          </div>
          <input 
            type="checkbox" 
            v-model="widgets.dominiosHabilidad" 
            class="w-4 h-4 accent-[var(--verde-cian)] cursor-pointer"
          />
        </label>

        <!-- Widget 5: Malla Interactiva -->
        <label class="flex items-center justify-between p-4 rounded-xl bg-[var(--fondo-negro)] border border-gray-800 hover:border-[var(--verde-cian)]/40 transition cursor-pointer">
          <div class="flex items-center gap-3">
            <i class="bi bi-collection-fill text-lg text-[var(--verde-cian)]"></i>
            <div>
              <span class="block text-xs font-semibold text-[var(--gris-claro)]">Malla Interactiva de Stack</span>
              <span class="text-[11px] text-gray-400">Explorador de tecnologías con filtros</span>
            </div>
          </div>
          <input 
            type="checkbox" 
            v-model="widgets.mallaInteractiva" 
            class="w-4 h-4 accent-[var(--verde-cian)] cursor-pointer"
          />
        </label>
      </div>
    </div>
  </div>
</template>
