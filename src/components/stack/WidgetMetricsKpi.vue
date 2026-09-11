<script setup>
import { computed } from 'vue';

const props = defineProps({
  proyectos: {
    type: Array,
    default: () => []
  },
  experiencias: {
    type: Array,
    default: () => []
  }
});

// Cálculo de métricas dinámicas
const totalProyectos = computed(() => props.proyectos.length);

const totalTecnologias = computed(() => {
  const techSet = new Set();
  props.proyectos.forEach((p) => {
    (p.tecnologias || p.Tecnologias || []).forEach((t) => {
      if (t) techSet.add(t.trim().toUpperCase());
    });
  });
  props.experiencias.forEach((e) => {
    (e.tecnologias || e.Tecnologias || []).forEach((t) => {
      if (t) techSet.add(t.trim().toUpperCase());
    });
  });
  return techSet.size || 18;
});

const totalDespliegues = computed(() => {
  const despSet = new Set();
  props.proyectos.forEach((p) => {
    if (p.despliegue && p.despliegue !== 'null') {
      despSet.add(p.despliegue);
    }
  });
  return despSet.size || 5;
});

const totalDestacados = computed(() => {
  return props.proyectos.filter((p) => p.destacado).length || 4;
});

const kpis = computed(() => [
  {
    titulo: 'Proyectos Construidos',
    valor: totalProyectos.value,
    icono: 'bi-code-slash',
    subtexto: 'Aplicaciones & Sistemas'
  },
  {
    titulo: 'Tecnologías del Stack',
    valor: `${totalTecnologias.value}+`,
    icono: 'bi-layers-fill',
    subtexto: 'Herramientas y Frameworks'
  },
  {
    titulo: 'Plataformas de Despliegue',
    valor: totalDespliegues.value,
    icono: 'bi-cloud-check-fill',
    subtexto: 'Cloud, Web, Desktop & IoT'
  },
  {
    titulo: 'Soluciones Destacadas',
    valor: totalDestacados.value,
    icono: 'bi-stars',
    subtexto: 'Producción & Open-Source'
  }
]);
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
    <div 
      v-for="(kpi, idx) in kpis" 
      :key="idx"
      class="p-4 md:p-5 rounded-2xl bg-[rgba(var(--gris-oscuroRGB),0.65)] border border-gray-800 hover:border-[var(--verde-cian)]/50 backdrop-blur-md transition-all duration-300 shadow-lg group flex flex-col justify-between"
    >
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs font-medium text-gray-400 font-['Outfit']">{{ kpi.titulo }}</span>
        <div class="w-8 h-8 rounded-lg bg-[var(--fondo-negro)] border border-gray-700/60 flex items-center justify-center text-[var(--verde-cian)] group-hover:scale-110 group-hover:text-cyan-300 transition-all">
          <i :class="['bi', kpi.icono, 'text-sm']"></i>
        </div>
      </div>
      
      <div class="text-left mt-2">
        <div class="text-2xl md:text-3xl font-extrabold font-['Outfit'] text-[var(--gris-claro)] tracking-tight group-hover:text-[var(--verde-cian)] transition-colors">
          {{ kpi.valor }}
        </div>
        <p class="text-[11px] text-gray-400 m-0 mt-1 truncate">
          {{ kpi.subtexto }}
        </p>
      </div>
    </div>
  </div>
</template>
