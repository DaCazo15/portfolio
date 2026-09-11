<script setup>
import { onMounted } from 'vue';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

const TOUR_STORAGE_KEY = 'portfolio_tour_completado_v1';

const pasosTour = [
  {
    element: 'nav',
    popover: {
      title: '🧭 Navegación Fluida',
      description: 'Explora fácilmente las distintas secciones: Inicio, Experiencia, Contribuciones y Proyectos.',
      side: 'bottom',
      align: 'center',
      nextBtnText: 'Siguiente',
      prevBtnText: 'Anterior'
    }
  },
  {
    element: '.border',
    popover: {
      title: '👨‍💻 Perfil Profesional',
      description: 'Conoce mi trayectoria como Ingeniero de Sistemas y Desarrollador Full-Stack.',
      side: 'bottom',
      align: 'center',
      nextBtnText: 'Siguiente',
      prevBtnText: 'Anterior'
    }
  },
  {
    element: '.btn-cv',
    popover: {
      title: '📄 Currículum Vitae',
      description: 'Descarga mi CV actualizado en PDF con un solo clic.',
      side: 'top',
      align: 'center',
      nextBtnText: 'Siguiente',
      prevBtnText: 'Anterior'
    }
  },
  {
    element: 'section',
    popover: {
      title: '⭐ Proyectos Destacados',
      description: 'Descubre los desarrollos más representativos en este carrusel interactivo con acceso a repositorios y demos.',
      side: 'top',
      align: 'center',
      nextBtnText: 'Finalizar',
      prevBtnText: 'Anterior'
    }
  }
];

const iniciarTour = (forzar = false) => {
  // Comprobar si ya se vio el tour y no es forzado manualmente
  if (!forzar) {
    const yaVisto = localStorage.getItem(TOUR_STORAGE_KEY);
    if (yaVisto) return;
  }

  const driverObj = driver({
    showProgress: true,
    animate: true,
    allowClose: true,
    overlayColor: 'rgba(0, 11, 16, 0.85)',
    doneBtnText: '¡Entendido!',
    closeBtnText: 'Cerrar',
    nextBtnText: 'Siguiente',
    prevBtnText: 'Anterior',
    progressText: '{{current}} de {{total}}',
    steps: pasosTour,
    onDestroyed: () => {
      localStorage.setItem(TOUR_STORAGE_KEY, 'true');
    }
  });

  driverObj.drive();
};

onMounted(() => {
  // Pequeña espera para asegurar que el DOM y las fuentes estén renderizados
  setTimeout(() => {
    iniciarTour(false);
  }, 1200);
});

defineExpose({
  iniciarTour
});
</script>

<template>
  <!-- Botón flotante para reactivar el tour cuando el usuario lo desee -->
  <button 
    @click="iniciarTour(true)" 
    title="Iniciar Tour Guiado"
    aria-label="Ayuda y Tour Guiado"
    class="fixed bottom-5 right-5 z-30 w-11 h-11 rounded-full bg-[var(--gris-oscuro)] hover:bg-[var(--verde-cian)] text-[var(--gris-claro)] hover:text-white border border-gray-700 hover:border-[var(--verde-cian)] shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer group"
  >
    <i class="bi bi-question-lg text-lg font-bold group-hover:rotate-12 transition-transform"></i>
  </button>
</template>

<style>
/* Personalización de los popovers de Driver.js al tema oscuro del portafolio */
.driver-popover {
  background-color: rgb(24, 24, 24) !important;
  color: #e7e7e7 !important;
  border: 1px solid #008686 !important;
  border-radius: 1rem !important;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 134, 134, 0.2) !important;
  padding: 1.25rem !important;
  font-family: 'Outfit', sans-serif !important;
}

.driver-popover-title {
  font-family: 'Rubik', sans-serif !important;
  font-size: 1.1rem !important;
  font-weight: 700 !important;
  color: #008686 !important;
  margin-bottom: 0.5rem !important;
}

.driver-popover-description {
  font-size: 0.85rem !important;
  color: #d1d5db !important;
  line-height: 1.5 !important;
}

.driver-popover-footer button {
  border-radius: 0.5rem !important;
  font-size: 0.75rem !important;
  font-weight: 600 !important;
  padding: 0.4rem 0.8rem !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
}

.driver-popover-next-btn, .driver-popover-done-btn {
  background-color: #008686 !important;
  color: #ffffff !important;
  border: none !important;
  text-shadow: none !important;
}

.driver-popover-next-btn:hover, .driver-popover-done-btn:hover {
  background-color: #015f5f !important;
}

.driver-popover-prev-btn, .driver-popover-close-btn {
  background-color: #374151 !important;
  color: #e5e7eb !important;
  border: none !important;
  text-shadow: none !important;
}

.driver-popover-progress-text {
  color: #9ca3af !important;
  font-size: 0.75rem !important;
}
</style>
