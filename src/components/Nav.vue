<script setup>
    import { computed, ref } from 'vue';
    import Boton from './Boton.vue';

    const emit = defineEmits(['setPage']);
    const menuAbierto = ref(false);

    const props = defineProps({
        esMovil: {
            type: Boolean,
            required: true
        }
    });

    const menuToggle = (tipo) => {
        if (!menuAbierto.value && tipo == 'menu') {
            menuAbierto.value = true; // solo abre si está cerrado
        }
        if (menuAbierto.value && tipo != 'menu') {
            menuAbierto.value = false; // solo cierra si está abierto
        }
    };
</script>

<template>
    <nav>
        <div class="contenedor-nav">
            <p class="nombre">Dacazo15</p>
            <div class="contenedor-btn" v-if="!props.esMovil">
                <Boton
                    @click="emit('setPage', 'inicio')"
                >Inicio</Boton>
                <Boton
                    @click="emit('setPage', 'experiencia')"
                >Experiencia</Boton>
                <Boton
                    @click="emit('setPage', 'participacion')"
                >Participaciones</Boton>
                <Boton
                    @click="emit('setPage', 'proyectos')"
                >Proyectos</Boton>
            </div>
            <Boton
                v-if="props.esMovil"
                class="menu"
                @click="menuToggle('menu')"
            ><img src="https://i.postimg.cc/Twj9YL0m/MENU.png" alt="menu">
            </Boton>
        </div>
        <div class="contenedor-btn-inferior" v-if="menuAbierto && props.esMovil">
            <Boton
                @click="[emit('setPage', 'inicio'), menuToggle('inicio')]"
                class="btn-inferior"
            ><img src="https://i.postimg.cc/2y2MJQZq/home_10263239.png" alt="home" width="40">
            </Boton>
            <Boton
                @click="[emit('setPage', 'experiencia'), menuToggle('experiencia')]"
                class="btn-inferior"
            ><img src="https://i.postimg.cc/sDfRcXhY/clock_9882847.png" alt="experiencia" width="40">
            </Boton>
            <Boton
                @click="[emit('setPage', 'participacion'), menuToggle('participacion')]"
                class="btn-inferior"
            ><img src="https://i.postimg.cc/Y0bZV6WG/puzzle_17712024.png" alt="participaciones" width="40">
            </Boton>
            <Boton
                @click="[emit('setPage', 'proyectos'), menuToggle('proyectos')]"
                class="btn-inferior"
            ><img src="https://i.postimg.cc/tJ2wf3xn/startup_6884318.png" alt="proyectos" width="40">
            </Boton>
        </div>
    </nav>
</template>

<style>
    .contenedor-nav {
        display: flex;
        position: fixed;
        justify-content: space-between;
        align-items: center;
        top: .4rem; right: .4rem; left: .4rem;
        width: auto;
        z-index: 1000; /* asegura que esté por encima de otros elementos */
        background-color: var(--gris-oscuro);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        border-radius: 1rem;
        padding: 0.5rem 2rem;
        margin-bottom: 1rem;
    }
    .nombre{
        padding: 0 0 0 .5rem;
        width: 100%;
        color: var(--gris-claro);
        font-family: var(--font-titulo);
        font-size: 1.5rem; font-weight: 700;

        text-align: left;
        margin: 0 auto;
        letter-spacing: .1rem;
    }
    .btn-inferior img {
        margin: .2rem;
        padding: .4rem;
        filter: invert(1) brightness(2);
    }
    .btn-inferior:hover {
        background-color: var(--gris-oscuro);
        box-shadow: none;
    }
    @media (max-width: 790px) {
        .nombre {
            font-size: 1.2rem;
        }
        .menu {
            padding: .5rem;
        }
        .menu img {
            height: 2rem;
            filter: invert(1) brightness(2);
        }
        .menu img:hover {
            filter: invert(0) brightness(0);
        }
    }
</style>
