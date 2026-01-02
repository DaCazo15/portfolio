<script setup>
  import Nav from './components/Nav.vue';
  import About from './components/About.vue';
  import usePage from './composables/usePage';
  import useAnchoViewport from './composables/useAnchoViewport';

  const { page, setPage } = usePage();
  const { ancho } = useAnchoViewport();

</script>

<template>
  <Nav 
    @setPage="setPage"
    :ancho="ancho"
  />
  <div 
    v-if="page.inicio" 
    class="inicio" 
    :class="{ mobile : ancho <= 790 }"
  >
    <About />
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
  .inicio.mobile {
    padding-top: 0;
  }
</style>
