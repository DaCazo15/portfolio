<script setup>
import Boton from './Boton.vue'

defineProps({
  logoTecno: {
    type: Object,
    required: true
  },
  tecnologias: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="panel flex-row-center contenedor-tecnologias"> 
    <template v-for="tech in tecnologias" :key="tech">
      <Boton v-if="logoTecno[tech]">
        <img 
          :src="logoTecno[tech].logo" 
          :alt="logoTecno[tech].nombre" 
          :class="{
            spike : logoTecno[tech].nombre === 'legospike',
            micro : logoTecno[tech].nombre === 'microbit',
            tinkercad : logoTecno[tech].nombre === 'tinkercad',
            }"
          width="30px" 
        />
      </Boton>
    </template>
  </div>
</template>


<style scoped>
    .contenedor-tecnologias {
        gap: .5rem;
        flex-wrap: wrap;
        padding: 0.8rem;
        width: 100%;
    }
    .spike, .micro, .tinkercad{
        border-radius: .5rem;
    }
</style>
