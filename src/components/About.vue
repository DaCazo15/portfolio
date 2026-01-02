<script setup>
    import useDownloadPDF from '../composables/useDonwloadFile';
    import Boton from './Boton.vue';    
    const { initPdfDownload, abrirPage } = useDownloadPDF();

    const props = defineProps({
        esMovil: {
            type: Boolean,
            required: true
        }
    });
    console.log(props.esMovil);
</script>

<template>
    <div class="about">
        <div class="border">
            <div class="imagen"></div>
        </div>
        <h1>Daniel Cazorla</h1>
        <span>Ingeniero de Sistemas con experiencia en desarrollo web y Python Full-Stack</span>
        <div class="contenedor-btn">
            <Boton 
                class="btn-red-social" 
                target="_blank"
                @click="abrirPage('https://www.linkedin.com/in/danielcp5150190/')"
            >
                <img class="linkedin" src="https://i.postimg.cc/zXy9gppP/linkedin-negro.png" alt="LinkedIn">
            </Boton>
            <Boton 
                class="btn-red-social" 
                target="_blank"
                @click="abrirPage('https://github.com/DaCazo15')"
            >
                <img class="github" src="https://i.postimg.cc/xTjdVrfc/github.png" alt="GitHub">
            </Boton>
        </div>
        <Boton 
            @click="initPdfDownload(
                'https://drive.google.com/file/d/1ynkUOJPeiWfLEIJnWk8P4vsqn6qpl82U/view?usp=sharing',
                'https://drive.google.com/uc?export=download&id=1ynkUOJPeiWfLEIJnWk8P4vsqn6qpl82U',
                props.esMovil
            )"
            class="btn-cv"
        >
            <img src="https://i.postimg.cc/Njb5Ssqd/download.png" alt="Descargar CV">
            <span>Descargar CV</span>
        </Boton>
    </div>
</template>

<style scoped>
    .about {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
    .about h1 {
        font-family: var(--font-titulo);
        font-size: 2rem;
        font-weight: 700;
        color: var(--gris-claro);
        margin: 1.5rem 0 1rem 0;
    }
    .about span {
        font-family: var(--font-titulo);
        color: var(--gris-claro);
        font-size: 1.2rem;
        font-weight: 400;
        margin: .5rem;
        padding: 0 .8rem;
    }
    .border {
        width: 12rem;
        height: 12rem;
        aspect-ratio: 1 / 1; /* Mantén el círculo siempre redondo */
        border: 4px solid var(--gris-claro);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .imagen {
        width: 10rem;
        height: 10rem;
        background-image: url(https://i.postimg.cc/VNmCQPn8/Foto-Perfil.png);
        background-position: center;
        background-size: cover;
        color: var(--gris-claro);
        border-radius: 50%;
        display: flex;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }
    .btn-red-social {
        background-color: var(--gris-claro);
        border: solid var(--gris-claro) 2px;
        margin-top: .75rem;
        padding: .4rem;
        border-radius: .5rem;
    }
    .btn-red-social:hover {
        background-color: var(--gris-oscuro);
        .linkedin, .github {
            filter: invert(1) brightness(2);
        }
    }
    .linkedin, .github {
        width: 1.5rem;
        height: 1.5rem;
    }
    .contenedor-btn {
        display: flex;
        gap: 1rem;
    }
    .btn-cv {
        margin-top: .75rem;
        display: flex;
        align-items: center;
        gap: .5rem;
        padding: 1rem;
        border-radius: 1rem;
        img {
            filter: invert(1) brightness(2);
            width: 1.2rem;
            height: 1.2rem;
        }
        border: solid var(--gris-oscuro) 2px;
    }
    .btn-cv span {
        font-size: 1rem;
    }
    .btn-cv:hover {
        background-color: transparent;
        border: solid var(--gris-claro) 2px;
    }
</style>
