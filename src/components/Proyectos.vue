<script setup>
  import { onMounted } from 'vue';

  import Boton from './Boton.vue';
  import Tecno from './Tecno.vue';

  import useData from '../composables/useData';
  import useAnchoViewport from '../composables/useAnchoViewport';
  import { logosProyectos, logoTecno, logoDespliegue } from '../helpers/informacion';
  import { abrirPage } from '../helpers/downloadFile';


  const { data, bajarData } = useData();
  const { ancho } = useAnchoViewport();


  onMounted(() => {
    bajarData("/data/Data_3.xlsx");
  });

  defineProps({
    page: {
      type: true,
      required: true
    }
  })

  const classMap = {
    roz: "roz",
    ecc: "ecc",
    crawler: "crawler",
    neo: "neo",
    planb: "plan",
    clima: "clima",
    block: "block",
    paralelo: "paralelo",
    adv: "adv",
  };


</script>

<template>
  <template v-if="data.length > 0">
    <h2>Proyectos</h2>
    <div class="grid">
      <div 
        class="panel contenido-informacion card flex-column-center contenido-width" 
        v-for="(item, idex) in data" :key="idex"
      >
        <div 
          class="fondo-cabecera-card"
          :class="classMap[item.Abreviatura] || 'fondo-default'", 
        >
          <div class="cabecera-card">
            <img 
              v-if="logoDespliegue[item.despliegue]"
              :src="logoDespliegue[item.despliegue].img" 
              alt="item.despliegue" 
              class="img-institucion"
              :class="{
                cuadrado: item.despliegue !== 'Netlify'
              }"
              @click="abrirPage(logoDespliegue[item.despliegue].url)"
            >
            <img 
              v-if="logosProyectos[item.Abreviatura]"
              :src="logosProyectos[item.Abreviatura].img" 
              :alt="item.Abreviatura"
              :class="{
              }"
              alt="item.Abreviatura"
            >
          </div>
        </div>
        <h2 v-html="item.Name"></h2>
        
        <Tecno 
          :logoTecno="logoTecno" 
          :page="page"
          :tecnologias="item.Tecnologias" 
          v-if="item.Tecnologias && item.Tecnologias.length"
        />

        <p v-html="item.Descripcion" class="texto-card"></p>
        
        <div
          class="flex-row-center"
          :class="{ ancho: ancho <= 400 }"
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
  .img-institucion{
    width: 40px;
    height: auto;
  }
  .flex-column-center {
    padding-top: 1rem;
    width: 90%;
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
    margin-left: 2.5rem;
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
  .cuadrado{
    border-radius: .5rem;
  }
  /* fondos cabecera */
  .roz, .crawler {
    background-size: cover;
    background-position: 0px -170px;
    background-repeat: no-repeat;
  }
  .ecc, .neo, .plan, .clima, 
  .block, .paralelo, .adv{
    background-size: cover;
    background-position: 0px -70px;
    background-repeat: no-repeat;
  }
  .roz {
    background-image: url('../assets/fondo/cabeceras/camino-de-ziko.webp');
  }
  .crawler{
    background-image: url('../assets/fondo/cabeceras/Conversor-Desktop.png');
  }
  .ecc {
    background-image: url('https://github.com/DaCazo15/Evaluacion-Cognitiva-ECC/blob/main/assets/img/Captura-Desarrollo.png?raw=true');
  }
  .neo{
    background-image: url('../assets/fondo/cabeceras/neosalud.png');
  }
  .plan{
    background-image: url('../assets/fondo/cabeceras/planb.png');
  }
  .clima{
    background-image: url('../assets/fondo/cabeceras/climadex.png');
  }
  .block{
    background-image: url('../assets/fondo/cabeceras/block.png');
  }
  .paralelo{
    background-image: url('../assets/fondo/cabeceras/image.png');
  }
  .adv{
    background-image: url('../assets/fondo/cabeceras/ayudante.png');
  }
  .fondo-default .cabecera-card{
    background-color: var(--gris-claro);
  }
  
  @media (max-width: 1231px) {
    .grid{
      grid-template-columns: repeat(1, 1fr);
    }
  }
  @media (max-width: 791px) {
    .texto-card{
      font-size: .8rem;
      margin: 1rem 1rem 0;
      padding: 1rem;
    }
    .roz, .crawler {
      background-position: 0px 0px;
    }
    .ecc, .neo, .plan, .clima, 
    .block, .paralelo, .adv{
      background-position: 0px 10px;
    }
  }
</style>
