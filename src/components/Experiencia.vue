<script setup>
    import Boton from './Boton.vue';
    import Tecnologias from './Tecnologias.vue';
    import ExpLaboral from './ExpLaboral.vue';

    import { listGif, infAbout, tecnologias, logosTrabajos } from '../helpers/informacion';

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
        <ExpLaboral/>
        
    </div>
</template>

<style scoped>
    html, body {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
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
    .btn {
        padding: 0.5rem;
        margin: 0 0.5rem;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.365);
        background-color: transparent;
        transition: all 0.3s ease-in-out;
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
</style>
