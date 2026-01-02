import { ref, onMounted, onUnmounted } from 'vue';

export default function useAnchoViewport() {
    const ancho = ref(window.innerWidth);

    const actualizarAncho = () => {
        ancho.value = window.innerWidth;
    };
    onMounted(() => { 
        window.addEventListener("resize", actualizarAncho);
    });
    onUnmounted(() => {  
        window.removeEventListener("resize", actualizarAncho);
    });

    return {
        ancho
    }
}
