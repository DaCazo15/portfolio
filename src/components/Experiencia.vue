<script setup>
    import ExpLaboral from './ExpLaboral.vue';

    import { listGif, infAbout } from '../helpers/informacion';

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
                    <p v-for="(paragraph, index) in infAbout" :key="index">{{ paragraph }}</p>
                </div>
            </div>           
        </div>
        <ExpLaboral/>
        
    </div>
</template>

<style scoped>
    
</style>
