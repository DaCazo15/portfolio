<script setup>
  import { computed } from 'vue';
  import Nav from './components/Nav.vue';
  import About from './components/About.vue';
  import Experiencia from './components/Experiencia.vue';
  import usePage from './composables/usePage';
  import useAnchoViewport from './composables/useAnchoViewport';

  const { page, setPage } = usePage();
  const { ancho } = useAnchoViewport();

  const esMovil = computed(() => ancho.value <= 790);

</script>

<template>
  <Nav @setPage="setPage" :esMovil="esMovil"/>
  <div 
    v-if="page.inicio" 
    class="inicio" 
    :class="{ mobile : esMovil.value }"
  >
    <About :esMovil="esMovil"/>
 />
  </div>
  <div class="inicio experiencia" v-if="page.experiencia">
    <Experiencia />
  </div>
</template>

<style scoped>
  .inicio {
    padding-top: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--gris-medio);
    box-sizing: border-box; /* incluye el padding en el cálculo de altura */
    overflow: hidden; /* evita que se muestre el scrollbar si algo se sale */
  }
  .inicio.experiencia {
    padding-top: 0;
  }
  .inicio.mobile {
    padding-top: 0;
  }
</style>
