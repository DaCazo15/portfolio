<script setup>
    import { watch, nextTick, onUnmounted } from 'vue';
    import gsap from 'gsap';
    import Tecno from './Tecno.vue';
    import { logosTrabajos, logoTecno } from '../helpers/informacion';

    import { useFirestoreCollection } from '../composables/useFirestoreCollection';
    import useAnchoViewport from '../composables/useAnchoViewport';

    const { ancho } = useAnchoViewport();
    const { data, loading, error } = useFirestoreCollection('experiencia', { realtime: true });

    let animacionContext = null;

    watch(data, () => {
        nextTick(() => {
            const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (reduceMotion) return;

            if (animacionContext) animacionContext.revert();
            animacionContext = gsap.context(() => {
                gsap.from('.card-experiencia-item', {
                    opacity: 0,
                    y: 30,
                    stagger: 0.12,
                    duration: 0.6,
                    ease: 'power2.out',
                    clearProps: 'all'
                });
            });
        });
    }, { immediate: true });

    onUnmounted(() => {
        if (animacionContext) animacionContext.revert();
    });

</script>

<template>
    <h2 class="titulo-experiencia">Experiencia</h2>
    <div class="contenedor-experiencia card-experiencia-item" v-for="(item, index) in data" :key="index">
        <div class="contenedor-text">
            <div class="flex-column-center contenido-informacion">
                <div class="flex-row-center" :class="{ancho : ancho <= 1231}">
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
                <Tecno 
                    :logoTecno="logoTecno" 
                    :tecnologias="item.Tecnologias" 
                    v-if="item.Tecnologias && item.Tecnologias.length"
                />
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
    h2.competencia, h2.descripcion, h2.Tecnologias-titulo {
        margin-bottom: 0;
    }
    .card img{
        width: 280px
    }

    @media (max-width: 791px){
        .contenedor-text p{
            font-weight: 300;
            font-size: 0.8rem;
        }
        .card img{
            width: 150px;
        }
        .card p{
            font-size: 1rem;
            color: var(--gris-claro);
        }
    }
</style>
