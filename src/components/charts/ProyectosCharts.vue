<script setup>
import { computed } from 'vue';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';
import { Bar, Doughnut } from 'vue-chartjs';
import { useFirestoreCollection } from '../../composables/useFirestoreCollection';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement
);

const { data: proyectos, loading } = useFirestoreCollection('proyectos', {
  autoFetch: true,
  realtime: true
});

// 1. Cálculo de frecuencia de tecnologías desde Firestore
const techData = computed(() => {
  if (!proyectos.value || !proyectos.value.length) {
    return { labels: [], datasets: [] };
  }

  const conteo = {};
  proyectos.value.forEach((p) => {
    const list = p.tecnologias || p.Tecnologias || [];
    list.forEach((t) => {
      const clean = t.trim().toUpperCase();
      if (clean) {
        conteo[clean] = (conteo[clean] || 0) + 1;
      }
    });
  });

  // Ordenar por frecuencia descendente y tomar las top 8
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

// 2. Cálculo de distribución de despliegues
const despliegueData = computed(() => {
  if (!proyectos.value || !proyectos.value.length) {
    return { labels: [], datasets: [] };
  }

  const conteo = {};
  proyectos.value.forEach((p) => {
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
          '#242424',
          '#4a5568'
        ],
        borderColor: 'rgba(0, 11, 16, 0.8)',
        borderWidth: 2
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
  <div class="w-full max-w-5xl mx-auto my-12 px-4">
    <!-- Encabezado -->
    <div class="text-center mb-8">
      <div class="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-[var(--verde-cian)]/10 text-[var(--verde-cian)] border border-[var(--verde-cian)]/30 text-xs font-semibold mb-2">
        <i class="bi bi-graph-up-arrow"></i>
        <span>Métricas en Tiempo Real</span>
      </div>
      <h2 class="text-2xl md:text-3xl font-bold font-['Rubik'] text-[var(--gris-claro)] m-0">
        Estadísticas del Stack y Proyectos
      </h2>
      <p class="text-xs md:text-sm text-gray-400 mt-1 max-w-lg mx-auto">
        Datos calculados dinámicamente desde Firestore según los proyectos cargados
      </p>
    </div>

    <!-- Grid de Gráficas -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
      <!-- Gráfica de Barras: Top Tecnologías (Ocupa 2 columnas en desktop) -->
      <div class="lg:col-span-2 p-6 rounded-2xl bg-[rgba(var(--gris-oscuroRGB),0.6)] border border-gray-800 backdrop-blur-md shadow-xl flex flex-col justify-between">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm md:text-base font-bold text-[var(--gris-claro)] flex items-center gap-2 m-0 text-left">
            <i class="bi bi-bar-chart-fill text-[var(--verde-cian)]"></i>
            Frecuencia de Tecnologías
          </h3>
          <span class="text-[11px] text-gray-400">Top 8 más utilizadas</span>
        </div>

        <div class="h-64 relative w-full">
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

      <!-- Gráfica de Dona: Plataformas de Despliegue -->
      <div class="p-6 rounded-2xl bg-[rgba(var(--gris-oscuroRGB),0.6)] border border-gray-800 backdrop-blur-md shadow-xl flex flex-col justify-between">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm md:text-base font-bold text-[var(--gris-claro)] flex items-center gap-2 m-0 text-left">
            <i class="bi bi-pie-chart-fill text-[var(--verde-cian)]"></i>
            Despliegues
          </h3>
          <span class="text-[11px] text-gray-400">Plataformas</span>
        </div>

        <div class="h-64 relative w-full flex items-center justify-center">
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
    </div>
  </div>
</template>
