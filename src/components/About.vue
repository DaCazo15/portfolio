<script setup>
import Boton from './Boton.vue';
import CarruselDestacados from './carrusel/CarruselDestacados.vue';
import { abrirPage, initFileDownload } from '../helpers/downloadFile';

defineProps({
    esMovil: {
        type: Boolean,
        required: true
    }
});

const profileImage = 'https://i.postimg.cc/PJztZ8bw/Foto_Perfil_avif.avif';
const cvUrl = 'https://drive.google.com/file/d/1ynkUOJPeiWfLEIJnWk8P4vsqn6qpl82U/view?usp=sharing';
const cvDownloadUrl = 'https://drive.google.com/uc?export=download&id=1ynkUOJPeiWfLEIJnWk8P4vsqn6qpl82U';
const downloadIcon = 'https://i.postimg.cc/VsxSyjHN/download_avif.avif';

const whatsappNumber = '+584148197912';
const whatsappUrl = 'https://wa.me/584148197912?text=Hola%20Daniel,%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20contactarte.';
const emailAddress = 'dcazorla.0190@gmail.com';
const emailUrl = 'mailto:dcazorla.0190@gmail.com?subject=Contacto%20desde%20Portafolio';

const socialButtons = [
    {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/danielcp5150190/',
        icon: 'https://i.postimg.cc/FRPKnSdB/linkedin_negro_avif.avif',
        imgClass: 'linkedin'
    },
    {
        name: 'GitHub',
        url: 'https://github.com/DaCazo15',
        icon: 'https://i.postimg.cc/HkSPnsMt/github.avif',
        imgClass: 'github'
    }
];
</script>

<template>
    <div class="about">
        <!-- Foto de Perfil con Aura Neón Sutil -->
        <div class="border">
            <img
                :src="profileImage"
                alt="Foto de perfil de Daniel Cazorla"
                class="imagen"
                fetchpriority="high"
                width="160"
                height="160"
            />
        </div>

        <h1>Daniel Cazorla</h1>
        <span class="subtitulo">Ingeniero de Sistemas • Desarrollador Full-Stack & Soluciones IoT / AI</span>

        <!-- Botones de Redes Sociales -->
        <div class="contenedor-btn">
            <Boton
                v-for="social in socialButtons"
                :key="social.name"
                class="btn-red-social"
                target="_blank"
                @click="abrirPage(social.url)"
            >
                <img :class="social.imgClass" :src="social.icon" :alt="social.name">
            </Boton>
        </div>

        <!-- Grupo de Acciones Directas: Contacto & CV -->
        <div class="flex flex-wrap items-center justify-center gap-3 my-4 max-w-xl px-4">
            <!-- Botón WhatsApp -->
            <a 
                :href="whatsappUrl" 
                target="_blank" 
                rel="noopener noreferrer"
                class="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition duration-200 shadow-lg shadow-emerald-950/40 flex items-center gap-2 cursor-pointer no-underline group hover:scale-105"
            >
                <i class="bi bi-whatsapp text-base group-hover:scale-110 transition-transform"></i>
                <span>WhatsApp: +58 414 819 7912</span>
            </a>

            <!-- Botón Correo -->
            <a 
                :href="emailUrl"
                class="py-2.5 px-4 rounded-xl bg-[var(--verde-cian)] hover:bg-[var(--verde-cian-oscuro)] text-white font-semibold text-xs transition duration-200 shadow-lg shadow-[var(--verde-cian)]/20 flex items-center gap-2 cursor-pointer no-underline group hover:scale-105"
            >
                <i class="bi bi-envelope-at-fill text-base group-hover:scale-110 transition-transform"></i>
                <span>{{ emailAddress }}</span>
            </a>

            <!-- Botón Descarga CV -->
            <Boton
                @click="initFileDownload(cvUrl, cvDownloadUrl, esMovil)"
                class="btn-cv m-0"
            >
                <img :src="downloadIcon" alt="Descargar CV">
                <span>Descargar CV</span>
            </Boton>
        </div>

        <!-- Carrusel Hero de Proyectos Destacados -->
        <CarruselDestacados />
    </div>
</template>

<style scoped>
    .about {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: 100%;
    }
    .about h1 {
        font-family: var(--font-titulo);
        font-size: 2.2rem;
        font-weight: 700;
        color: var(--gris-claro);
        margin: 1.25rem 0 0.5rem 0;
        letter-spacing: -0.5px;
    }
    .subtitulo {
        font-family: var(--font-titulo);
        color: #a0aec0;
        font-size: 1.1rem;
        font-weight: 400;
        margin: 0.25rem 0 0.75rem 0;
        padding: 0 1rem;
        text-wrap: balance;
        max-w: 650px;
    }
    .border {
        width: 11rem;
        height: 11rem;
        margin-top: 2rem;
        aspect-ratio: 1 / 1;
        border: 4px solid var(--verde-cian);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 0 25px rgba(0, 134, 134, 0.35);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .border:hover {
        transform: scale(1.03);
        box-shadow: 0 0 35px rgba(0, 134, 134, 0.5);
    }
    .imagen {
        width: 9.5rem;
        height: 9.5rem;
        aspect-ratio: 1 / 1;
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
        object-fit: cover;
        display: block;
    }
    .btn-red-social {
        background-color: var(--gris-claro);
        border: solid var(--gris-claro) 2px;
        margin-top: .5rem;
        padding: .4rem;
        border-radius: .5rem;
        height: auto;
    }
    .btn-red-social:hover {
        background-color: var(--gris-oscuro);
    }
    .btn-red-social:hover .linkedin,
    .btn-red-social:hover .github {
        filter: invert(1) brightness(2);
    }
    .linkedin, .github {
        width: 1.5rem;
        height: 1.5rem;
    }
    .contenedor-btn {
        display: flex;
        gap: 1rem;
        margin-bottom: 0.5rem;
    }
    .btn-cv {
        display: flex;
        align-items: center;
        gap: .5rem;
        padding: 0.6rem 1.2rem;
        border-radius: 0.75rem;
        border: solid var(--gris-oscuro) 2px;
        height: auto;
    }
    .btn-cv img {
        filter: invert(1) brightness(2);
        width: 1.1rem;
        height: 1.1rem;
    }
    .btn-cv span {
        font-size: 0.85rem;
        font-weight: 600;
    }
    .btn-cv:hover {
        background-color: transparent;
        border: solid var(--gris-claro) 2px;
    }
    @media (max-width: 791px) {
        .about h1 {
            font-size: 1.8rem;
        }
        .subtitulo {
            font-size: 0.95rem;
        }
        .border {
            width: 9rem;
            height: 9rem;
            margin-top: 1.5rem;
        }
        .imagen {
            width: 7.8rem;
            height: 7.8rem;
        }
    }
</style>
