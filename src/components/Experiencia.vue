<script setup>
    import Boton from './Boton.vue';
    import Tecnologias from './Tecnologias.vue';
    import ExpLaboral from './ExpLaboral.vue';

    import { listGif, infAbout, tecnologias, logosTrabajos } from '../helpers/informacion';

</script>

<template>
    <div class="flex-column-center">
        <div class="panel contenido">
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
            <Boton class="btn-tecnologia" v-for="value in tecnologias">
                <img :src="value.logo" :alt="value.nombre" width="30px">
            </Boton>
        </Tecnologias> -->
        <ExpLaboral/>
        
    </div>
</template>

<style scoped>
    
</style>
