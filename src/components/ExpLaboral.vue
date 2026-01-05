<script setup>
    import { logosTrabajos } from '../helpers/informacion';
    import useData from '../composables/useData'

    const {data} = useData();
</script>

<template>
    <h2 class="titulo-experiencia">Experiencia</h2>
    <div class="contenedor-experiencia" v-for="(item, index) in data" :key="index">
        <div class="contenedor-text">
            <div class="contenido-informacion">
                <div class="contenedor-card">
                    <div class="card" >
                        <img :src="logosTrabajos[item.Abreviatura]" :alt="item.Name" :class="item.Abreviatura">
                        <h3>{{ item.Name }}</h3>
                        <p v-html="item.Cargo"></p>
                    </div>
                </div>
                <div class="cont-descripcion">
                    <h2 class="descripcion">Descripcion</h2>
                    <p v-html="item.Descripcion"></p>
                </div>
            </div>
            <div class="contenido-informacion">
                <h2 class="competencia">Competencias</h2>
                <p class="competencias" v-html="item.competencias"></p>
            </div>
        </div>
    </div>
</template>

<style scoped>
    h2.titulo-experiencia{
        margin-top: 3rem;
    }
    h2.competencia, h2.descripcion {
        margin-bottom: 0;
    }
    .card img{
        width: 280px
    }
    @media (max-width: 791px){
        .contenedor-text p{
            padding: 1rem;
            font-size: .5rem;
            font-weight: 400;
            color: var(--verde-cian);
        }
        .card img{
            width: 150px;
        }
        .card p{
            font-size: .8rem;
            color: var(--gris-claro);
        }
    }
</style>
