<script setup>
import { computed } from 'vue';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js';
import { Bar } from 'vue-chartjs';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps({
  proyectos: {
    type: Array,
    default: () => []
  }
});

const techData = computed(() => {
  if (!props.proyectos || !props.proyectos.length) {
    return { labels: [], datasets: [] };
  }

  const conteo = {};
  props.proyectos.forEach((p) => {
    const list = p.tecnologias || p.Tecnologias || [];
    list.forEach((t) => {
      const clean = t.trim().toUpperCase();
      if (clean) {
        conteo[clean] = (conteo[clean] || 0) + 1;
      }
    });
  });

  const sorted = Object.entries(conteo)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  return {
    labels: sorted.map(([tech]) => tech),
    datasets: [
      {
        label: 'Proyectos que la integran',
        data: sorted.map(([, count]) => count),
        backgroundColor: 'rgba(0, 134, 134, 0.75)',
        hoverBackgroundColor: 'rgba(0, 190, 190, 0.95)',
        borderColor: '#008686',
        borderWidth: 1.5,
        borderRadius: 8
      }
    ]
  };
});

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: 'rgba(0, 11, 16, 0.95)',
      titleColor: '#e7e7e7',
      bodyColor: '#008686',
      borderColor: '#008686',
      borderWidth: 1,
      padding: 10,
      boxPadding: 4
    }
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.05)'
      },
      ticks: {
        color: '#9ca3af',
        font: {
          family: 'Outfit, sans-serif',
          size: 11
        }
      }
    },
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(255, 255, 255, 0.05)'
      },
      ticks: {
        color: '#9ca3af',
        stepSize: 1,
        font: {
          family: 'Outfit, sans-serif',
          size: 11
        }
      }
    }
  }
};
</script>

<template>
  <div class="p-6 rounded-2xl bg-[rgba(var(--gris-oscuroRGB),0.65)] border border-gray-800 hover:border-[var(--verde-cian)]/40 backdrop-blur-md shadow-xl flex flex-col justify-between transition-all duration-300">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h3 class="text-sm md:text-base font-bold font-['Outfit'] text-[var(--gris-claro)] flex items-center gap-2 m-0 text-left">
          <i class="bi bi-bar-chart-fill text-[var(--verde-cian)]"></i>
          Frecuencia de Tecnologías
        </h3>
        <p class="text-xs text-gray-400 mt-0.5 text-left">Top 8 tecnologías más utilizadas en proyectos</p>
      </div>
      <span class="text-[11px] px-2.5 py-1 rounded-full bg-[var(--fondo-negro)] border border-gray-700 text-gray-300">
        Chart.js
      </span>
    </div>

    <div class="h-64 relative w-full mt-2">
      <Bar 
        v-if="techData.labels.length" 
        :data="techData" 
        :options="barOptions" 
      />
      <div v-else class="h-full flex items-center justify-center text-gray-500 text-xs">
        Cargando datos de tecnologías...
      </div>
    </div>
  </div>
</template>
