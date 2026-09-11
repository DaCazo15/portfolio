<script setup>
import { ref } from 'vue';
import { animate } from 'animejs';
import Boton from './Boton.vue';

const emit = defineEmits(['setPage']);
const menuAbierto = ref(false);

const props = defineProps({
  esMovil: {
    type: Boolean,
    required: true
  },
  seccionesActivas: {
    type: Object,
    default: () => ({ about: true, experiencia: true, stack: true, contribuciones: true, proyectos: true })
  }
});

const isotipoUrl = "https://i.postimg.cc/FKL1JvqG/isotipo-page.png";

const menuToggle = (tipo) => {
  if (!menuAbierto.value && tipo === 'menu') {
    menuAbierto.value = true;
  }
  if (menuAbierto.value && tipo !== 'menu') {
    menuAbierto.value = false;
  }
};

// Micro-interacción Anime.js para el Isotipo
const handleIsotipoHover = (event) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  animate(event.currentTarget, {
    scale: 1.09,
    filter: 'drop-shadow(0 0 12px rgba(0, 134, 134, 0.85))',
    duration: 250,
    ease: 'outBack'
  });
};

const handleIsotipoLeave = (event) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  animate(event.currentTarget, {
    scale: 1,
    filter: 'drop-shadow(0 0 0px rgba(0, 134, 134, 0))',
    duration: 250,
    ease: 'outQuad'
  });
};
</script>

<template>
  <nav>
    <div class="contenedor-nav">
      <!-- Vista Escritorio: Enlaces Izquierda, Isotipo Centrado, Enlaces Derecha -->
      <template v-if="!props.esMovil">
        <!-- Enlaces Izquierda -->
        <div class="nav-links nav-left">
          <Boton
            v-if="props.seccionesActivas?.about !== false"
            @click="emit('setPage', 'inicio')"
            class="btn-nav"
          >
            Inicio
          </Boton>
          <Boton
            v-if="props.seccionesActivas?.experiencia !== false"
            @click="emit('setPage', 'experiencia')"
            class="btn-nav"
          >
            Experiencia
          </Boton>
          <Boton
            v-if="props.seccionesActivas?.stack !== false"
            @click="emit('setPage', 'stack')"
            class="btn-nav"
          >
            Stack & Datos
          </Boton>
        </div>

        <!-- Isotipo Central -->
        <button 
          @click="emit('setPage', 'inicio')"
          @mouseenter="handleIsotipoHover"
          @mouseleave="handleIsotipoLeave"
          aria-label="Ir a Inicio"
          class="isotipo-btn"
        >
          <img 
            :src="isotipoUrl" 
            alt="Isotipo Daniel Cazorla" 
            class="isotipo-img"
          />
        </button>

        <!-- Enlaces Derecha -->
        <div class="nav-links nav-right">
          <Boton
            v-if="props.seccionesActivas?.contribuciones !== false"
            @click="emit('setPage', 'contribuciones')"
            class="btn-nav"
          >
            Contribuciones
          </Boton>
          <Boton
            v-if="props.seccionesActivas?.proyectos !== false"
            @click="emit('setPage', 'proyectos')"
            class="btn-nav"
          >
            Proyectos
          </Boton>
        </div>
      </template>

      <!-- Vista Móvil: Nombre a la izquierda, Isotipo Central, Menú a la derecha -->
      <template v-else>
        <p class="nombre">Dacazo15</p>

        <!-- Isotipo Móvil Centrado -->
        <button 
          @click="emit('setPage', 'inicio')"
          aria-label="Ir a Inicio"
          class="isotipo-btn-movil"
        >
          <img 
            :src="isotipoUrl" 
            alt="Isotipo Daniel Cazorla" 
            class="isotipo-img-movil"
          />
        </button>

        <button 
          class="menu-btn-movil"
          @click="menuToggle('menu')"
          aria-label="Abrir Menú"
        >
          <i class="bi bi-list text-2xl text-[var(--gris-claro)]"></i>
        </button>
      </template>
    </div>

    <!-- Menú Inferior / Drawer Móvil -->
    <div class="contenedor-btn-inferior" v-if="menuAbierto && props.esMovil">
      <Boton
        v-if="props.seccionesActivas?.about !== false"
        @click="[emit('setPage', 'inicio'), menuToggle('inicio')]"
        class="btn-inferior"
      >
        <img src="https://i.postimg.cc/L6WxF0F4/home.png" alt="home" width="36">
      </Boton>
      <Boton
        v-if="props.seccionesActivas?.experiencia !== false"
        @click="[emit('setPage', 'experiencia'), menuToggle('experiencia')]"
        class="btn-inferior"
      >
        <img src="https://i.postimg.cc/TYstvHvP/clock.png" alt="experiencia" width="36">
      </Boton>
      <Boton
        v-if="props.seccionesActivas?.stack !== false"
        @click="[emit('setPage', 'stack'), menuToggle('stack')]"
        class="btn-inferior"
      >
        <i class="bi bi-layers-fill text-2xl text-[var(--verde-cian)]"></i>
      </Boton>
      <Boton
        v-if="props.seccionesActivas?.contribuciones !== false"
        @click="[emit('setPage', 'contribuciones'), menuToggle('contribuciones')]"
        class="btn-inferior"
      >
        <img src="https://i.postimg.cc/VLhKPHPv/puzzle.png" alt="contribuciones" width="36">
      </Boton>
      <Boton
        v-if="props.seccionesActivas?.proyectos !== false"
        @click="[emit('setPage', 'proyectos'), menuToggle('proyectos')]"
        class="btn-inferior"
      >
        <img src="https://i.postimg.cc/Wby5cfc1/startup.png" alt="proyectos" width="36">
      </Boton>
    </div>
  </nav>
