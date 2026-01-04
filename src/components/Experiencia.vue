<script setup>
    import Boton from './Boton.vue';
    import Tecnologias from './Tecnologias.vue';

    import { listGif, infAbout, tecnologias, logosTrabajos } from '../helpers/informacion';
    import useData from '../composables/useData'

    const {data} = useData();

</script>

<template>
    <div class="contenedor-padre">
        <div class="contenido">
            <div class="contenido gif">
                <img 
                :src="listGif.circle" 
                alt="gif about me" 
                width="100%" 
                height="100%" 
                />
            </div>
            <div class="contenido info">
                <div class="about">
                    <h2>Acerca de mi</h2>
                    <p v-html="infAbout"></p>
                </div>
            </div>           
        </div>
        <!-- <Tecnologias>
            <Boton class="btn" v-for="value in tecnologias">
                <img :src="value.logo" :alt="value.nombre" width="30px">
            </Boton>
        </Tecnologias> -->
        <h2 class="titulo-experiencia">Experiencia</h2>
        <div class="contenedor-experiencia" v-for="(item, index) in data" :key="index">
            <div class="contenedor-text">
                <div class="contenido-informacion">
                    <div class="contenedor-card">
                        <div class="card" >
                            <img :src="logosTrabajos[item.Abreviatura]" :alt="item.Name" width="280px" :class="item.Abreviatura">
                            <h3>{{ item.Name }}</h3>
                            <p v-html="item.Cargo"></p>
                        </div>
                    </div>
                    <div class="cont-descripcion">
                        <h2>Descripcion</h2>
                        <p v-html="item.Descripcion"></p>
                    </div>
                </div>
                <div class="contenido-informacion">
                    <h2>Competencias</h2>
                    <p>{{ item.competencias }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    html, body {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    .titulo-experiencia{
        margin-top: 2rem;
    }
    .contenedor-padre {
        /* background-image: url('../assets/gifs/robotAmarillo.gif');
        background-size: cover;
        background-position: center; */
        
        min-height: 100vh;
        width: 100%;

        padding-top: 6rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }
    .contenido {
        padding: 0;
        margin: 0;
        border: none;
    }
    .btn {
        padding: 0.5rem;
        margin: 0 0.5rem;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.365);
        background-color: transparent;
        transition: all 0.3s ease-in-out;
    }
    .contenedor-experiencia{
        width: 90%;
        max-width: 1200px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 1rem;
        margin-top: 2rem;
    }
    .btn:hover {
        background-color: var(--gris-oscuro);
        box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.5);
        transform: scale(1.1);
    }
    
    .btn img {
        width: 30px;
        height: auto;
    }
    .btn img[alt="javascript"] {
        border-radius: .5rem;
    }

    .card {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 1rem;

        background-color: rgba(var(--gris-oscuroRGB), 0.8);
        padding: 1rem;
        color: var(--gris-claro);
        border-radius: 8px;
    }
    .card p{
        font-family: var(--font-titulo);
        width: auto;
        line-height: 1.2;
        color:  #767676;
        font-size: 1rem;
        font-weight: 500;
        margin-top: -.2rem;
        text-align: center;
    }
    .contenedor-text{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin: 1rem 0 0 0;
    }
    .contenedor-text p {
        text-wrap: balance;
        line-height: 1.5;
        font-family: var(--font-titulo);
        font-size: 1.2rem;
        font-weight: 400;
        color: var(--gris-claro);
        width: 100%;
    }
    .cont-descripcion p{
        padding-left: 1.5rem;
    }
    .STB{
        border-radius: 50%;
        margin-bottom: .8rem;
        width: 270px;
        
    }
</style>
