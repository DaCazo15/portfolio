<script setup>
    import Boton from './Boton.vue'; 
    import { abrirPage, initFileDownload } from '../helpers/downloadFile' 

    const props = defineProps({
        esMovil: {
            type: Boolean,
            required: true
        }
    });   
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
                <img class="linkedin" src="https://i.postimg.cc/FRPKnSdB/linkedin_negro_avif.avif" alt="LinkedIn">
            </Boton>
            <Boton 
                class="btn-red-social" 
                target="_blank"
                @click="abrirPage('https://github.com/DaCazo15')"
            >
                <img class="github" src="https://i.postimg.cc/HkSPnsMt/github.avif" alt="GitHub">
            </Boton>
        </div>
        <Boton 
            @click="initFileDownload(
                'https://drive.google.com/file/d/1ynkUOJPeiWfLEIJnWk8P4vsqn6qpl82U/view?usp=sharing',
                'https://drive.google.com/uc?export=download&id=1ynkUOJPeiWfLEIJnWk8P4vsqn6qpl82U',
                props.esMovil
            )"
            class="btn-cv"
        >
            <img src="https://i.postimg.cc/VsxSyjHN/download_avif.avif" alt="Descargar CV">
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
        text-wrap: balance;  

    }
    .border {
        margin-top: 5rem;
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
        background-image: url(https://i.postimg.cc/PJztZ8bw/Foto_Perfil_avif.avif);
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
        height: auto;
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
        margin-bottom: 2rem; /* añade espacio debajo */
    }
    .btn-cv span {
        font-size: 1rem;
    }
    .btn-cv:hover {
        background-color: transparent;
        border: solid var(--gris-claro) 2px;
    }
    @media (max-height: 740px) {
        .about {
            margin-top:-4rem;
        }
        .btn-cv{
            padding: .6rem;
        }
        .imagen {
            width: 8rem;
            height: 8rem;
        }
        .border {
            width: 10rem;
            height: 10rem;
        }
        .about h1 {
            font-size: 1.5rem;    
        }
        .about span {
            font-size: 1rem;  
        }
        .linkedin, .github {
            width: 1.2rem;
            height: 1.2rem;
        }
        .contenedor-btn {
            gap: 1.2rem;
        }
    }
</style>