</template>

<style scoped>
  .contenedor-nav {
    display: flex;
    position: fixed;
    justify-content: space-between;
    align-items: center;
    top: 0.5rem;
    right: 0.75rem;
    left: 0.75rem;
    z-index: 1000;
    background-color: rgba(var(--gris-oscuroRGB), 0.9);
    border: 1px solid rgba(0, 134, 134, 0.25);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    border-radius: 1.25rem;
    padding: 0.5rem 1.5rem;
    backdrop-blur: 10px;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex: 1;
  }

  .nav-left {
    justify-content: flex-end;
    padding-right: 1.5rem;
  }

  .nav-right {
    justify-content: flex-start;
    padding-left: 1.5rem;
  }

  .isotipo-btn {
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.25s ease;
    outline: none;
  }

  .isotipo-img {
    height: 44px;
    width: 44px;
    object-fit: contain;
  }

  .isotipo-btn-movil {
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .isotipo-img-movil {
    height: 34px;
    width: 34px;
    object-fit: contain;
  }

  .nombre {
    color: var(--gris-claro);
    font-family: var(--font-titulo);
    font-size: 1.3rem;
    font-weight: 700;
    letter-spacing: 0.05rem;
    margin: 0;
  }

  .menu-btn-movil {
    background: rgba(var(--gris-oscuroRGB), 0.7);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.75rem;
    padding: 0.35rem 0.6rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s ease;
  }

  .menu-btn-movil:hover {
    background: var(--verde-cian);
  }

  .contenedor-btn-inferior {
    position: fixed;
    bottom: 1.25rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 0.6rem;
    background: rgba(var(--gris-oscuroRGB), 0.95);
    border: 1px solid var(--verde-cian);
    border-radius: 1.5rem;
    padding: 0.5rem 0.8rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
    z-index: 1000;
    backdrop-blur: 10px;
  }

  .btn-inferior {
    padding: 0.4rem 0.6rem;
    border-radius: 0.75rem;
    height: auto;
  }

  @media (max-width: 790px) {
    .contenedor-nav {
      padding: 0.4rem 1rem;
    }
  }
</style>
