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
    <div class="w-full max-w-5xl mx-auto px-4 py-8">
        <div class="text-center mb-6">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--verde-cian)]/15 text-[var(--verde-cian)] border border-[var(--verde-cian)]/30 text-xs font-semibold mb-2">
                <i class="bi bi-briefcase-fill"></i>
                <span>Trayectoria Profesional</span>
            </div>
            <h2 class="text-3xl md:text-4xl font-extrabold font-['Rubik'] text-[var(--gris-claro)] m-0">
                Experiencia Laboral
            </h2>
        </div>

        <div class="space-y-8">
            <div class="contenedor-experiencia card-experiencia-item w-full" v-for="(item, index) in data" :key="index">
                <div class="contenedor-text w-full">
                    <div class="flex-column-center contenido-informacion">
                        <div class="flex-row-center" :class="{ancho : ancho <= 1231}">
                            <div class="contenedor-card">
                                <div class="card" >
                                    <img :src="logosTrabajos[item.Abreviatura]" :alt="item.Name" :class="item.Abreviatura">
                                    <h3 class="nombre-empresa">{{ item.Name }}</h3>
                                    <p v-html="item.Cargo" class="cargo-texto"></p>
                                </div>
                            </div>
                            <div class="ml-5 cont-descripcion">
                                <h2 class="descripcion text-left flex items-center gap-2">
                                    Descripción del Rol
                                </h2>
                                <p v-html="item.Descripcion" class="leading-relaxed"></p>
                            </div>
                        </div>
                        <Tecno 
                            :logoTecno="logoTecno" 
                            :tecnologias="item.Tecnologias" 
                            v-if="item.Tecnologias && item.Tecnologias.length"
                        />
                    </div>

                    <div class="contenido-informacion" v-if="item.competencias">
                        <h2 class="competencia text-left flex items-center gap-2">
                            Competencias Desarrolladas
                        </h2>
                        <p class="competencias leading-relaxed" v-html="item.competencias"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    h2.competencia, h2.descripcion, h2.Tecnologias-titulo {
        margin-bottom: 0.5rem;
        font-size: 1.4rem;
        text-align: left;
    }
    .nombre-empresa {
        margin: 0.5rem 0 0 0;
        font-size: 1.5rem;
        color: var(--verde-cian);
    }
    .cargo-texto {
        font-size: 0.95rem;
        color: var(--gris-claro);
    }
    .card img{
        width: 240px;
        max-width: 100%;
        object-fit: contain;
        border-radius: 0.75rem;
    }

    @media (max-width: 791px){
        .contenedor-text p{
            font-weight: 300;
            font-size: 0.85rem;
        }
        .card img{
            width: 150px;
        }
        .card p{
            font-size: 0.9rem;
            color: var(--gris-claro);
        }
    }
</style>
