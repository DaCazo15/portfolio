<script setup>
import { onMounted } from 'vue';

import Boton from './Boton.vue';

import useData from '../composables/useData';
import useAnchoViewport from '../composables/useAnchoViewport';
import { logosProyectos, logosInstituciones } from '../helpers/informacion';
import { abrirPage } from '../helpers/downloadFile';


const { data, bajarData } = useData();
const { ancho } = useAnchoViewport();

onMounted(() => {
  bajarData("/data/Data_2.xlsx");
});

</script>

<template>
  <template v-if="data.length > 0">
    <div class="flex-column-center">
      <h2>Contribuciones</h2>
      <div class="flex-column-center contenido-width">
        <div 
          class="panel contenido-informacion card" 
          v-for="(item, idex) in data" :key="idex"
        >
          <div class="cabecera-card">
            <img 
              :src="logosInstituciones[item.Institucion].img" 
              alt="item.Institucion" 
              class="img-institucion"
              @click="abrirPage(logosInstituciones[item.Institucion].url)"
            >
            <img 
              :src="logosProyectos[item.Abreviatura].img" 
              alt="item.Abreviatura"
            >
          </div>
          <h2 v-html="item.Name"></h2>
          <h3 v-html="item.Institucion"></h3>
          
          <p v-html="item.Descripcion" class="texto-card"></p>

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
    </div>
  </template>
</template>

<style scoped>
  .flex-column-center{
    padding-top: 1rem;
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
  @media (max-width: 791px) {
    .texto-card{
      font-size: .8rem;
      margin: 1rem 1rem 0;
      padding: 1rem;
    }
  }
</style>
