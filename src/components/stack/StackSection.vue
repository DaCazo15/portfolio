<script setup>
import { computed } from 'vue';
import { useFirestoreCollection } from '../../composables/useFirestoreCollection';

// Importación de sub-widgets modulares
import WidgetMetricsKpi from './WidgetMetricsKpi.vue';
import WidgetTechBars from './WidgetTechBars.vue';
import WidgetPlatformDoughnut from './WidgetPlatformDoughnut.vue';
import WidgetSkillDomains from './WidgetSkillDomains.vue';
import WidgetStackGrid from './WidgetStackGrid.vue';

defineProps({
  esMovil: {
    type: Boolean,
    default: false
  }
});

// Carga en tiempo real de proyectos, experiencia y configuración del sitio
const { data: proyectos } = useFirestoreCollection('proyectos', { realtime: true });
const { data: experiencia } = useFirestoreCollection('experiencia', { realtime: true });
const { data: config } = useFirestoreCollection('config', { autoFetch: true });

// Control de visibilidad de widgets configurados desde el CMD / Admin
const widgetsActivos = computed(() => {
  return config.value?.widgetsStack || {
    metricasKpi: true,
    graficaBarras: true,
    graficaDona: true,
    dominiosHabilidad: true,
    mallaInteractiva: true
  };
});
</script>

<template>
  <section class="w-full max-w-6xl mx-auto px-4 py-8 space-y-8">
    <!-- Encabezado de la Sección -->
    <div class="text-center">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--verde-cian)]/15 text-[var(--verde-cian)] border border-[var(--verde-cian)]/30 text-xs font-semibold mb-3">
        <i class="bi bi-cpu-fill"></i>
        <span>Stack & Arquitectura de Software</span>
      </div>
      <h2 class="text-3xl md:text-4xl font-extrabold font-['Rubik'] text-[var(--gris-claro)] m-0 tracking-tight">
        Arsenal Tecnológico & Métricas
      </h2>
      <p class="text-xs md:text-sm text-gray-400 mt-2 max-w-xl mx-auto leading-relaxed">
        Visualización interactiva de competencias técnicas, plataformas de despliegue y analíticas calculadas en tiempo real.
      </p>
    </div>

    <!-- Widget 1: KPIs y Métricas Rápidas -->
    <WidgetMetricsKpi 
      v-if="widgetsActivos.metricasKpi !== false"
      :proyectos="proyectos" 
      :experiencias="experiencia"
    />

    <!-- Gráficas de Rendimiento (Grid 2 columnas: Barras + Dona) -->
    <div 
      v-if="widgetsActivos.graficaBarras !== false || widgetsActivos.graficaDona !== false"
      class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch"
    >
      <div 
        v-if="widgetsActivos.graficaBarras !== false"
        :class="widgetsActivos.graficaDona !== false ? 'lg:col-span-2' : 'lg:col-span-3'"
      >
        <WidgetTechBars :proyectos="proyectos" />
      </div>

      <div 
        v-if="widgetsActivos.graficaDona !== false"
        :class="widgetsActivos.graficaBarras !== false ? 'lg:col-span-1' : 'lg:col-span-3'"
      >
        <WidgetPlatformDoughnut :proyectos="proyectos" />
      </div>
    </div>

    <!-- Widget 3: Dominios y Especialización Técnica -->
    <WidgetSkillDomains 
      v-if="widgetsActivos.dominiosHabilidad !== false"
    />

    <!-- Widget 4: Malla y Catálogo de Tecnologías Filtrables -->
    <WidgetStackGrid 
      v-if="widgetsActivos.mallaInteractiva !== false"
    />
  </section>
</template>
