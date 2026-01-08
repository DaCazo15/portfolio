<script setup>
import { onMounted } from 'vue';

import Boton from './Boton.vue';
import Tecno from './Tecno.vue';

import useData from '../composables/useData';
import useAnchoViewport from '../composables/useAnchoViewport';
import { logosProyectos, logosInstituciones, logoTecno } from '../helpers/informacion';
import { abrirPage } from '../helpers/downloadFile';


const { data, bajarData } = useData();
const { ancho } = useAnchoViewport();

onMounted(() => {
  bajarData("/data/Data_2.xlsx");
});

defineProps({
  page: {
    type: true,
    required: true
  }
})

</script>

<template>
  <template v-if="data.length > 0">
    <h2>Contribuciones</h2>
    <div class="grid">
      <div 
        class="panel contenido-informacion card flex-column-center contenido-width" 
        v-for="(item, idex) in data" :key="idex"
      >
        <div class="cabecera-card">
          <img 
            v-if="logosInstituciones[item.Institucion]"
            :src="logosInstituciones[item.Institucion].img" 
            alt="item.Institucion" 
            class="img-institucion"
            :class="{
              hub: item.Abreviatura === 'HUB'
            }"
            @click="abrirPage(logosInstituciones[item.Institucion].url)"
            >
            <img 
            v-if="logosProyectos[item.Abreviatura]"
            :src="logosProyectos[item.Abreviatura].img" 
            alt="item.Abreviatura"
          >
        </div>
        <h2 v-html="item.Name"></h2>

        <div class="flex-column-center left">
          <h3 v-html="'Institución: ' + item.Institucion" ></h3>
          <h3 v-html="'Rol: ' + item.Rol" class="rol"></h3>
        </div>
        
        <p v-html="item.Descripcion" class="texto-card"></p>

        <Tecno 
          :logoTecno="logoTecno" 
          :page="page"
          :tecnologias="item.Tecnologias" 
          v-if="item.Tecnologias && item.Tecnologias.length"
        />
        <div
          class="flex-row-center"
          :class="{ ancho: ancho <= 1231 }"
        >
          <div
            v-for="(value, key) in logosProyectos[item.Abreviatura]"
            :key="key"
          >
            <Boton 
              v-if="key !== 'img'"
              @click="abrirPage(value[1])"
              class="btn-card"
              :class="{ 
                pagina: value[0][4] === 'P', 
                repositorio: value[0][4] === 'R' 
              }"
            >
              {{ value[0] }}
            </Boton>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<style scoped>
  .flex-column-center{
    padding-top: 1rem;
  }  
  .grid{
    display: grid;
    grid-template-columns: repeat(2, 2fr);
    width: 100%;
    align-items: start;
    justify-items: center;
    padding-top: 2rem;
  }
  .flex-column-center .left{
    align-items: flex-start;
    width: 100%;
  }  
  .flex-column-center .rol{
    margin-top: 1rem;
  } 
  .flex-column-center h3{
    color: var(--gris-claro);
    margin: 0;
    margin: .5rem 0 0 2.5rem;
    font-weight: 300;
    font-size: 1.5rem
  }
  .texto-card{
    margin: 1rem 2rem 0;
    padding: 2rem 3rem;
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.5;
    text-align: left;
    color: var(--gris-claro);
    border-left: solid 2px var(--gris-claro);
    background-color: var(--gris-oscuro);
    text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
    border-radius: 0 1rem 1rem 0;
  }
  .hub{
    border-radius: .5rem;
  }
  @media (max-width: 1231px) {
    .grid{
      grid-template-columns: repeat(1, 1fr);
    }
  }
  @media (max-width: 791px) {
    .flex-column-center h3{
      margin: 1rem 0 0 1.2rem;
      font-size: 1rem;
    }
    .card{
      width: 90%;
    }
    .texto-card{
      font-size: .8rem;
      margin: 1rem 1rem 0;
      padding: 1rem;
    }
  }
</style>
