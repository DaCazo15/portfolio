<script setup>
import { computed } from 'vue';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Doughnut } from 'vue-chartjs';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const props = defineProps({
  proyectos: {
    type: Array,
    default: () => []
  }
});

const despliegueData = computed(() => {
  if (!props.proyectos || !props.proyectos.length) {
    return { labels: [], datasets: [] };
  }

  const conteo = {};
  props.proyectos.forEach((p) => {
    const desp = p.despliegue && p.despliegue !== 'null' ? p.despliegue : 'Local / CLI';
    conteo[desp] = (conteo[desp] || 0) + 1;
  });

  const labels = Object.keys(conteo);
  const data = Object.values(conteo);

  return {
    labels,
    datasets: [
      {
        data,
        backgroundColor: [
          '#008686',
          '#015f5f',
          '#00b4b4',
          '#10b981',
          '#3b82f6',
          '#6366f1',
          '#242424'
        ],
        borderColor: 'rgba(0, 11, 16, 0.8)',
        borderWidth: 2
      }
    ]
  };
});

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#e7e7e7',
        font: {
          family: 'Outfit, sans-serif',
          size: 11
        },
        padding: 14
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 11, 16, 0.95)',
      borderColor: '#008686',
      borderWidth: 1,
      padding: 10
    }
  }
};
</script>

<template>
  <div class="p-6 rounded-2xl bg-[rgba(var(--gris-oscuroRGB),0.65)] border border-gray-800 hover:border-[var(--verde-cian)]/40 backdrop-blur-md shadow-xl flex flex-col justify-between transition-all duration-300">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h3 class="text-sm md:text-base font-bold font-['Outfit'] text-[var(--gris-claro)] flex items-center gap-2 m-0 text-left">
          <i class="bi bi-pie-chart-fill text-[var(--verde-cian)]"></i>
          Plataformas de Despliegue
        </h3>
        <p class="text-xs text-gray-400 mt-0.5 text-left">Distribución por entorno y hosting</p>
      </div>
      <span class="text-[11px] px-2.5 py-1 rounded-full bg-[var(--fondo-negro)] border border-gray-700 text-gray-300">
        Hosting
      </span>
    </div>

    <div class="h-64 relative w-full flex items-center justify-center mt-2">
      <Doughnut 
        v-if="despliegueData.labels.length" 
        :data="despliegueData" 
        :options="doughnutOptions" 
      />
      <div v-else class="h-full flex items-center justify-center text-gray-500 text-xs">
        Cargando datos de despliegues...
      </div>
    </div>
  </div>
</template>
