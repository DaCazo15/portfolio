<script setup>
  import Boton from './Boton.vue'
  import { ref } from 'vue'

  import { abrirPage } from '../helpers/downloadFile' 
  import { logoTecno } from '../helpers/informacion'

  const props = defineProps({
    logoTecno: {
      type: Object,
      required: true
    },
    tecnologias: {
      type: Array,
      required: true
    },
    page: {
      type: Boolean,
      required: true
    }
  })

  const tecnoName = ref([
    'legospike','microbit','tinkercad',
    'JavaScript','gemini','tm', 'beautifulsoup'
  ])

  const tecnoNameBlack = ref([
    'unity','pyserial',
  ])

</script>

<template>
  <div 
    class="panel flex-row-center contenedor-tecnologias"
    :class="{
      contribuciones: page === true
    }"
  > 
    <template v-for="tech in props.tecnologias" :key="tech">
      <Boton 
        v-if="logoTecno[tech]"
        @click="abrirPage(logoTecno[tech].page)"
      >
        <img 
          :src="logoTecno[tech].logo" 
          :alt="logoTecno[tech].nombre" 
          :class="{
            cuadrado: tecnoName.includes(logoTecno[tech].nombre),
            black: tecnoNameBlack.includes(logoTecno[tech].nombre)
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
  .contenedor-tecnologias.contribuciones{
    width: 94%;
  }
  .cuadrado{
    border-radius: .5rem;
  }
  .black{
    filter: invert(1);
  }
  @media (max-width: 386px) {
    .contenedor-tecnologias {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: .5rem;
      width: 100%;
      align-items: center;
    }
  }
</style>
