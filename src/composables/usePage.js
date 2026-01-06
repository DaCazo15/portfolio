import { reactive } from "vue";

export default function usePage() {
    const page = reactive({
        inicio: false,
        experiencia: false,
        participacion: true,
        proyectos: false,
        // Agrega más páginas si es necesario
    });

    const setPage = (pageName) => {
        Object.keys(page).forEach(key => {page[key] = false;});
        page[pageName] = true;
    };

    return { page, setPage };
}