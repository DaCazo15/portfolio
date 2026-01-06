import { reactive } from "vue";

export default function usePage() {
    const page = reactive({
        inicio: true,
        experiencia: false,
        contribuciones: false,
        proyectos: false,
        // Agrega más páginas si es necesario
    });

    const setPage = (pageName) => {
        Object.keys(page).forEach(key => {page[key] = false;});
        page[pageName] = true;
    };

    return { page, setPage };
}